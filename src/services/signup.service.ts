import { QueryResult } from 'pg';
import { query } from '../db';
import { hashSync } from 'bcrypt';
import type { NewUserPayload } from '../types/';
import dotenv from 'dotenv';

dotenv.config();

export const insertNewUser = async (data: NewUserPayload): Promise<boolean> => {
  let newUserValues: string[] = [
    data.name,
    data.email,
    await hashSync(data.password, parseInt(process.env.SALT_ROUNDS))
  ];
  try {
    let result: QueryResult = await query('INSERT INTO users (name, email, pass_hash) VALUES ($1, $2, $3)', newUserValues);
    if (result.rowCount === 1) {
      return true;
    } 
    throw new Error();
  } catch (e: any) {
    console.log('error creating new user');
    return false;
  } 
}; 
