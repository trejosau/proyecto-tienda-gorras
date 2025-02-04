import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validateTokenAndRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        console.log(req.headers, "Validando token");

        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token no proporcionado o inválido" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            (req as any).user = decoded;

            if (allowedRoles.length && !allowedRoles.includes(decoded.userRole)) {
                console.log(decoded.userRole, "No autorizado");
                return res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
    };
};
