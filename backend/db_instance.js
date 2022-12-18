const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

(async () => {
    await sequelize.authenticate();
})();

module.exports = sequelize;