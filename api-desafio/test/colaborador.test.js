const config = require('./config.json');


test('Retorna Colaboradores', async () => {

    //const apiPath = 'http://localhost:3000/explorer/swagger.json';
    const apiPath = config;
    let Swagmock = require('swagmock');
    let mockgen = Swagmock(apiPath);
    let resp;

    const data = await mockgen.responses({
        path: '/Colaboradors',
        operation: 'get',
        response: 200
    }).then(function (res) {
        console.log(res)
        resp = res;
    })
        .catch(function (err) {
            console.log(err);
        });

    expect(resp).toBeTruthy()
});




