import { inngest } from '../inngest/client.js'
import Ticket from '../models/ticket.js'

export const createTicket = async (req, res) => {
    try {
        // get the data from body
        const { title, description } = req.body

        // see if all req. matches 
        if (!title || !description) {
            return res
                .status(400)
                .json({ message: 'Title and desc. are required' })
        }

        // create ticket 
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

        console.log('consoling the new created ticket', newTicket)

        // 
        await inngest.send({
            name: 'ticket/created',
            data: {
                ticketId: (await newTicket)._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString()
            }
        })

        return res.status(201).json({
            messsage: 'Ticket created and processing started',
            ticket: newTicket
        })
    } catch (error) {
        console.log('error from createTicket')
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getTickets = async (req, res) => {
    try {
        const user = req.user

        console.log('checking user from the db:', user)

        let tickets = []

        if (user.role !== 'user') {
            tickets = await Ticket
                .find({})
                .populate('assignedTo', ['email', '_id'])
                .sort({ createdAt: -1 })
        } else {
            // if it is a user 
            // show only the tickets created by this user 
            tickets = await Ticket.find({ createdBy: user._id })
                .select('title description status createdAt')
                .sort({ createdAt: -1 })
        }

        console.log('consoling the arr of tickets:', tickets)

        return res.status(200).json({
            message: 'showering the tickets:',
            tickets: tickets, // or just `tickets,` in modern JS
        });

    } catch (error) {
        console.log('Error fetching tickets', error.message)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const getTicket = async (req, res) => {
    try {
        const user = req.user

        let tickets;

        if (user.role !== 'user') {
            ticket = Ticket
                .findbyId(req.params.id)
                .populate('assignedTo', ['email', '_id'])
        } else {
            ticket = await Ticket.findOne(
                {
                    createdBy: user._id,
                    _id: req.params.id
                }
            )
                .select('title description status createdAt')
        }

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }

        return res.status(200).json({ ticket })

    } catch (error) {
        console.log('Error fetching single ticket', error.message)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

// why tickets in no curly braces in getTickets 