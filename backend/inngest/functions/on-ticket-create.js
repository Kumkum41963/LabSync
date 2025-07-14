import { NonRetriableError } from "inngest";
import { sendMail } from '../../utils/mailer.js'
import { analyzeTicket } from "../../utils/aiAgent.js";
import User from '../../models/user.js'
import Ticket from "../../models/ticket.js";
import {inngest} from '../client.js'

export const onTicketCreated = inngest.createFunction(
    { id: 'on-ticket-created', retries: 2 },
    { event: 'ticket/created' },
    async ({ event, step }) => {
        try {
            //  getting ticket id from the event
            const { ticketId } = event.data

            // fetch ticket from DB
            const ticket = await step.run('fetch-ticket', async () => {

                const ticketObject = await Ticket.findById(ticketId)

                if (!ticketObject) {
                    throw new NonRetriableError('ticket not found')
                }

                return ticketObject
            })

            // run the ticket for updated
            await step.run('update-ticket-status', async () => {
                await Ticket.findByIdAndUpdate(ticket._id, {
                    status: 'TODO'
                })
            })

            // grab res from ai
            const aiResponse = await analyzeTicket(ticket)

            // assign the related skills and return em 
            const relatedSkills = await step.run('ai-processing', async () => {
                let skills = []
                if (aiResponse) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: ['low', 'medium', 'high'].includes(aiResponse.priority) ? 'medium' : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        status: 'IN_PROGRESS',
                        relatedSkills: aiResponse.relatedSkills
                    })
                    skills = aiResponse.relatedSkills
                }

                return skills
            })

// relatedSkills was returned so we could find moderator based on it which is done here
// assign moderator
            const moderator = await step.run('assign-moderator', async () => {
                let user = await User.findOne({
                    role: 'moderator',
                    skills: {
                        $elemMatch: {
                            $regex: relatedSkills.join('|'),
                            $options: 'i',
                        }
                    }
                })

                if (!user) {
                    user = await User.findOne({
                        role: 'admin',
                    })
                }


                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: user?._id || null
                })

                return user
            })

            // send email to them as they have been assigned as a moderator
            await step.run('send-email-notification', async () => {
                if (moderator) {
                    const finalTicket = await Ticket.findById(ticket._id)
                    await sendMail(
                        moderator.email,
                        'Ticket Assigned',
                        `A new ticket is assigned to you ${finalTicket.title}`
                    )
                }
            })

            return { success: true }

        } catch (error) {
            console.log('error running steps in on ticket create', error.message)
            return { success: false }
        }
    }
)

