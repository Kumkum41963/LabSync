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
    try {
        // spread the current role into an array named roles
        return (req, res, next) => {
            console.log("👉 RAW USER:", req.user);
            console.log("👉 USER ROLE:", req.user?.role);
            console.log("👉 TYPE:", typeof req.user?.role);
            const userRole = req.user?.role.toLowerCase(); // get the actual role from users req
            const allowedRoles = roles.map(r => r.toLowerCase()); // convert the allowed roles as passed to middleware into lowercase and keep in allowedRoles
            // match if access is allowed
            if (!allowedRoles.includes(userRole)) {
                console.log("❌ ROLE NOT ALLOWED");
                return res.status(403).json({ message: "Access denied. User Role not allowed." })
            }

            console.log("✅ ROLE ALLOWED");
            next()
        }
    } catch (error) {
        console.error("Role verification failed:", error.message);
        return res.status(401).json({ message: "Not accessible, role invalid or not allowed." });
    }
}

// (...) spread operator in js accepts any no. of paras and bundles em into an array named roles (name designated)

