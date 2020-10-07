import { Op } from 'sequelize';

import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';
import { sendMessage } from '../../websocket';

import FormatProductService from '../../services/FormatProductService';

class ProductController {
  async store(req, res) {
    const {
      name,
      description,
      quantity,
      unit,
      image_id,
      category_id,
      price,
      variacao,
    } = req.body;

    const products = await Product.create({
      estabelecimento_id: req.estabelecimentoId,
      name,
      description,
      quantity,
      unit,
      image_id,
      category_id,
      price,
      variacao,
    });
    if (variacao && variacao.length > 0) {
      products.setVariacao(variacao);
    }

    // / fazendo a chamada do produto cadastrado para enviar para o socket

    const NewProduct = await Product.findAll({
      where: {
        id: products.id,
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
    sendMessage(products.estabelecimento_id, 'NEW_PRODUCT', NewProduct);

    return res.json(products);
  }

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

    const productsFormatted = await FormatProductService.run();

    return res.json(productsFormatted);
  }

  async update(req, res) {
    const { id } = req.params;
    const post = await Product.findByPk(id);

    const { variacao, ...data } = req.body;
    post.update(data);

    if (variacao && variacao.length > 0) {
      post.setVariacao(variacao);
    }

    const result = {
      variacao,
      ...data,
    };
    sendMessage(req.estabelecimentoId, 'UPDATE_PRODUCT', result);
    return res.json(post);
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new ProductController();
