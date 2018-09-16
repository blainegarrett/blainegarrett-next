// Main Api client for MPLSART services
// Note: If you need to talk to a different service, probably make a new service

import 'isomorphic-fetch';
import getConfig from 'next/config';

let MPLSART_API_HOST = getConfig().publicRuntimeConfig.API_HOST;

//import { MPLSART_API_HOST } from '../constants';
import { makeQueryString, buildQueryParamHash } from './utils';

function callApi(endpoint, params, data, method, skip_auth_header=false) {
  //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // Resolve the url
  //const is_https = window.location && window.location.protocol == 'https:';
  //const fullUrl = (is_https ? 'https://' : 'http://') + PREF_SERVICE_DOMAIN + endpoint;
  const baseUrl = MPLSART_API_HOST + endpoint;
  const fullUrl = baseUrl + makeQueryString(params);

  // Hash can be used to cache queries... not currently in use?
  const hash = buildQueryParamHash(baseUrl, params);

  // Determine headers
  let options = {method: method, credentials: 'include'};
  options['headers'] = {'Accept': 'application/json', 'Content-Type': 'application/json'};

  // If we are authenticated, attach the access_token
  if (!skip_auth_header) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      options['headers']['Authorization'] = 'Bearer ' + access_token;
    }
  }

  // Handle Body/Payload - Note: GET, HEAD, DELETE do not accept payloads
  if (method !== 'GET')
    options['body'] = JSON.stringify(data);

  // Make request and call appropriate callbacks
  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return {results: json.results, cursor: json.cursor, more: json.more, hash: hash};
    })
    .then(
      response => ({response}),
      function(error) {
        // Handle network error
        console.error(error);
        if (error.messages) {
          return ({error: error.messages[0] || 'Something bad happened'});
        }
        return ({error: error.messages || 'Something bad happened'});
      }
    );
}

// Clean a cursor for use in the api - empty string is fine but not null
const cleanCursor = cursor => !cursor ? '' : cursor;

/*
export function fetchEvents({...params}) {
  // TODO: Construct param set based on params' existance
  let {nextCursor} = params;
  let {query} = params;

  return callApi('/api/events', {cursor: cleanCursor(nextCursor), q: query || '', verbose:true, limit:50}, {}, 'GET');
}

export function fetchEvent({resource_id}) {
  return callApi('/api/events/' + resource_id, {verbose:true}, {}, 'GET');
}

export function createEvent({data}) {
  return callApi('/api/events', {verbose:true}, data, 'POST');
}

export function updateEvent({resource_id, data}) {
  return callApi('/api/events/' + resource_id, {verbose:true}, data, 'PUT');
}

export function fetchVenues({...params}) {
  // TODO: Construct param set based on params' existance
  let {nextCursor} = params;
  let {query} = params;

  return callApi('/api/venues', {cursor: cleanCursor(nextCursor), q: query || '', verbose:true, limit:50}, {}, 'GET');
}

export function fetchVenue({resource_id}) {
  return callApi('/api/venues/' + resource_id, {verbose:true}, {}, 'GET');
}

export function createVenue({data}) {
  return callApi('/api/venues', {verbose:true}, data, 'POST');
}

export function updateVenue({resource_id, data}) {
  return callApi('/api/venues/' + resource_id, {verbose:true}, data, 'PUT');
}

export function getFileUploadUrl({callback_url}) {
  var data = {'callback_url': callback_url};
  return callApi('/api/files/upload_url', {verbose:true}, data, 'POST');
}

// Authors
export function fetchAuthors({...params}) {
  let {nextCursor} = params;
  let {query} = params;

  //return callApi('/api/users', {cursor: cleanCursor(nextCursor), q: query || '', verbose:true, limit:50}, {}, 'GET');
  return callApi('/api/users', {verbose:true, limit:100}, {}, 'GET');
}

export function createAuthor({data}) {
  return callApi('/api/users', {verbose:true}, data, 'POST');
}

export function fetchAuthor({resource_id}) {
  return callApi('/api/users/' + resource_id, {verbose:true}, {}, 'GET');
}

export function updateAuthor({resource_id, data}) {
  return callApi('/api/users/' + resource_id, {verbose:true}, data, 'PUT');
}
*/

export function fetchArticles({nextCursor, params}) {
  return callApi('/api/rest/v1.0/posts', {cursor: cleanCursor(nextCursor), ...params}, {}, 'GET', true);
}

export function fetchArticleBySlug({slug}) {
  return callApi('/api/rest/v1.0/posts', {get_by_slug: slug, verbose:true}, {}, 'GET', true);
}