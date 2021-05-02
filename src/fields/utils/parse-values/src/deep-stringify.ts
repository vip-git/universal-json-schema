export default (givenVal, givenDepth?: any, replacer?: any, space?: any, onGetObjID?: any) => {
  const newDepth = Number.isNaN(+givenDepth) ? 1 : givenDepth;
  const recursMap = new WeakMap();
  function _build(val, depth?: any, o?: any, a?: any, r?: any) {
    return !val || typeof val !== 'object'
      ? val
      : ((r = recursMap.has(val)),
      recursMap.set(val, true),
      (a = Array.isArray(val)),
      r
        ? (o = (onGetObjID && onGetObjID(val)) || null)
        : JSON.stringify(val, (k, v) => {
          if (a || depth > 0) {
            if (replacer) v = replacer(k, v);
            if (!k) return (a = Array.isArray(v)), (val = v);
            !o && (o = a ? [] : {});
            o[k] = _build(v, a ? depth : depth - 1);
          }
        }),
      o === void 0 ? {} : o);
  }
  const stageVal = _build(givenVal, newDepth);
  const finalVal = JSON.stringify(stageVal) === '{}' ? null : stageVal;
  return (finalVal && JSON.stringify(finalVal, null, space)) || '';
};
