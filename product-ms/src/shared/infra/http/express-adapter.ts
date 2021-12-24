/* eslint-disable consistent-return */
/* eslint-disable no-empty */
import express, { Response } from 'express';
import {
  ConflictError,
  NotFoundError,
} from '../../../application/application-errors';
import { DomainError } from '../../domain-error';
import { Http, HttpMethod, HttpRequest, HttpResponse } from './http';

export class ExpressAdapter implements Http {
  private app;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(
    method: HttpMethod,
    url: string,
    fn: (req: HttpRequest) => Promise<HttpResponse>,
  ): void {
    this.app[method](url, async (req, res) => {
      try {
        const response = await fn({ body: req.body, params: req.params });
        return res.status(response.statusCode).json(response.data);
      } catch (error) {
        this.checkError(error as Error, res);
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  }

  private checkError(error: Error, res: Response) {
    switch (error.constructor) {
      case DomainError:
        return res.status(400).json({
          error: error.message,
        });
      case NotFoundError:
        return res.status(404).json({
          error: error.message,
        });
      case ConflictError:
        return res.status(409).json({
          error: error.message,
        });
      default:
        console.log('Error', error);
        return res.status(500).json({
          error: 'Internal Server Error',
        });
    }
  }
}
