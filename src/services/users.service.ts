import { query } from '../db/index.js';
import { QueryResult } from 'pg';
import { User } from '../models';
import { prepareQueryFieldsFromMap } from '../utils';

interface UpdateDocument {
  [key: string]: any
};

export const getAllUsers = async (): Promise<User[]>  => {
  let result: QueryResult = await query('SELECT id, name FROM users', []);
  if (result.rowCount !== 0) {
    return result.rows;
  };
  return [];
};

export const getOneUserById = async (id: string): Promise<any> => {
  let result: QueryResult = await query('SELECT id, name FROM users WHERE id = $1 LIMIT 1', [id]);
  if (result.rowCount !== 0) {
    return result.rows[0];
  }
  return null;
};

export const updateOneUserById = async (id: string, updateDocument: UpdateDocument): Promise<boolean> => {
  let params: any[] = [];
  let queryString = prepareQueryFieldsFromMap(updateDocument, 'UPDATE users SET ', params);
  queryString += ` WHERE id = $${params.length + 1}`;
  params.push(id);
  let result: QueryResult = await query(queryString, params);
  if (result.rowCount === 1) {
    return true;
  }
  return false;
};

export const deleteOneUserById = async (id: string): Promise<boolean> => {
  let result: QueryResult = await query('DELETE FROM users WHERE id = $1', [id]);
  if (result.rowCount === 1) {
    return true;
  }
  return false;
};
