/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-bitwise */

module.exports = {

  generarTokenTarjeta(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  isValidLuhn(numberCard) {
    let { length } = numberCard;
    let accumulator = 0;
    let bit = 0;
    const charCode0 = '0'.charCodeAt(0);
    const mappingEvent = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    while (length-- > 0) {
      accumulator += (bit ^= 1) ? numberCard.charCodeAt(length) - charCode0 : mappingEvent[numberCard.charCodeAt(length) - charCode0];
    }
    const luhnValue = accumulator % 10;
    return luhnValue === 0;
  }
};
