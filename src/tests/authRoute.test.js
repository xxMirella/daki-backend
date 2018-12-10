const assert = require('assert');
const AuthRoute = require('../routes/authRoute');
const mock = require('./mocks/login');

describe('Suite de testes para login do usuário', () => {
  it('Usuário deve logar sem erros', () => {
    const authRoute = new AuthRoute();
    const expected = mock["success-login"];
    const result = authRoute.login(mock["login-valido"]);

    assert.equal( result, expected );
  })
});
