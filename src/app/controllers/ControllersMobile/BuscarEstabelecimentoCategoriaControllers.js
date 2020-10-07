import { Op } from 'sequelize';
import Estabelecimento from '../../models/Estabelecimento';
import File from '../../models/File';
import Cache from '../../../lib/Cache';

class BuscarEstabelecimentoCategoriaControllers {
  async index(req, res) {
    if (req.query) {
      if (req.query.category) {
        const estabelecimento = await Estabelecimento.findAll({
          where: {
            categoria: req.query.category,
          },

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
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
          ],
        });
        const cached = await Cache.get(`estabelecimento`);

        if (cached) return res.json(cached);
        await Cache.set(`estabelecimento`, estabelecimento);

        return res.json(estabelecimento);
      }
      if (req.query.search) {
        const searchedProducts = await Estabelecimento.findAll({
          where: {
            name_loja: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
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
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
          ],
        });
        const cached = await Cache.get(`estabelecimento`);

        if (cached) return res.json(cached);
        await Cache.set(`estabelecimento`, searchedProducts);
        return res.json(searchedProducts);
      }
    }

    return res.json('');
  }
}
export default new BuscarEstabelecimentoCategoriaControllers();
