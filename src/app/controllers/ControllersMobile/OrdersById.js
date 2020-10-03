import Order from '../../models/Order';
import OrderDetail from '../../models/OrderDetail';
import Estabelecimento from '../../models/Estabelecimento';
import Product from '../../models/Product';
import File from '../../models/File';
import User from '../../models/User';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'date',
        'status',
        'addressee',
        'observacao',
        'troco',
        'payment_method',
        'ship_postal_code',
        'ship_street',
        'ship_street_n',
        'ship_neighborhood',
        'ship_city',
        'ship_state',
        'ship_complement',
        'ship_reference',
        'delivery_fee',
        'discount',
        'subtotal',
        'total',
      ],
      include: [
        {
          model: OrderDetail,
          as: 'order_details',
          attributes: ['quantity', 'price', 'total'],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['name', 'description', 'price', 'quantity', 'unit'],
              include: [
                {
                  model: File,
                  as: 'image',
                  attributes: ['path', 'url'],
                },
              ],
            },
          ],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja', 'phone'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new OrderController();
