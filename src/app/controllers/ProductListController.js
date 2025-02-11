import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';
import FormatProductService from '../../services/FormatProductService';

class ProductListController {
  async index(req, res) {
    const products = await Product.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
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

    const productsFormatted = await FormatProductService.run(products);

    return res.json(productsFormatted);
  }
}

export default new ProductListController();
