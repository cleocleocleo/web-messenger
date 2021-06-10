const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        logging: false,
        dialect: 'postgres'
    },
);

module.exports = db;
