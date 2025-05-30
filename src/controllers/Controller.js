const {  validaUsuario } = require('../utils/validacoes.js');
// const { where } = require('sequelize');
const converteIds = require('../utils/conversorDeStringHelper.js');

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeResgistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeResgistro);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar registros.', erro: erro.message });
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ mensagem: `Erro ao buscar o registro com id ${id}.`, erro: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where =  converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ mensagem: `Erro ao buscar o registro com id ${where}.`, erro: erro.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    const { error } = validaUsuario.validate(req.body);

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao criar novo registro.', erro: erro.message });
    }
  }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;

    const where = converteIds(params);
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where);
      if (!foiAtualizado) {
        return res.status(400).json({ mensagem: 'Registro não foi atualizado.' });
      }
      return res.status(200).json({ mensagem: 'Atualizado com sucesso.' });
    } catch (erro) {
      return res.status(500).json({ mensagem: `Erro ao atualizar o registro com id ${id}.`, erro: erro.message });
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({ mensagem: `Registro com id ${id} deletado.` });
    } catch (erro) {
      return res.status(500).json({ mensagem: `Erro ao deletar o registro com id ${id}.`, erro: erro.message });
    }
  }
}

module.exports = Controller;