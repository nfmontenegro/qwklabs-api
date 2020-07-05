"use strict";

import fs from "fs";
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.js`)[env];

interface DB {
  [key: string]: any;
}

const db: DB = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter((file: string): boolean => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file: string): void => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
// Important: creates associations based on associations defined in associate function in the model files
Object.keys(db).forEach((modelName: any): void => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
