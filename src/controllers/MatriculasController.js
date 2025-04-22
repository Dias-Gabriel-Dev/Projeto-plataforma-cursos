const Controller = require('./Controller.js');
const MatriculasServices = require('../services/MatriculasServices.js');

const matriculasServices = new MatriculasServices();

class MatriculasController extends Controller {
  constructor() {
    super(matriculasServices);
  }
}

module.exports = MatriculasController;