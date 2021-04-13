const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Time = sequelize.define("Time", {
        nome: Sequelize.STRING,
        titulos: Sequelize.INTEGER,
        dataFundacao: Sequelize.DATE,
    /*    email: {
            type: Sequelize.STRING,
            validade: {
                isEmail: true
            }
        }
    */
    })

    Time.associate = (models) => {
        Time.belongsTo(models.Cidade, {
          foreignKey: {
            name: 'cidadeId',
            allowNull: false
          },
          as: 'cidades'
        });
      };

    return Time;
}