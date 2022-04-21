const { param } = require("express/lib/request");

const updateValidator = () => [
  body("titulo").optional().notEmpty().isString(),
  body("descricao").optional().notEmpty().isString(),
  body("tempo_preparo").optional().notEmpty(),
  isInt(),
  body("rendimento").optional().notEmpty().isInt(),
  body("custo_medio").optional().notEmpty().isInt(),
];

module.exports = { updateValidator };
