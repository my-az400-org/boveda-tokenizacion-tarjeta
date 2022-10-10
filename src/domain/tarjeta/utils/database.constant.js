module.exports = {
  GET_USERNAME_USER:
  `
  SELECT COUNT(*) as total
  FROM usuario
  WHERE username = :username
  `,
  REGISTRAR_USUARIO:
  `
  INSERT INTO usuario (tipoUsuario, email, username, password)
  VALUES (:tipoUsuario, :email, :username, :password)
  `,
  ACTUALIZAR_USUARIO:
  `
  UPDATE usuario
  SET tipoUsuario = :tipoUsuario, email = :email, username = :username, password = :password
  WHERE id = :id
  `,
  ANULAR_USUARIO:
  `
  UPDATE usuario
  SET estado = 2
  WHERE id = :id
  `
};
