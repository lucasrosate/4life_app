const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
    const token = req.body.token;

    if (!token) return res.status(401).json({ message: "Access denied." });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("entrou")
        req.user = verified;
        next();

    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = verifyUser;