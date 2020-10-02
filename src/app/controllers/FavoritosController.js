import User from '../models/User';
import Favoritos from '../models/Favoritos';
import Estabelecimento from '../models/Estabelecimento';

class FavoritosController {
  async store(req, res) {
    const { user_id, estabelecimento_id } = req.body;

    const favoritos = await Favoritos.create({
      estabelecimento_id,
      user_id,
    });

    return res.json(favoritos);
  }

  async index(req, res) {
    const favoritos = await Favoritos.findAll({
      where: {
        user_id: req.params.id,
      },
      order: [['id', 'DESC']],

      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: [
            'id',
            'name',
            'name_loja',
            'status',
            'avaliacao',
            'categoria',
            'tempo_entrega',
            'email',
            'phone',
            'birthday',
            'gender',
            'cpf',
          ],
        },
      ],
    });

    return res.json(favoritos);
  }

  async delete(req, res) {
    await Favoritos.destroy({
      where: {
        estabelecimento_id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new FavoritosController();
