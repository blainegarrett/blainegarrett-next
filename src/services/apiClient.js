// Main Api client for MPLSART services
// Note: If you need to talk to a different service, probably make a new service

import axios from 'axios';

import getConfig from 'next/config';

const MPLSART_API_HOST = getConfig().publicRuntimeConfig.API_HOST;

//import { MPLSART_API_HOST } from '../constants';
import { makeQueryString, buildQueryParamHash } from './utils';

function callApi(endpoint, params, data, method, skip_auth_header = false) {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // Resolve the url
  //const is_https = window.location && window.location.protocol == 'https:';
  //const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;
  const baseUrl = MPLSART_API_HOST + endpoint;
  const fullUrl = baseUrl + makeQueryString(params);

  // Hash can be used to cache queries... not currently in use?
  const hash = buildQueryParamHash(baseUrl, params);

  // Determine headers
  const options = { method: method, credentials: 'include' };
  options['headers'] = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // If we are authenticated, attach the access_token
  if (!skip_auth_header) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      options['headers']['Authorization'] = 'Bearer ' + access_token;
    }
  }

  // Handle Body/Payload - Note: GET, HEAD, DELETE do not accept payloads
  if (method !== 'GET') options['body'] = JSON.stringify(data);

  // Make request and call appropriate callbacks
  return axios(fullUrl, options)
    .then((response) => {
      return { json: response.data, response };
    })
    .then(({ json }) => {
      //if (!response.ok) {
      //  return Promise.reject(json);
      //}
      return {
        results: json.results,
        cursor: json.cursor,
        more: json.more,
        hash: hash,
      };
    })
    .then(
      (response) => ({ response }),
      function (error) {
        // Handle network error
        console.error(error);
        if (error.messages) {
          return { error: error.messages[0] || 'Something bad happened' };
        }
        return { error: error.messages || 'Something bad happened' };
      }
    );
}

// Clean a cursor for use in the api - empty string is fine but not null
const cleanCursor = (cursor) => (!cursor ? '' : cursor);

export function fetchArticles({ nextCursor, params }) {
  if (params.is_published == undefined) {
    params.is_published = true;
  }
  return callApi('/api/rest/v2.0/posts', { cursor: cleanCursor(nextCursor), ...params }, {}, 'GET', true);
}

// Fetch article by slug
export function fetchArticleBySlug({ slug }) {
  return callApi('/api/rest/v2.0/posts', { get_by_slug: slug, verbose: true }, {}, 'GET', true);
}
