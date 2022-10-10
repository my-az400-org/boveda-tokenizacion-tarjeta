module.exports.RESPONSE_MENSAJES = {
  EMPTY_DATA_LIST: 'No se encontraron datos para la consulta',
  FULL_DATA_LIST: 'Consulta ejecutada correctamente',
  INSERT_DATA: 'Se procesó correctamente el registro',
  UPDATE_DATA: 'Se actualizó correctamente el registro',
  DELETE_DATA: 'Se anuló correctamente el registro'
};

module.exports.REGEX_VALIDATION = {
  TRANSACCION: '^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$',
  OPERACION: '(^0[1-9]$)|(^[1-9]{1}[0-9]{1}$)',
  FECHA: '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$',
  DOCUMENTO_RUC: '(^20[0-9]+$)|(^10[0-9]+$)|(^15[0-9]+$)|(^17[0-9]+$)',
  DOCUMENTO_DNI: '^[a-zA-Z0-9_.*-]+$',
  UUID: '^[a-z0-9-]+$',
  NUMERICO: '^[0-9]+$',
  NUMERICO_GUION: '^[0-9-]+$',
  STRING_FECHA_YMD: '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$',
  STRING_BASE_1: '^(?!\\s*$).+'
};
