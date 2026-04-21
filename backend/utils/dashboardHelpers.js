import Ticket from '../models/ticket.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getTotalTickets = async (match = {}) => {
    const count = await Ticket.countDocuments(match);
    console.log("Total tickets count:", count);
    return count;
};

export const getTicketStatusCounts = async (match = {}) => {
    const result = await Ticket.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                open: {
                    $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] }
                },
                in_progress: {
                    $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] }
                },
                resolved: {
                    $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] }
                },
                closed: {
                    $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] }
                }
            }
        }
    ]);

    const data = result[0] || {
        open: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0
    };

    console.log("Ticket status counts:", data);
    return data;
};

export const getTicketPriorityCounts = async (match = {}) => {
    const result = await Ticket.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                low: {
                    $sum: { $cond: [{ $eq: ["$priority", "low"] }, 1, 0] }
                },
                medium: {
                    $sum: { $cond: [{ $eq: ["$priority", "medium"] }, 1, 0] }
                },
                high: {
                    $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] }
                }
            }
        }
    ]);

    const data = result[0] || {
        low: 0,
        medium: 0,
        high: 0
    };

    console.log("Ticket priority counts:", data);
    return data;
};

export const getAssignmentCount = async (match = {}) => {
    return await Ticket.countDocuments(match);
};

export const getUserAssignmentCounts = async (userId, role) => {

    let assignedToCount = 0;
    let assignedByCount = 0;

    if (role === "moderator") {
        assignedToCount = await getAssignmentCount({
            assignedModerator: userId
        });
    }

    if (role === "lab_assistant") {
        assignedByCount = await getAssignmentCount({
            assignedByLabAssistant: userId
        });
    }

    const total = await getAssignmentCount({});

    const data = {
        assignedTo: assignedToCount,
        assignedBy: assignedByCount,
        assigned: total,
        unassigned: total - (assignedToCount || assignedByCount)
    };

    console.log(`Assignment stats (${role}):`, data);
    return data;
};

export const getTotalUsers = async (match = {}) => {
    const count = await User.countDocuments(match);
    console.log("Total users:", count);
    return count;
};

export const getUserRoleCounts = async (match = {}) => {
    const result = await User.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                admin: {
                    $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] }
                },
                moderator: {
                    $sum: { $cond: [{ $eq: ["$role", "moderator"] }, 1, 0] }
                },
                student: {
                    $sum: { $cond: [{ $eq: ["$role", "student"] }, 1, 0] }
                },
                lab_assistant: {
                    $sum: { $cond: [{ $eq: ["$role", "lab_assistant"] }, 1, 0] }
                }
            }
        }
    ]);

    const data = result[0] || {
        admin: 0,
        moderator: 0,
        student: 0,
        lab_assistant: 0    
    };

    console.log("User role counts:", data);
    return data;
};

export const getModeratorDistribution = async (match = {}) => {
    
}

export const getLabAssignmentDistribution = async (match = {}) => {

}

export const getTicketsOverTime = async (match = {}) => {

}