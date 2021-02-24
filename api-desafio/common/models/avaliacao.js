"use strict";

module.exports = function (Avaliacao) {
  //get avaliações do colaborador pela data 
    // (já existe "/colaboradors/{id}/avaliacoes", 
    //só é necessário aplicar o filtro: {"where":{"dataHora": "2021-02-21T16:34:08.081Z"}})

  //insert pegar a data e a classificação no front

  //get ultima avaliação user (ok)
  //get ultima avaliação de cada colaborador (Array) (ok)

  Avaliacao.getUltimaAvaliacao = async function (colaboradorId) {
    return Avaliacao.aggregate({
      where: { colaboradorId: colaboradorId },
      aggregate: [
        {
          $sort: {
            dataHora: 1,
          },
        },
        {
          $group: {
            _id: "$colaboradorId",
            dataUltima: {
              $max: "$dataHora",
            },
            pulso: {
              $last: "$pulso",
            },
            pSistolica: {
              $last: "$pSistolica",
            },
            pDiastolica: {
              $last: "$pDiastolica",
            },
            hipertensao: {
              $last: "$hipertensao",
            },
          },
        },
      ],
    })
      .then(function (avaliacao) {
        return Promise.resolve(avaliacao);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  Avaliacao.remoteMethod("getUltimaAvaliacao", {
    description: "Retorna a última avaliação de um colaborador",
    accepts: [
      {
        arg: "colaboradorId",
        type: "string",
        required: true,
      },
    ],
    http: {
      path: "/ultima/colaboradorId",
      verb: "get",
    },
    returns: {
      type: Avaliacao,
      root: true,
    },
  });

  Avaliacao.getUltimasAvaliacoes = async function () {
    return Avaliacao.aggregate({
      aggregate: [
        {
          $lookup: {
            from: "Colaborador",
            localField: "colaboradorId",
            foreignField: "_id",
            as: "colaborador",
          },
        },
        {
          $unwind: {
            path: "$colaborador",
          },
        },
        {
          $sort: {
            dataHora: 1,
          },
        },
        {
          $group: {
            _id: "$colaboradorId",
            dataUltima: {
              $max: "$dataHora",
            },
            pulso: {
              $last: "$pulso",
            },
            pSistolica: {
              $last: "$pSistolica",
            },
            pDiastolica: {
              $last: "$pDiastolica",
            },
            hipertensao: {
              $last: "$hipertensao",
            },
          },
        },
      ],
    })
      .then(function (avaliacoes) {
        return Promise.resolve(avaliacoes);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  Avaliacao.remoteMethod("getUltimasAvaliacoes", {
    description: "Retorna a última avaliação de todos os colaboradores",
    http: {
      path: "/ultimas",
      verb: "get",
    },
    returns: {
      type: [Avaliacao],
      root: true,
    },
  });
};
