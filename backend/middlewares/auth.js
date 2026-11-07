import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

/*
Authenticate Middleware:
   - Verifies JWT token from header
   - Attaches the logged-in user to req.user
*/
export const authenticate = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Make sure decoded.id matches what you used in jwt.sign
        req.user = await User.findById(decoded.id).select("-password");

        // if token still exists but not the user
        if (!req.user) {
            return res.status(401).json({ error: "User no longer exists." })
        }

        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Not authorized, token invalid" });
    }
}

/*
Authorizable Middleware:
    - Restricts route access based on user roles
*/
export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                console.log("❌ NO USER ROLE FOUND");
                return res.status(401).json({ message: "Access denied. User data missing." });
            }

            const userRole = req.user.role.trim().toLowerCase();
            const allowedRoles = roles.map(r => r.trim().toLowerCase());

            if (!allowedRoles.includes(userRole)) {
                console.log(`❌ ROLE NOT ALLOWED: User is '${userRole}', allowed are [${allowedRoles.join(', ')}]`);
                return res.status(403).json({ message: "Access denied. User Role not allowed." });
            }

            console.log("✅ ROLE ALLOWED");
            next();
        } catch (error) {
            console.error("Role verification failed:", error.message);
            return res.status(500).json({ message: "Internal server error during role validation." });
        }
    };
};
// (...) spread operator in js accepts any no. of paras and bundles em into an array named roles (name designated)

