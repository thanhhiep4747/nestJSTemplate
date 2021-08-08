/* eslint-disable prettier/prettier */
import * as sql from 'mssql';
import { IProcedureResult } from 'mssql';
import { EnumerablePage } from './models/EnumerablePage';

export class BaseRepository {
  databaseConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    server: process.env.DATABASE_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
      enableArithAbort: true,
    },
  };

  protected executeProcedureForListResultAsync<T>(
    procedureName: string,
    request?: any,
  ): Promise<T[]> {
    return this.executeProcedure(procedureName, request).then((result) => {
      return result.recordset;
    });
  }

  protected executeProcedureForSingleResultAsync<T>(
    procedureName: string,
    request?: any,
  ): Promise<T> {
    return this.executeProcedure(procedureName, request).then((result) => {
      const firstRecord = result.recordset[0];
      if (!firstRecord) return firstRecord;
      if (
        Object.keys(firstRecord).length == 1 &&
        Object.keys(firstRecord)[0] == ''
      ) {
        return firstRecord[''];
      }
      return firstRecord;
    });
  }

  protected executeProcedureForGetPagedAsync<T>(
    procedureName: string,
    request?: any,
  ): Promise<EnumerablePage<T>> {
    return this.executeProcedure(procedureName, request).then((result) => {
      const response = new EnumerablePage<T>();
      response.PageData = result.recordsets[0] || [];
      response.TotalCount = result.recordsets[1][0][''] || 0;
      return response;
    });
  }

  protected executeProcedureAsync(
    procedureName: string,
    addRequestCallback?: any,
  ): Promise<IProcedureResult<any>> {
    const pool = new sql.ConnectionPool(this.databaseConfig);
    return new Promise((resolve, reject) => {
      pool.connect().then(() => {
        let sqlRequest = new sql.Request(pool);
        if (addRequestCallback) {
          sqlRequest = addRequestCallback(sqlRequest);
        }
        sqlRequest.execute(procedureName).then((result) => {
          resolve(result);
        });
      });
    });
  }

  protected queryAsync(
    query: string,
    addRequestCallback?: any,
  ): Promise<IProcedureResult<any>> {
    const pool = new sql.ConnectionPool(this.databaseConfig);
    return new Promise((resolve, reject) => {
      pool.connect().then(() => {
        let sqlRequest = new sql.Request(pool);
        if (addRequestCallback) {
          sqlRequest = addRequestCallback(sqlRequest);
        }
        sqlRequest.query(query).then((result) => {
          resolve(result);
        });
      });
    });
  }

  private executeProcedure(
    procedureName: string,
    request: any = {},
  ): Promise<IProcedureResult<any>> {
    const pool = new sql.ConnectionPool(this.databaseConfig);
    return new Promise((resolve, reject) => {
      pool.connect().then(() => {
        const sqlRequest = new sql.Request(pool);
        for (const key in request) {
          const value = request[key];
          if (value || value == 0) {
            sqlRequest.input(key, value);
          }
        }
        sqlRequest.execute(procedureName).then((result) => {
          resolve(result);
        });
      });
    });
  }
}
