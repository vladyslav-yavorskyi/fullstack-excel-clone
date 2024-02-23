import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    console.log(token, 'token');
    console.log(token === null || token === void 0 ? void 0 : token.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        req.user = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};
export default verifyToken;
