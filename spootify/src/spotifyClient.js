import querystring from 'querystring';

import config from './config';

const { api } = config;

const getAuthHeader = async () => {
  const response = await fetch(api.authUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(api.clientId + ':' + api.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'client_credentials'
    })
  }).then(response => response.json());
  return {
    'Authorization': 'Bearer ' + response.access_token
  };
}

export const getCategories = async () => {
  const authHeader = await getAuthHeader();
  return fetch(`${api.baseUrl}/browse/categories`, {
    headers: { ...authHeader, 'Content-Type': 'application/json' },
  }).then(response => response.json())
  .then(data => data.categories.items)
}

export const getFeaturedPlaylists = async () => {
  const authHeader = await getAuthHeader();
  return fetch(`${api.baseUrl}/browse/featured-playlists`, {
    headers: { ...authHeader, 'Content-Type': 'application/json' },
  }).then(response => response.json())
  .then(data => data.playlists.items)
}

export const getNewReleases = async () => {
  const authHeader = await getAuthHeader();
  return fetch(`${api.baseUrl}/browse/new-releases`, {
    headers: { ...authHeader, 'Content-Type': 'application/json' },
  }).then(response => response.json())
  .then(data => data.albums.items)
}
