"use strict";

module.exports = function (Colaborador) {
  //atualiza medidas (coloca as outras medidas no histórico)
  //get medidas passando a data

  Colaborador.getMedidaData = async function (data, id) {
    return Colaborador.findById(id)
      .then(function (colab) {
        console.log(id);
        console.log(colab);
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

  Colaborador.updateMedida = async function (id, novaMedida) {
    return Colaborador.findById(id).then(function (colab) {
      var novoHistoricoMedidas = [];
      novoHistoricoMedidas = colab.historicoMedidas;
      novoHistoricoMedidas.push({
        peso: colab.medida.peso,
        altura: colab.medida.altura,
        dataHora: colab.medida.dataHora,
        imc: colab.medida.imc,
      });

      colab.updateAttributes(
        {
          medida: {
            peso: novaMedida.peso,
            altura: novaMedida.altura,
            dataHora: novaMedida.dataHora,
            imc: novaMedida.imc,
          },
          historicoMedidas: novoHistoricoMedidas,
        },
        function (err, instance) {
          console.log(instance);
        }
      );
    });
  };
  Colaborador.remoteMethod("updateMedida", {
    description:
      "Atualiza a medida de um colaborador e adiciona a antiga ao histórico",
    accepts: [
      {
        arg: "id",
        type: "string",
        required: true,
      },
      {
        arg: "novaMedida",
        type: {
          peso: {
            type: "number",
          },
          altura: {
            type: "number",
          },
          dataHora: {
            type: "date",
          },
          imc: {
            type: "number",
          },
        },
        required: true,
        http: {
          source: "body",
        },
      },
    ],
    http: {
      path: "/:id/Medida",
      verb: "put",
    },
    returns: {
      arg: "novaMedida",
      type: {
        peso: {
          type: "number",
        },
        altura: {
          type: "number",
        },
        dataHora: {
          type: "date",
        },
        imc: {
          type: "number",
        },
      },
    },
  });
};
