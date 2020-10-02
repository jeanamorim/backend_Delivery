import { Op } from 'sequelize';
import Estabelecimento from '../../models/Estabelecimento';
import File from '../../models/File';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';
import FormatProductService from '../../../services/FormatProductService';

class BuscarProducts {
  async index(req, res) {
    if (req.params.id) {
      const product = await Product.findByPk(req.params.id, {
        order: [['id', 'DESC']],
        attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
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

      const productFormatted = await FormatProductService.run(product);

      return res.json(productFormatted);
    }

    if (req.query) {
      if (req.query.category) {
        const products = await Product.findAll({
          where: {
            category_id: req.query.category,
          },
          order: [['id', 'DESC']],
          attributes: [
            'id',
            'name',
            'description',
            'quantity',
            'unit',
            'price',
          ],
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
      if (req.query.search) {
        const searchedProducts = await Product.findAll({
          where: {
            name: {
              estabelecimento_id: req.params.id,
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          order: [['id', 'DESC']],
          attributes: [
            'id',
            'name',
            'description',
            'quantity',
            'unit',
            'price',
          ],
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

        const productsFormatted = await FormatProductService.run(
          searchedProducts,
        );

        return res.json(productsFormatted);
      }
    }

    return res.json();
  }
}
export default new BuscarProducts();
