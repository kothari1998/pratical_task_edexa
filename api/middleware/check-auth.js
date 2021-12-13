const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        console.log(`token${token}`);
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "pehli_fursat_se_nikal");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
        console.log("email" + decodedToken.email + "userid" + decodedToken.userId);
    }
    catch (error) {
        res.status(401).json({
            message: "You are not authenticated!"
        });
    }
};