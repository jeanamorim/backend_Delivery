/* eslint-disable func-names */
/* eslint-disable no-unreachable */
import Frete from '../models/Frete';
import Estabelecimento from '../models/Estabelecimento';

// import AdminCheckService from '../../services/AdminCheckService';

class Fretes {
  async store(req, res) {
    const { frete } = req.body;

    const classFrete = frete.map(item => {
      return {
        estabelecimento_id: req.estabelecimentoId,
        name: item.name,
        price: item.price,
        status: item.status,
      };
    });

    Frete.bulkCreate(classFrete)
      .then(function() {
        return Frete.findAll();
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(error) {
        res.json(error);
      });
  }

  async index(req, res) {
    const frete = await Frete.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    return res.json(frete);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const frete = await Frete.findByPk(req.params.id);

    const { price, status } = await frete.update(req.body);

    // await Cache.invalidate('categories');

    return res.json({ price, status });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Frete.destroy({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
    });

    return res.json();
  }
}

export default new Fretes();
