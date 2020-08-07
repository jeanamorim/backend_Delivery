import Estabelecimento from '../models/Estabelecimento';
import File from '../models/File';

// import AdminCheckService from '../../services/AdminCheckService';

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
    // await AdminCheckService.run({ user_id: req.userId });

    // const cached = await Cache.get('estabelecimento');

    // if (cached) return res.json(cached);
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

    // await Cache.set('estabelecimento', estabelecimento);
    res.header('X-Total-Count', count.count);
    return res.json(estabelecimento);
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const estabelecimento = await Estabelecimento.findByPk(
      req.body.estabelecimento_id
        ? req.body.estabelecimento_id
        : req.estabelecimentoId,
    );

    if (email !== estabelecimento.email) {
      const userExists = await Estabelecimento.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await estabelecimento.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
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
    } = await estabelecimento.update(req.body);

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
    });
  }
}

export default new EstabelecimentoController();
