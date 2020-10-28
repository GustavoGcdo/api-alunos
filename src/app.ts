import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './config';
import { HttpStatus } from './infra/http-status';
import { Result } from './infra/result';
import { AlunosRoute } from './routes/alunos.route';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public async create() {
    this.configureMiddleWares();
    this.configureRoutes();
    await this.connectToDatabase();
    return this.app;
  }

  private configureMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private configureRoutes() {
    const alunosRoute = new AlunosRoute();
    this.app.use(alunosRoute.getRoutes());

    this.app.use('*', function (req: Request, res: Response) {
      const resultError = new Result(null, 'Método não permitido', false, [], HttpStatus.METHOD_NOT_ALLOWED);
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).send(resultError);
    });
  }

  private async connectToDatabase() {
    // todo
  }

  public start() {
    this.app.listen(config.PORT, () => {
      console.log(`listen on port ${config.PORT}`);
    });
  }

  public getApplication() {
    return this.app;
  }

  public getConnection() {
    // todo
  }

  public async disconnect() {
    // todo
  }
}