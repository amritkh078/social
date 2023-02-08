import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if (!token) {return res.status(403).send("Access Denied")}  // If no token, return error

        if (token.startsWith("Bearer ")) {    // Remove Bearer from string 
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified; // Add user from payload
        next();
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}