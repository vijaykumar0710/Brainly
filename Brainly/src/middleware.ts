import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // accept "Bearer <token>" or raw token
        let token = header as string;
        if (token.toLowerCase().startsWith("bearer ")) {
            const parts = token.split(" ");
            if (parts.length < 2 || !parts[1]) {
              return res.status(401).json({ message: "Invalid token format" });
            }
            token = parts[1];
        }

        const decoded = jwt.verify(token, JWT_PASSWORD);
        if (decoded) {
            // @ts-ignore
            req.userId = (decoded as any).id || (decoded as any)._id;
            next();
        } else {
            res.status(403).json({ message: "You are not logged in" });
        }
    } catch (e) {
        console.warn("Auth error:", (e as any)?.message || e);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}