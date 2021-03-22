import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

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
