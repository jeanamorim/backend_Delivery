import { addDays, isBefore, parseISO } from 'date-fns';

import Offer from '../models/Offer';
import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';

// mport AdminCheckService from '../../services/AdminCheckService';

class OfferController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

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

    return res.json(id);
  }

  async index(req, res) {
    const count = await Offer.findAndCountAll();
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
          ],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    const expiredCheck = JSON.parse(JSON.stringify(offers)).filter(
      offer => !isBefore(parseISO(offer.expiration_date), new Date()),
    );
    res.header('X-Total-Count', count.count);
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

    return res.json();
  }
}

export default new OfferController();
