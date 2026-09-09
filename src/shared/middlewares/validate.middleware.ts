import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/utils/ApiError';

type ValidatedRequest = {
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    query?: Record<string, unknown>;
};

export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("VALIDATE MIDDLEWARE REACHED")
            const parsed = (await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            })) as ValidatedRequest;

            console.log('VALIDATE: parse succeeded');
      console.log('PARSED:', parsed);

            req.body = parsed.body ?? req.body;
            console.log('VALIDATE: before next');
            next();
            console.log('VALIDATE: next called');
        } catch (error: any) {
            console.log('ERROR: ', error);
            console.log('REQ BODY:', req.body);
            console.log('REQ FILE:', req.file);
            next(new ApiError(400, error.issues?.[0]?.message ?? 'Validation failed'));
        }
    };
};
