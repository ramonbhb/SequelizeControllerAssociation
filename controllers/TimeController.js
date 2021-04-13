const { Time, Cidade } = require ('../models/');
const { Op } = require("sequelize");

class TimeController {
    /* DEFINIR MÉTODOS */

    async create(req,res) {
        try {
            let dataFundacao = req.body.dataFundacao; // 02/01/1921
            let datas = dataFundacao.split('/'); // ['02','01','1921'];
            dataFundacao = datas[1] + '/' + datas[0] + '/' + datas[2];
            let time = {
                nome: req.body.nome,
                titulos: Number(req.body.titulos),
                dataFundacao: new Date(dataFundacao)
            }
            const timeResult = await Time.create(time);
            return res.status(200).json(timeResult); 
        } catch (err) {
            return res.status(400).json({error: err.mesage});
        }
    }

    async getAll(req,res) {
        try {
            /* fazer algum tratamento, ALGUMA REGRA DE NEGÓCIO */
            const times = await Time.findAll({
                include: [{
                  model: Cidade,
                  as: 'cidades'
                }]
            });
            return res.status(200).json(times);
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getOne(req,res) {
        try {
            const time = await Time.findByPk(req.params.id);
            if (time)
                return res.status(200).json(time);
            else 
                return res.status(200).json({mensagem: "Time não encontrado"});
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async update(req,res) {
        try {
            const time = await Time.findByPk(req.params.id);
            if (time) {
                /* req.body
                { nome, titulos, dataFundacao } */
                await time.update(req.body);
                return res.status(200).json(time);
            }
            else {
                return res.status(200).json({mensagem: "Time não encontrado para atualizar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async delete (req,res) {
        try {
            const time = await Time.findByPk(req.params.id);
            if (time) {                
                await time.destroy();
                return res.status(200).json(time);
            }
            else {
                return res.status(200).json({mensagem: "Time não encontrado para deletar"});
            }
        }
        catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async getAllByNome (req,res) {
        let nome = '%' + req.query.nome + '%';
        try {
            const times = await Time.findAll({
                where: {
                    nome: {
                        [Op.like]: nome
                        // [Op.eq]: // 
                    }
                }
            });

            if (times)
                return res.status(200).json(times);
            else
                return res.status(200).json({mensagem: "Não foram encontrados times"})
        }
        catch(err) {

        }
    }

}
module.exports = new TimeController();