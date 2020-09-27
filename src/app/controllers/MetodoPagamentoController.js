/* eslint-disable func-names */
import Pagamento from '../models/MetodoPagamento';
import File from '../models/File';

class MetodoPagamentoController {
  async store(req, res) {
    const { metodo } = req.body;

    const pagamento = metodo.map(item => {
      return {
        estabelecimento_id: req.estabelecimentoId,
        image_id: item.image_id,
        name: item.name,
        status: item.status,
      };
    });

    Pagamento.bulkCreate(pagamento)
      .then(function() {
        return Pagamento.findAll();
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(error) {
        res.json(error);
      });
  }

  async index(req, res) {
    const pagamento = await Pagamento.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'name', 'status'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(pagamento);
  }

  async update(req, res) {
    const pagamento = await Pagamento.findByPk(req.params.id);

    const { name, status } = await pagamento.update(req.body);

    return res.json({ name, status });
  }

  async delete(req, res) {
    await Pagamento.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new MetodoPagamentoController();
