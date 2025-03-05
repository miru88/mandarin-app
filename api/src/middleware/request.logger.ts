import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLogger implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        if (Object.keys(req.body || {}).length > 0) {
            console.log('Request Body:', JSON.stringify(req.body, null, 2));
          }
        next();
      }
}