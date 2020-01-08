'use strict'

// SQLite3 database client
// https://github.com/mapbox/node-sqlite3
const sqlite = require('sqlite3').verbose()
// log to files
const logger = require('console-files')

// setup table to reference PayPal transaction to respective store
const dbFilename = process.env.DB_PATH || process.env.ECOM_AUTH_DB || './db.sqlite'
const dbTable = 'store_transactions'

const db = new sqlite.Database(dbFilename, err => {
  const error = err => {
    // debug and destroy Node process
    logger.error(err)
    process.exit(1)
  }

  if (err) {
    error(err)
  } else {
    // try to run first query creating table
    db.run(`CREATE TABLE IF NOT EXISTS ${dbTable} (
      transaction_code   VARCHAR   NOT NULL  PRIMARY KEY,
      store_id           INTEGER   NOT NULL,
      order_id           VARCHAR
    );`, err => {
      if (err) {
        error(err)
      }
    })
  }
})

// abstracting DB statements with promise
const dbRunPromise = (sql, params) => new Promise((resolve, reject) => {
  db.run(sql, params, err => {
    if (err) {
      logger.error(err)
      reject(err)
    } else {
      // query executed with success
      resolve()
    }
  })
})

module.exports = {
  save (transactionCode, storeId, orderId) {
    // insert a new row
    const sql = `INSERT INTO ${dbTable} (transaction_code, store_id, order_id) VALUES (?, ?, ?)
      ON CONFLICT(transaction_code) DO UPDATE SET
        store_id=excluded.store_id, order_id=excluded.order_id`
    return dbRunPromise(sql, [transactionCode, storeId, orderId])
  },

  remove (transactionCode) {
    // delete a row
    const sql = `DELETE FROM ${dbTable} WHERE transaction_code = ?`
    return dbRunPromise(sql, [transactionCode])
  },

  get (transactionCode) {
    // find store and order for given PayPal order ID (transaction code)
    const sql = `SELECT * FROM ${dbTable} WHERE transaction_code = ? LIMIT 1`
    return new Promise((resolve, reject) => {
      db.get(sql, [transactionCode], (err, row) => {
        if (err) {
          logger.error(err)
          reject(err)
        } else if (row) {
          // found with success
          // resolve the promise returning respective store and order IDs
          resolve({
            storeId: row.store_id,
            orderId: row.order_id
          })
        } else {
          const err = new Error('Transaction not found')
          err.name = 'TransactionCodeNotFound'
          reject(err)
        }
      })
    })
  }
}
