class CommonUtils {
  static convertirFechaMySQL(fecha) {
    if (!fecha) {
      return null;
    }
    return `${fecha.slice(0, 4)}-${fecha.slice(4, 6)}-${fecha.slice(6, 8)}`;
  }

  static customStartDateFormat(value) {
    const calculatedDate = `${value.substr(6, 2)}/${value.substr(4, 2)}/${value.substr(0, 4)} 00:00:00`;
    return calculatedDate;
  }

  static customEndDateFormat(value) {
    const calculatedDate = `${value.substr(6, 2)}/${value.substr(4, 2)}/${value.substr(0, 4)} 23:60:59`;
    return calculatedDate;
  }
}

module.exports = CommonUtils;
