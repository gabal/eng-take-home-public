import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import makeRequest, { PLAYLISTS_RESOURCE, CATEGORIES_RESOURCE, ALBUMS_RESOURCE, CATEGORIES_PATH, NEW_RELEASES_PATH, FEATURED_PLATYLIST_PATH } from '../api/makeRequest';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: {
        data: [],
        loading: true,
        error: false
      },
      playlists: {
        data: [],
        loading: true,
        error: false
      },
      categories: {
        data: [],
        loading: true,
        error: false
      }
    };
  }
  async getAsset(asset) {
    makeRequest(asset.path, asset.resource).then(data => {
      this.setState({
        ...this.state,
        [asset.name]: {
          data,
          loading: false,
          error: false
        }
      });
    }).catch(error => {
      this.setState({
        ...this.state,
        [asset.name]: {
          error: true
        }
      });
    });

  }
  componentDidMount() {
    this.getAsset({
      path: NEW_RELEASES_PATH,
      name: 'newReleases',
      resource: ALBUMS_RESOURCE
    });
    this.getAsset({
      path: FEATURED_PLATYLIST_PATH,
      name: 'playlists',
      resource: PLAYLISTS_RESOURCE
    });
    this.getAsset({
      path: CATEGORIES_PATH,
      name: 'categories',
      resource: CATEGORIES_RESOURCE
    });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover" >
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" {...newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" {...playlists} />
        <DiscoverBlock text="BROWSE" id="browse" imagesKey="icons" {...categories} />
      </div>
    );
  }
}
