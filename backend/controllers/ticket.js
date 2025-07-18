import { inngest } from '../inngest/client.js'
import Ticket from '../models/ticket.js'

// export const createTicket = async (req, res) => {
//     try {
//         // get the data from body
//         const { title, description } = req.body

//         // see if all req. matches 
//         if (!title || !description) {
//             return res
//                 .status(400)
//                 .json({ message: 'Title and description are required' })
//         }

//         // create ticket 
//         const newTicket = await Ticket.create({
//             title,
//             description,
//             createdBy: req.user._id.toString()
//         })

//         console.log('consoling the new created ticket', newTicket)

//         // trigger the event to inngest for background workers to work on it
//         inngest.send({
//             name: 'ticket/created',
//             data: {
//                 ticketId: (await newTicket)._id.toString(),
//                 title,
//                 description,
//                 createdBy: req.user._id.toString()
//             }
//         })

//         // console.log('checking ticket updated or not after ai parsing:', updatedTicket)

//         return res.status(201).json({
//             messsage: 'Ticket created and processing started',
//             ticket: newTicket
//         })

//     } catch (error) {
//         console.error('error from createTicket', error.message)
//         return res.status(500).json({ message: 'Internal Server Error' })
//     }
// }

export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res
                .status(400)
                .json({ message: "Title and description are required" });
        }

        // 1. Create ticket
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString(),
        });

        console.log("Newly created ticket:", newTicket);

        // 2. Trigger background AI processing via Inngest
        const updatedTicket = await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: newTicket._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString(),
            },
        });

        // 3. Poll for AI update (wait until AI has updated the ticket)
        // const MAX_RETRIES = 10;
        // let updatedTicket = null;

        // for (let i = 0; i < MAX_RETRIES; i++) {
        //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s
        //   const check = await Ticket.findById(newTicket._id).populate('assignedTo', ['email', '_id']);

        //   if (check?.status === "IN_PROGRESS" || check?.helpfulNotes || check?.priority !== "TODO") {
        //     updatedTicket = check;
        //     break;
        //   }
        // }

        if (!updatedTicket) {
            updatedTicket = await Ticket.findById(newTicket._id);
        }

        return res.status(201).json({
            message: "Ticket created and AI processing started",
            ticket: updatedTicket,
        });
    } catch (error) {
        console.error("error from createTicket", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

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

        // console.log('consoling the arr of tickets:', tickets)

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

        let ticket;

        if (user.role !== 'user') {
            ticket = await Ticket.findById(req.params.id).populate('assignedTo', ['email', '_id'])
        } else {
            // is a user 
            ticket = await Ticket
                .findOne(
                    {
                        createdBy: user._id,
                        _id: req.params.id
                    }
                )
                .select('title description status createdAt')
        }

        console.log('consoling single ticket:', ticket)

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }

        return res.status(200).json({ ticket })

    } catch (error) {
        console.log('Error fetching single ticket', error.message)
        return res.status(500).json({ message: 'Internal Server Error from get single ticket' })
    }
}

// why tickets in no curly braces in getTickets 