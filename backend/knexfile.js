module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'clodoaldo',
      password: '123',
      database: 'notes',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }
};
