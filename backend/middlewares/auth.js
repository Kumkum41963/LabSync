import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";


/*
✅ Authenticate Middleware:
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

        // ✅ Make sure decoded.id matches what you used in jwt.sign
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Not authorized, token invalid" });
    }
}

/*
✅ Authorizable Middleware:
    - Restricts route access based on user roles
*/
export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    }
}

// ... rest para in js accepts any no. of paras and bundles em into an array named roles