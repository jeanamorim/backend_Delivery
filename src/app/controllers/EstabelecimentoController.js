import Estabelecimento from '../models/Estabelecimento';
import File from '../models/File';
import Cache from '../../lib/Cache';

class EstabelecimentoController {
  async store(req, res) {
    const userExists = await Estabelecimento.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const {
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
    } = await Estabelecimento.create(req.body);
    await Cache.invalidate(`estabelecimento`);

    return res.json({
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
    });
  }

  async index(req, res) {
    const cached = await Cache.get(`estabelecimento`);

    if (cached) return res.json(cached);
    const count = await Estabelecimento.findAndCountAll();
    const { page = 1 } = req.query;
    const estabelecimento = await Estabelecimento.findAll({
      order: [['status']],
      limit: 15,
      offset: (page - 1) * 15,
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
    });
    await Cache.set(`estabelecimento`, estabelecimento);
    res.header('X-Total-Count', count.count);
    return res.json(estabelecimento);
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await Estabelecimento.findByPk(
      req.body.estabelecimento_id
        ? req.body.estabelecimento_id
        : req.estabelecimentoId,
    );

    if (email !== user.email) {
      const userExists = await Estabelecimento.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
    } = await user.update(req.body);
    await Cache.invalidate(`estabelecimento`);

    return res.json({
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
      image_id,
    });
  }
}

export default new EstabelecimentoController();
