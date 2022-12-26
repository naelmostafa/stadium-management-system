import { Pool } from 'pg';
import { database } from './constants/app_constants';
import pg from 'pg';

const client = new Pool({
  host: database.HOST,
  database: database.DATABASE,
  user: database.USER,
  password: database.PASSWORD,
});
pg.types.setTypeParser(1082, (value) => value);

export { client };
