const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const swagger = require('hapi-swagger');
const hapiJwt = require('hapi-auth-jwt2');


const swaggerConfig = {
  info: {
    title: 'API Daki Social Network',
    version: '1.1',
  },
  lang: 'pt'
};

class ServerHapi {

  constructor(port, host, key) {
    this.key = key;
    this.server = hapi.server(
      {
        port: port,
        host: host,
        routes: {
          cors: true,
        }
      }
    );
  }

  async init(routes) {
    this.server.route(routes);

    await this.server.register([
      hapiJwt,
      vision,
      inert,
      {
        plugin: swagger,
        options: swaggerConfig,
      }
    ]);

    this.server.auth.strategy('jwt', 'jwt', {
      key: this.key,
      verifyOptions: {
        algorithms: ['HS256'],
      },
      validate: () => {
        return {
          isValid: true,
        }
      }
    });

    await this.server.auth.default('jwt');
    await this.server.start();
    console.log('Server running at: ' + this.server.info.uri);
  }

}

module.exports = ServerHapi;