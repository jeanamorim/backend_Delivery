import Estabelecimento from '../models/Estabelecimento';
import File from '../models/File';

class EstabelecimentoList {
  async index(req, res) {
    const estabelecimento = await Estabelecimento.findAll({
      where: {
        id: req.params.id,
      },
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

    return res.json(estabelecimento);
  }
}

export default new EstabelecimentoList();
