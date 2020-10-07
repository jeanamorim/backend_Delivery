import Setting from '../models/Setting';

class SettingController {
  async store(req, res) {
    const settings = await Setting.findAll();

    if (settings.length) {
      return res
        .status(400)
        .json({ error: 'Settings have already been created' });
    }

    const createSettings = await Setting.create(req.body);

    return res.json(createSettings);
  }

  async index(req, res) {
    const settings = await Setting.findAll();

    return res.json(settings);
  }

  async update(req, res) {
    const settings = await Setting.findByPk(1);

    const settingsUpdated = await settings.update(req.body);

    return res.json(settingsUpdated);
  }
}

export default new SettingController();
