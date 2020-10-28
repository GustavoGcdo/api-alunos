import { Router } from 'express';
import { AlunosController } from '../controllers/alunos.controller';

export class AlunosRoute {
    private _router: Router;
    private _controller: AlunosController;

    constructor() {
        this._router = Router();
        this._controller = new AlunosController();
    }

    public getRoutes() {
        this._router.get('/alunos', (req, res) => this._controller.paginarAlunos(req, res));
        this._router.post('/alunos', (req, res) => this._controller.criarAluno(req, res));
        this._router.get('/alunos/:id', (req, res) => this._controller.buscarAlunoPorId(req, res));
        this._router.put('/alunos/:id', (req, res) => this._controller.atualizarAluno(req, res));
        this._router.delete('/alunos/:id', (req, res) => this._controller.removerAluno(req, res));

        return this._router;
    }
}