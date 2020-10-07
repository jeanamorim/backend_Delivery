import Category from '../models/Category';
import File from '../models/File';
import Estabelecimento from '../models/Estabelecimento';
import { sendMessage } from '../../websocket';
import Cache from '../../lib/Cache';

class CategoryController {
  async store(req, res) {
    const { name, image_id } = req.body;

    const categories = await Category.create({
      estabelecimento_id: req.estabelecimentoId,
      name,
      image_id,
    });
    await Cache.invalidate(`categories`);
    // buscando a categoria cadastrada para enviar para o socket
    const Newcategories = await Category.findAll({
      where: {
        id: categories.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    // /enviar para o socket a categoria cadastrada
    sendMessage(categories.estabelecimento_id, 'NEW_CATEGORIAS', Newcategories);

    return res.json(categories);
  }

  async index(req, res) {
    const cached = await Cache.get(`categories`);

    if (cached) return res.json(cached);
    const categories = await Category.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });
    await Cache.set(`categories`, categories);
    return res.json(categories);
  }

  async update(req, res) {
    const category = await Category.findByPk(req.params.id);

    const { id, name, image_id } = await category.update(req.body);

    const result = {
      id,
      name,
      image_id,
    };
    await Cache.invalidate(`categories`);
    sendMessage(req.estabelecimentoId, 'UPDATE_CATEGORIAS', result);

    return res.json(result);
  }

  async delete(req, res) {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Cache.invalidate(`categories`);
    return res.json();
  }
}

export default new CategoryController();
