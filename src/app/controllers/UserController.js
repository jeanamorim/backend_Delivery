import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
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
      last_name,
      email,
      phone,
      birthday,
      gender,
      cpf,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      last_name,
      email,
      phone,
      birthday,
      gender,
      cpf,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'last_name',
        'email',
        'phone',
        'birthday',
        'gender',
        'cpf',
      ],
    });

    return res.json(users);
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(
      req.body.user_id ? req.body.user_id : req.userId,
    );

    if (email !== user.email) {
      const userExists = await User.findOne({
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
      id,
      name,
      last_name,
      phone,
      birthday,
      gender,
      cpf,
    } = await user.update(req.body);

    return res.json({
      id,
      name,
      last_name,
      email,
      phone,
      birthday,
      gender,
      cpf,
    });
  }
}

export default new UserController();
