import mongoose from "mongoose";

export const getTotalCountStats = async (model, match = {}) => {
    return await model.countDocuments(match);
};

export const getDistributionStats = async (
    model,
    field,
    match = {},
    expectedValues = []
) => {
    const result = await model.aggregate([
        { $match: match },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 }
            }
        }
    ]);

    const formatted = {};

    expectedValues.forEach(val => {
        formatted[val] = 0;
    });

    result.forEach(item => {
        const key = item._id ? String(item._id) : "unknown";
        formatted[key] = item.count;
    });

    return formatted;
};

export const getAssignmentStats = async (model, match = {}) => {
    const total = await model.countDocuments(match);

    const assigned = await model.countDocuments({
        ...match,
        assignedModerator: { $ne: null }
    });

    return {
        assigned,
        unassigned: total - assigned
    };
};

export const getBreakdownStats = async (
    model,
    field,
    match = {},
    expectedValues = []
) => {
    const result = await model.aggregate([
        { $match: match },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 }
            }
        }
    ]);

    const formatted = {};

    expectedValues.forEach(val => {
        formatted[val] = 0;
    });

    result.forEach(item => {
        const key = item._id ? String(item._id) : "unknown";
        formatted[key] = item.count;
    });

    return formatted;
};

export const getTimeSeriesStats = async (model, match = {}) => {
    const result = await model.aggregate([
        { $match: match },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    return result.map(item => ({
        year: item._id.year,
        month: item._id.month,
        count: item.count
    }));
};