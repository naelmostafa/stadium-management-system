import { Pool } from 'pg';
import { database } from './constants';

const client = new Pool({
  host: database.HOST,
  database: database.DATABASE,
  user: database.USER,
  password: database.PASSWORD,

});

export { client };
