import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import db from '../../database';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import Estabelecimento from '../models/Estabelecimento';
import Product from '../models/Product';
import File from '../models/File';
import User from '../models/User';
import { sendMessage } from '../../websocket';
import CreateOrderService from '../../services/CreateOrderService';
import CancelOrderService from '../../services/CancelOrderService';
// import AdminCheckService from '../../services/AdminCheckService';

const sequelize = db.connection;

let transaction;

class OrderController {
  async store(req, res) {
    const CreateOrder = await CreateOrderService.run(req.body);

    return res.json(CreateOrder);
  }

  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);
    if (req.query.id && req.query.id > 0) {
      const order = await Order.findByPk(req.query.id, {
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
      where: {
        estabelecimento_id: req.estabelecimentoId,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
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
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
      ],
      order: ['date'],
    });

    return res.json(orders);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    try {
      transaction = await sequelize.transaction();

      const order = await Order.findByPk(req.params.id);

      const {
        id,
        date,
        user_id,
        estabelecimento_id,
        status,
        addressee,
        observacao,
        troco,
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

        const result = {
          id,
          date,
          user_id,
          estabelecimento_id,
          status,
          addressee,
          observacao,
          troco,
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
        };
        sendMessage(user_id, 'Update-order', result);
        return res.json({
          result,
        });
      }

      await transaction.commit();

      const result1 = {
        id,
        date,
        user_id,
        estabelecimento_id,
        status,
        addressee,
        observacao,
        troco,
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
      };
      sendMessage(user_id, 'Update-order', result1);
      return res.json({
        result1,
      });
    } catch (err) {
      if (transaction) await transaction.rollback();
      return res.status(400).json({
        error: err,
      });
    }
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const CancelOrder = await CancelOrderService.run({
      order_id: req.params.id,
    });

    return res.json(CancelOrder);
  }
}

export default new OrderController();
