import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

const { api } = config;
export const CATEGORIES_PATH = 'browse/categories';
export const NEW_RELEASES_PATH = 'browse/new-releases';
export const FEATURED_PLATYLIST_PATH = 'browse/featured-playlists';

export const ALBUMS_RESOURCE = 'albums';
export const CATEGORIES_RESOURCE = 'categories';
export const PLAYLISTS_RESOURCE = 'playlists';


export default async function makeRequest(path, resourceType) {
  const { data: { access_token: token } } = await axios.post(
    api.authUrl,
    qs.encode({
      grant_type: 'client_credentials'
    }),
    {
      headers: {
        Authorization: 'Basic ' + btoa(`${api.clientId}:${api.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  const res = await axios.get(
    `${api.baseUrl}/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

  );

  return res.data[resourceType].items;
}
