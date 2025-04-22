// const { where } = require('sequelize');
const database = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros() {
    return database[this.model].findAll();
  }

  async pegaRegistrosPorEscopo(escopo) {
    return database[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return database[this.model].findByPk(id);
  }

  async pegaUmRegistroP(where) {
    return database[this.model].findOne({ where: {...where }});
  }

  async criaRegistro(dadosDoregistro) {
    return database[this.model].create(dadosDoregistro);
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listaDeRegistrosAtualizados = await database[this.model].update(dadosAtualizados, {
      where: { ...where }
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