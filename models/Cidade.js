const sequelize = require("sequelize");
const { Time } = require ('../models/');

module.exports = (sequelize, Sequelize) => {
    const Cidade = sequelize.define("Cidade", {
        nome: Sequelize.STRING,
        uf: Sequelize.STRING,     
    })

    Cidade.associate = (models) => {
        Cidade.hasMany(models.Time, {
            foreignKey: {
                name: 'cidadeId',
                allowNull: false
              },
            as: 'cidades'
        });
    };

    return Cidade;
}