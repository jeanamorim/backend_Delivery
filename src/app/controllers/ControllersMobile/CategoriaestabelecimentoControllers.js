import File from '../../models/File';
import Cache from '../../../lib/Cache';
import Category from '../../models/Category';

class CategoriaestabelecimentoControllers {
  async index(req, res) {
    const category = await Category.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },

      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });
    const cached = await Cache.get(`categories`);

    if (cached) return res.json(cached);

    await Cache.set(`categories`, category);

    return res.json(category);
  }
}

export default new CategoriaestabelecimentoControllers();
