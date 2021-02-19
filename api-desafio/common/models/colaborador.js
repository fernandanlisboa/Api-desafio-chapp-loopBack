"use strict";

module.exports = function (Colaborador) {
  //atualiza medidas (coloca as outras medidas no histórico)
  //get medidas passando a data

  Colaborador.getMedidaData = async function (id, data) {
      console.log(id)
    return Colaborador.findById(id)
      .then(function (colab) {
        var colabObj = colab.toJSON();
        for (var i = 0; i < colabObj.historicoMedidas.length; i++) {
          if (historicoMedidas[i].dataHora == data) {
            return historicoMedidas[i];
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  Colaborador.remoteMethod("getMedidaData", {
    description: "Retorna a medida de um colaborador em uma data específica",
    accepts: [
      {
        arg: "data",
        type: "date",
        required: true,
      },
      {
        arg: "id",
        type: "string",
        required: true,
      },
    ],
    http: {
      path: "/:id/Medida/:data",
      verb: "get",
    },
    returns: {
      arg: "medida",
      type: "obj",
    },
  });
};
