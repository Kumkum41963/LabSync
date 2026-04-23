import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import {
    getTotalCountStats,
    getDistributionStats,
    getAssignmentStats,
    getBreakdownStats
} from '../utils/dashboardHelpers.js';



// constants 
const TICKET_STATUS = ["open", "in_progress", "closed", "resolved"];
const TICKET_PRIORITY = ["low", "medium", "high"];
const TICKET_ROLE = ["admin", "lab_assistant", "moderator", "student"];

// ADMIN
export const getAdminDashboardStats = async (user) => {
    const ticketMatch = {};

    const data = {
        user: {
            name: user.name,
            role: user.role
        },
        tickets: {
            total: await getTotalCountStats(Ticket, ticketMatch),

            status: await getDistributionStats(
                Ticket,
                "status",
                ticketMatch,
                TICKET_STATUS // ✅ added
            ),

            priority: await getDistributionStats(
                Ticket,
                "priority",
                ticketMatch,
                TICKET_PRIORITY // ✅ added
            )
        },

        assignments: await getAssignmentStats(Ticket, ticketMatch),

        distribution: {
            moderator: await getBreakdownStats(Ticket, "assignedModerator", ticketMatch),
            labAssistant: await getBreakdownStats(Ticket, "assignedByLabAssistant", ticketMatch),
            student: await getBreakdownStats(Ticket, "createdBy", ticketMatch)
        },

        users: {
            total: await getTotalCountStats(User, {}),

            role: await getDistributionStats(
                User,
                "role",
                {},
                TICKET_ROLE // ✅ added
            )
        }
    };

    console.log('Admin Dashboard Data:', data);
    return data;
};


// STUDENT 
export const getStudentDashboardStats = async (user) => {

    const studentMatch = { createdBy: user._id };

    const data = {
        user: {
            name: user.name,
            role: user.role
        },

        tickets: {
            total: await getTotalCountStats(Ticket, studentMatch), 

            status: await getDistributionStats(
                Ticket,
                "status",
                studentMatch,
                TICKET_STATUS
            ),

            priority: await getDistributionStats(
                Ticket,
                "priority",
                studentMatch,
                TICKET_PRIORITY
            )
        },

        assignments: await getAssignmentStats(Ticket, studentMatch),

        distribution: {
            moderator: await getBreakdownStats(Ticket, "assignedModerator", studentMatch),

            labAssistant: await getBreakdownStats(
                Ticket,
                "assignedByLabAssistant",
                studentMatch
            )
        }
    };

    console.log('Student Dashboard Stat:', data);
    return data;
};

// MODERATOR 
export const getModeratorDashboardStats = async (user) => {
    const moderatorMatch = { assignedModerator: user._id };

    const assignedToMe = await getTotalCountStats(Ticket, moderatorMatch);

    const resolved = await getTotalCountStats(Ticket, {
        ...moderatorMatch,
        status: "resolved"
    });

    const data = {
        user: {
            name: user.name,
            role: user.role
        },

        tickets: {
            total: await getTotalCountStats(Ticket, {}),

            status: await getDistributionStats(
                Ticket,
                "status",
                moderatorMatch,
                TICKET_STATUS
            ),

            priority: await getDistributionStats(
                Ticket,
                "priority",
                moderatorMatch,
                TICKET_PRIORITY
            )
        },

        assignments: {
            assignedToMe,
            resolved,
            unresolved: assignedToMe - resolved
        },

        distribution: {
            labAssistant: await getBreakdownStats(Ticket, "assignedByLabAssistant", moderatorMatch),
            student: await getBreakdownStats(Ticket, "createdBy", moderatorMatch)
        }
    };

    console.log('Mod Dashboard Data:', data);
    return data;
};

// LAB ASSISTANT 
export const getLabAssistantDashboardStats = async (user) => {

    const labAssistantMatch = { assignedByLabAssistant: user._id };

    const resolved = await getTotalCountStats(Ticket, {
        ...labAssistantMatch,
        status: "resolved"
    });

    const data = {
        user: {
            name: user.name,
            role: user.role
        },

        tickets: {
            total: await getTotalCountStats(Ticket, {}),

            status: await getDistributionStats(
                Ticket,
                "status",
                {},
                TICKET_STATUS
            ),

            priority: await getDistributionStats(
                Ticket,
                "priority",
                {},
                TICKET_PRIORITY
            )
        },

        assignments: {
            assignedByMe: await getTotalCountStats(Ticket, labAssistantMatch),
            assign: await getAssignmentStats(Ticket, {})
        },

        distribution: {
            moderator: await getBreakdownStats(Ticket, "assignedModerator", labAssistantMatch),
            student: await getBreakdownStats(Ticket, "createdBy", labAssistantMatch)
        }
    };

    console.log('Lab Assistant Dashboard Data:', data);
    return data;
};

