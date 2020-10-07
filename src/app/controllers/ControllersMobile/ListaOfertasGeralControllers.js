import { isBefore, parseISO } from 'date-fns';
import Offer from '../../models/Offer';
import Product from '../../models/Product';
import File from '../../models/File';
import Category from '../../models/Category';
import Estabelecimento from '../../models/Estabelecimento';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';
import Cache from '../../../lib/Cache';

class OfertasGeral {
  async index(req, res) {
    const cached = await Cache.get(`offers`);

    if (cached) {
      const expiredCheck = cached.filter(
        offer => !isBefore(parseISO(offer.expiration_date), new Date()),
      );
      return res.json(expiredCheck);
    }
    const offers = await Offer.findAll({
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
    await Cache.set(`offers`, expiredCheck);

    return res.json(expiredCheck);
  }
}

export default new OfertasGeral();
