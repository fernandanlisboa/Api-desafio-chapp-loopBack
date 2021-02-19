'use strict';

module.exports = function(Avaliacao) {

//get avaliações do colaborador pela data
//insert pegar a data e a classificação no front

//get ultima avaliação user


//get ultimas avaliações de cada colaborador (array com user e sua última avaliação) pipeline da coleção antiga
// [
//     {
//       '$lookup': {
//         'from': 'users', 
//         'localField': 'user', 
//         'foreignField': '_id', 
//         'as': 'user'
//       }
//     }, {
//       '$unwind': {
//         'path': '$user'
//       }
//     }, {
//       '$sort': {
//         'dataHora': 1
//       }
//     }, {
//       '$group': {
//         '_id': '$user', 
//         'dataUltima': {
//           '$max': '$dataHora'
//         }, 
//         'pulso': {
//           '$last': '$pulso'
//         }, 
//         'sistolica': {
//           '$last': '$pressaoSistolica'
//         }, 
//         'diastolica': {
//           '$last': '$pressaoDiastolica'
//         }
//       }
//     }
//   ]


};
