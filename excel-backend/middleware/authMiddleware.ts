import {NextFunction, Request as ExpressRequest, Response} from 'express';
import jwt from 'jsonwebtoken';

interface Request extends ExpressRequest {
    user?: jwt.JwtPayload | string;
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({error: "Access Denied"});
    }
    try {
        req.user = jwt.verify(token?.split(' ')[1], process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(400).json({error: "Invalid Token"});
    }
}

export default verifyToken;