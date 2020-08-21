import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';

class ProductDetailsController {
  async index(req, res) {
    const product = await Product.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        category_id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'price', 'unit', 'quantity'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Variacao,
          as: 'variacao',
          attributes: ['id', 'name', 'minimo', 'maximo'],
          through: { attributes: [] },
          include: [
            {
              model: Opcao,
              as: 'opcao',
              attributes: ['id', 'name', 'price', 'status'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return res.json(product);
  }
}

export default new ProductDetailsController();
