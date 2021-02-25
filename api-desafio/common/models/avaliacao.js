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
      where: { ColaboradorId: colaboradorId },
      aggregate: [
        {
          $sort: {
            dataHora: 1,
          },
        },
        {
          $group: {
            _id: "$ColaboradorId",
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
        arg: "ColaboradorId",
        type: "string",
        required: true,
      },
    ],
    http: {
      path: "/ultima/ColaboradorId",
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
            localField: "ColaboradorId",
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
            _id: "$ColaboradorId",
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

  Avaliacao.getResumoHipertensao = async function () {
    return Avaliacao.aggregate({
      aggregate: [
        {
          $lookup: {
            from: "Colaborador",
            localField: "ColaboradorId",
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
            _id: "$ColaboradorId",
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
        { $sortByCount: "$hipertensao" },
        {
          $project: {
            _id: 0,
            x: "$_id",
            y: "$count",
          },
        },
      ],
    })
      .then(function (medidas) {
        return Promise.resolve(medidas);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  Avaliacao.remoteMethod("getResumoHipertensao", {
    description:
      "Retorna o número de colaboradores por classificacao de hipertensao",
    http: {
      path: "/resumo/hipertensao",
      verb: "get",
    },
    returns: {
      type: [{}],
      root: true,
    },
  });
};
