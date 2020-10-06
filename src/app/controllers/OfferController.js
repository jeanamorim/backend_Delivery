import { addDays, isBefore, parseISO } from 'date-fns';

import Offer from '../models/Offer';
import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';
import Cache from '../../lib/Cache';

class OfferController {
  async store(req, res) {
    const { product_id, quantity, unit, from, to } = req.body;

    const expiration_date = addDays(new Date(), req.body.expires_in);

    const id = await Offer.create({
      estabelecimento_id: req.estabelecimentoId,
      product_id,
      quantity,
      unit,
      from,
      to,
      expiration_date,
    });
    await Cache.invalidate(`offers/${req.estabelecimentoId}`);
    await Cache.invalidate(`products/${req.estabelecimentoId}`);
    return res.json(id);
  }

  async index(req, res) {
    const cached = await Cache.get(`offers/${req.estabelecimentoId}`);

    if (cached) {
      const expiredCheck = cached.filter(
        offer => !isBefore(parseISO(offer.expiration_date), new Date()),
      );
      return res.json(expiredCheck);
    }
    const offers = await Offer.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: [
        'id',
        'product_id',
        'quantity',
        'unit',
        'from',
        'to',
        'expiration_date',
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [
            'id',
            'name',
            'description',
            'price',
            'unit',
            'quantity',
          ],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['name'],
            },
            {
              model: Variacao,
              as: 'variacao',
              attributes: ['name', 'minimo', 'maximo'],
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
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    const expiredCheck = JSON.parse(JSON.stringify(offers)).filter(
      offer => !isBefore(parseISO(offer.expiration_date), new Date()),
    );
    await Cache.set(`offers/${req.estabelecimentoId}`, expiredCheck);

    return res.json(expiredCheck);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const offer = await Offer.findByPk(req.params.id);

    const {
      id,
      expiration_date,
      quantity,
      unit,
      from,
      to,
    } = await offer.update(req.body);

    await Cache.invalidate(`offers/${req.estabelecimentoId}`);
    await Cache.invalidate(`products/${req.estabelecimentoId}`);

    return res.json({
      id,
      quantity,
      unit,
      from,
      to,
      expiration_date,
    });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Offer.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Cache.invalidate(`offers/${req.estabelecimentoId}`);
    return res.json();
  }
}

export default new OfferController();
