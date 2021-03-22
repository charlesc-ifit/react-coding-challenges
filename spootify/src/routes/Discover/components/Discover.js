import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import {
  getCategories,
  getFeaturedPlaylists,
  getNewReleases
} from '../../../spotifyClient';

function Discover({ newReleases, playlists, categories }) {
  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  );
}

export default class DiscoverContainer extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    console.log(`fetching all the stuff....`)
    getCategories()
      .then(items => this.setState({ categories: items }));
    getFeaturedPlaylists()
      .then(items => this.setState({ playlists: items }));
    getNewReleases()
      .then(items => this.setState({ newReleases: items }));
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <Discover
        newReleases={newReleases}
        playlists={playlists}
        categories={categories}
      />
    );
  }
}
