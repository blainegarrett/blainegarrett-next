// Service Utilities

export function makeQueryString(params) {
  // Return a query string given a hash of key => value pairs
  let esc = encodeURIComponent;
  let query = Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

  if (query) {
    return '?' + query;
  }
  return '';
}

export function buildQueryParamHash(url, params) {
  // Given a base url (handler path), generate a hash key for this url for caching, etc

  let keys = Object.keys(params);
  keys.sort();

  let s = url;
  let key;
  let val;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    val = params[key];

    s += '::' + key + '::' + val;
  }
  return _hashCode(s);
}

function _hashCode(string) {
  // Given a string, hash it into a 32bit int
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
