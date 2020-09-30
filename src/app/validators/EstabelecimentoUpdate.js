import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      estabelecimento_id: Yup.number(),
      name: Yup.string(),
      name_loja: Yup.string(),
      status: Yup.string(),
      avaliacao: Yup.string(),
      categoria: Yup.string(),
      tempo_entrega: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.min(6).required() : field,
      ),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field,
      ),
      phone: Yup.string(),
      birthday: Yup.date(),
      gender: Yup.string().length(1),
      cpf: Yup.string().length(11),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
