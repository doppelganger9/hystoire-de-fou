//@ts-check

/** 
 * utilitaire pour transformer un objet {} en Class (p.ex. si la Class a des getter qui calculent
 * basé sur les simples champs de l'objet).
 * 
 * Référence: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
 */
export default Object.appendChain = function (oChain, oProto) {
  if (arguments.length < 2) {
    throw new TypeError("Object.appendChain - Pas suffisamment d'arguments");
  }
  if (typeof oProto !== 'object' && typeof oProto !== 'string') {
   throw new TypeError("le deuxième argument de Object.appendChain doit être un objet ou une chaîne");
  }

  let oNewProto, oReturn, o2nd, oLast;
  oNewProto = oProto;
  oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);

  for (let o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
    o2nd = o1st;
  }

  if (oProto.constructor === String) {
    oNewProto = Function.prototype;
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }

  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
}