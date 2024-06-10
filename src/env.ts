interface Jwt {
  secretKey: string;
  expirationTime: string;
}

interface Database {
  host: string;
  user: string;
  password: string;
  db: string;
  port: string;
}

interface Env {
  jwt: Jwt;
  database: Database;
}

export const env: Env = {
  jwt: {
    secretKey: 'JWT_SECRET_KEY',
    expirationTime: 'JWT_EXPIRATION_TIME',
  },
  database: {
    host: 'DATABASE_HOST',
    user: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
    db: 'DATABASE_DB',
    port: 'DATABASE_PORT',
  },
};
