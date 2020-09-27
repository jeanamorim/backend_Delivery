/* eslint-disable func-names */

import Schedule from '../models/Schedule';

class ScheduleControllers {
  async store(req, res) {
    const { schedule } = req.body;

    const classSchedule = schedule.map(item => {
      return {
        estabelecimento_id: req.estabelecimentoId,
        week_day: item.week_day,
        from: item.from,
        to: item.to,
      };
    });

    Schedule.bulkCreate(classSchedule)
      .then(function() {
        return Schedule.findAll();
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(error) {
        res.json(error);
      });
  }

  async index(req, res) {
    const schedule = await Schedule.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      order: [['id', 'DESC']],
      attributes: ['id', 'week_day', 'from', 'to'],
    });

    return res.json(schedule);
  }

  async update(req, res) {
    const hours = await Schedule.findByPk(req.params.id);

    const { from, to, week_day } = await hours.update(req.body);

    return res.json({ from, to, week_day });
  }

  async delete(req, res) {
    await Schedule.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new ScheduleControllers();
