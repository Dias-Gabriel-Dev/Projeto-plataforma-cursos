const Sequelize = require('sequelize');

const Controller = require('./Controller.js');
const MatriculasServices = require('../services/MatriculasServices.js');
const { where } = require('sequelize');

const matriculasServices = new MatriculasServices();

class MatriculasController extends Controller {
  constructor() {
    super(matriculasServices);
  }

    async pegaMatriculasPorEstudante(req, res) {
      const { estudante_id } = req.params;
      try {
       const listaMatriculasPorEstudante = await matriculasServices.pegaEContaRegistros(
        {
          where: {
            estudante_id: Number(estudante_id),
            status: 'matriculado'
          },
            limit: 2,
            order: [['id', 'DESC']]
       }
      );
        return res.status(200).json(listaMatriculasPorEstudante);
      } catch (erro) {
        return res.status(500).json({ erro: erro.message });
      }
    }

    async pegaCursosLotados(req, res) {
      const lotacaoCurso = 2;
      try {
        const cursoLotados = await matriculasServices.pegaEContaRegistros(
          {
            where: {
              status: 'matriculado'
            },
            attributes: ['curso_id'],
            group: ['curso_id'],
            having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
        });
        return res.status(200).json(cursoLotados.count);
      } catch (erro) {
        return res.status(500).json({ erro: erro.message })
      }
    }
}

module.exports = MatriculasController;