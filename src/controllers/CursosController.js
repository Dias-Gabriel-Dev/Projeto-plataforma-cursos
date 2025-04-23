const { Op } = require('sequelize')

const Controller = require('./Controller.js');
const CursosServices = require('../services/CursosServices.js');

const cursosServices = new CursosServices();

class CursosController extends Controller {
  constructor() {
    super(cursosServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    // se existirem os params, criar um propriedade
    data_inicial || data_final ? where.data_inicio = {} : null;
    // se existir data iniial, adiciona a propriedade gte com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    // se existir data final, idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursosServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }

  }
}

module.exports = CursosController;