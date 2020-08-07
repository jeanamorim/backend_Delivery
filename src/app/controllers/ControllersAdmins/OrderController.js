import db from '../../../database';

import Order from '../../models/Order';
import OrderDetail from '../../models/OrderDetail';
import User from '../../models/User';
import Product from '../../models/Product';
import Estabelecimento from '../../models/Estabelecimento';
import File from '../../models/File';

import CancelOrderService from '../../../services/CancelOrderService';
import AdminCheckService from '../../../services/AdminCheckService';

const sequelize = db.connection;

let transaction;

class OrderController {
  async index(req, res) {
    if (req.query.id && req.query.id > 0) {
      const order = await Order.findByPk(req.query.id, {
        attributes: [
          'id',
          'date',
          'status',
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
                attributes: [
                  'name',
                  'description',
                  'price',
                  'quantity',
                  'unit',
                ],
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
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'phone'],
          },
        ],
      });

      return res.json(order);
    }

    const orders = await Order.findAll({
      attributes: [
        'id',
        'date',
        'status',
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

  async update(req, res) {
    await AdminCheckService.run({ user_id: req.userId });

    try {
      transaction = await sequelize.transaction();

      const order = await Order.findByPk(req.params.id);

      const {
        id,
        date,
        user_id,
        status,
        name,
        ship_postal_code,
        ship_street,
        ship_street_n,
        ship_neighborhood,
        ship_city,
        ship_state,
        ship_complement,
        ship_reference,
        delivery_fee,
        discount,
        subtotal,
        total,
        payment_method,
        payment_condition,
        cc_brand,
        cc_last_4_digits,
      } = await order.update(req.body, transaction);

      if (req.body.products) {
        req.body.products.map(async product => {
          const orderDetail = await OrderDetail.findOne({
            where: {
              product_id: product.product_id,
              order_id: id,
            },
          });
          await orderDetail.update(product, transaction);
        });

        await transaction.commit();

        return res.json({
          id,
          date,
          user_id,
          status,
          name,
          ship_postal_code,
          ship_street,
          ship_street_n,
          ship_neighborhood,
          ship_city,
          ship_state,
          ship_complement,
          ship_reference,
          subtotal,
          delivery_fee,
          discount,
          total,
          payment_method,
          payment_condition,
          cc_brand,
          cc_last_4_digits,
          products: req.body.products,
        });
      }

      await transaction.commit();

      return res.json({
        id,
        date,
        user_id,
        status,
        name,
        ship_postal_code,
        ship_street,
        ship_street_n,
        ship_neighborhood,
        ship_city,
        ship_state,
        ship_complement,
        ship_reference,
        subtotal,
        delivery_fee,
        discount,
        total,
        payment_method,
        payment_condition,
        cc_brand,
        cc_last_4_digits,
      });
    } catch (err) {
      if (transaction) await transaction.rollback();
      return res.status(400).json({
        error: err,
      });
    }
  }

  async delete(req, res) {
    await AdminCheckService.run({ user_id: req.userId });

    const CancelOrder = await CancelOrderService.run({
      order_id: req.params.id,
    });

    return res.json(CancelOrder);
  }
}

export default new OrderController();
