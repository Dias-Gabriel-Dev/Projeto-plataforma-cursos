// const { where } = require('sequelize');
const database = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return database[this.model].findAll({ where: { ...where }});
  }

  async pegaRegistrosPorEscopo(escopo) {
    return database[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return database[this.model].findByPk(id);
  }

  async pegaEContaRegistros(options) {
    return database[this.model].findAndCountAll({ ...options });
  }

  async pegaUmRegistro(where) {
    return database[this.model].findOne({ where: {...where }});
  }

  async criaRegistro(dadosDoregistro) {
    return database[this.model].create(dadosDoregistro);
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listaDeRegistrosAtualizados = await database[this.model].update(dadosAtualizados, {
      where: { ...where },
      transaction: transacao
    });
    if (listaDeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return database[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;