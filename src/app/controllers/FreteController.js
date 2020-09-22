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
      .then(() => {
        return Frete.update(classFrete);
      })
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
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(frete);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const { name, price, status } = req.body;

    Frete.bulkCreate(name, price, status, {
      updateOnDuplicate: ['name', 'price', 'status'],
    });

    return res.json({ name, price, status });
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
