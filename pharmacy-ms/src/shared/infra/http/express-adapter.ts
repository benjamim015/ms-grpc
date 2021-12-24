/* eslint-disable no-empty */
import express from 'express';
import { ApplicationErrors } from '../../../application/application-errors';
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
        const err = error as Error;
        switch (err.constructor) {
          case DomainError:
            return res.status(400).json({
              error: err.message,
            });
          case ApplicationErrors.NotFoundError:
            return res.status(404).json({
              error: err.message,
            });
          default:
            console.log('Err', err);
            return res.status(500).json({
              error: 'Internal Server Error',
            });
        }
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  }
}
