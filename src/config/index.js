const { readFileSync } = require('fs')
const { join } = require('path')

const { load: loadYaml } = require('js-yaml')

const immutable = Object.freeze

const loadOpenApiJson = () => {
  const openApiPath = join(__dirname, '..', '..', 'docs', 'openapi.yml')
  const openApiFileContent = readFileSync(openApiPath)
  return loadYaml(openApiFileContent)
}

const swagger = immutable({
  document: loadOpenApiJson(),
  options: immutable({
    explorer: false,
  }),
})

const database = immutable({
  client: 'mysql2',
  connection: immutable({
    host : '127.0.0.1',
    port : 3306,
    user : 'staart',
    password : 'staart',
    database : 'users',
  }),
  migrations: immutable({
    tableName: 'migrations',
  })
})

const encryption = immutable({
  salt: 'salt',
  iterations:100000,
  keyLength: 64,
  digest: 'sha512'
})

const jwt = immutable({
  secret: 'staart',
  expiration: '4h',
  audience: 'urn:api:client',
  issuer: 'urn:api:issuer'
})

module.exports = immutable({
  database,
  swagger,
  encryption,
  jwt
})
