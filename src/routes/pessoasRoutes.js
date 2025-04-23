const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculasController = require('../controllers/MatriculasController.js');

const pessoaController = new PessoaController();
const matriculasController = new MatriculasController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.cancelaRegistroEstudante(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculasController.pegaMatriculasPorEstudante(req, res));
router.get('/pessoas/matriculas/lotadas', (req, res) => matriculasController.pegaCursosLotados(req, res));
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculasController.pegaUm(req, res));
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculasController.criaNovo(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculasController.atualiza(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculasController.exclui(req, res));

module.exports = router;