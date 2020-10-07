import Admin from '../models/Admin';
import User from '../models/User';

class AdminController {
  async store(req, res) {
    const alreadyIsAdminCheck = await Admin.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });

    if (alreadyIsAdminCheck) {
      return res.status(401).json('User is already admin');
    }

    const { id, user_id } = await Admin.create(req.body);

    return res.json({ id, user_id });
  }

  async index(req, res) {
    const admins = await Admin.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
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
        },
      ],
    });

    return res.json(admins);
  }

  async delete(req, res) {
    await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new AdminController();
