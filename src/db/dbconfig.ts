import { createPool } from "mysql2/promise";
// Create the connection pool. The pool-specific settings are the defaults
const conexiondb = createPool({
  host: "localhost",
  user: "root",
  password:'19199697tsoCD',
  database: "tiendamegahogar",
  waitForConnections: true,
  connectionLimit: 150,
  maxIdle: 150, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export { conexiondb };

