import User from "../models/user.model.js";

// Find mods with matching skills
export const suggestModerators = async (requiredSkills = [], limit = 3) => {
    // if no required skills, return empty
    if (!requiredSkills.length) return [];

    // Find all users with role: mods
    const moderators = await User.find({ role: "moderator" });

    // Calculate a score that matches no. of skills per mod to relatedSkills

    const scoredModerators = moderators.map((mod) => {
        const modSkills = mod.skills || [];
        let score = 0;

        // Go to each mod
        // Scan their skills
        // Increment score if found a match in requiredSkills also
        for (const reqSkill of requiredSkills) {
            const match = modSkills.some((modSkill) =>
                // if this skill is in mod skill 
                modSkill.toLowerCase().includes(reqSkill.toLowerCase())
            );

            if (match) score++;
        }

        return { moderator: mod, score };
    });

    // Sort them from highest to lowest score

    // Remove mods with 0 score
    const filtered = scoredModerators.filter((m) => m.score > 0);

    // Sort highest → lowest
    filtered.sort((a, b) => b.score - a.score);

    // Top three mods with highest score taken
    const topMods = filtered.slice(0, limit).map((m) => m.moderator);

    return topMods;
};