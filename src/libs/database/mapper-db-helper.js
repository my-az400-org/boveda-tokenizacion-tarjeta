/* eslint-disable no-param-reassign */
class Mapper {
  static sqlResultToObject(source = {}, target) {
    const object = {};
    Object.entries(source).forEach(([key, value]) => {
      // const property = key.toLowerCase().split('_')
      const property = key.split('_')
        .map((obj) => obj.replace(/(-\w)/g, (c) => c.charAt(1).toUpperCase()));
      this.setPropertyValue(object, property, value);
    });
    return !target ? object : this.copyObjectProperties(object, target);
  }

  static copyObjectProperties(source = {}, target = {}) {
    return Object.keys(target).reduce((a, key) => { return { ...a, [key]: source[key] }; }, {});
  }

  static setPropertyValue(object = {}, property = [], value) {
    let level = 0;
    property.reduce((a, b) => {
      // eslint-disable-next-line no-plusplus
      level++;

      if (typeof a[b] === 'undefined' && level !== property.length) {
        a[b] = {};
        return a[b];
      }

      if (level === property.length) {
        a[b] = value;
        return value;
      }
      return a[b];
    }, object);
  }
}

module.exports = Mapper;
