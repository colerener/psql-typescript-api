import { Request, Response, NextFunction } from 'express';
import { checkUserCredentials } from '../services/login.service';

interface CredentialsCheckResult {
   success: boolean,
   name?: string,
   id?: string,
   token?: string
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
 let result: CredentialsCheckResult = await checkUserCredentials({ name: req.body.name, password: req.body.password });
 if (result.success) {
   res.json({ code: 200, ...result });
 } else {
    res.json({ code: 401, ...result });
 }
};

