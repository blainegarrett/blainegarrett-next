// Analytics Utilities

/**
 * Helper method to extract data attributes from a DOM element.
 * Note: The only way to put arbitrary data on dom elements in react is to prefix with "data-"
 * @param  {DOMElement} e A dom element
 * @return {Object}  An object with keys of the data- key name in camelcase with value of the attribute
 */
export function getDataAttributes(e) {
  // Returns an obj with keys of an elements' data attributes in camelcase
  var data = {};
  [].forEach.call(e.attributes, function(attr) {
    if (/^data-/.test(attr.name)) {
      var camelCaseName = attr.name
        .substr(5)
        .replace(/-(.)/g, function($0, $1) {
          return $1.toUpperCase();
        });
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

/**
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export function getCustomDimensions(obj) {
  // obj is a set of camelCase keys and we're trying to find the ones in the form of gaCdAsdf

  if (!obj) {
    return {};
  }

  let data = {};
  Object.keys(obj).forEach(function(key) {
    if (/^gaCd/.test(key)) {
      let cleanKey = key.replace(/^gaCd/g, '');
      cleanKey = cleanKey.charAt(0).toLowerCase() + cleanKey.slice(1);
      data[cleanKey] = obj[key];
    }
  });
  return data;
}
