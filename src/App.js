import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AlbumCard, Header, SearchForm } from './components/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      artistName: '',
      albums: [],
    };
    this.handleToggleTrackList = this.handleToggleTrackList.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const res = await this.getAlbums(this.state.searchText);
    const data = this.formatAlbumSearchRes(res);
    this.setState({
      artistName: this.state.searchText,
      albums: data,
    });
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  async getAlbums(artistName) {
    const res = await fetch(this.getAlbumSearchUrl(artistName));
    const data = await res.json();
    return data;
  }

  getAlbumSearchUrl(artistName) {
    const encodedName = encodeURI(artistName);
    return `https://itunes.apple.com/search?term=${encodedName}&entity=album`
  }

  formatAlbumSearchRes(res) {
    const results = this.sortByDate(res);
    return results.map((result) => {
      const date = new Date(result.releaseDate);
      return {
        artistName: result.artistName,
        albumName: result.collectionName,
        releaseYear: date.getFullYear(),
        albumArt: result.artworkUrl100,
        albumId: result.collectionId,
        trackList: [],
        trackListToggled: false,
      }
    });
  }

  sortByDate(res) {
    return res.results.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateB - dateA;
    });
  }

  async handleToggleTrackList(index) {
    if (this.state.albums[index].trackList.length === 0) {
      const res = await this.getTrackList(this.state.albums[index].albumId);
      const data = this.formatTrackListRes(res);
      const before = this.state.albums.slice(0, index);
      const after = this.state.albums.slice(index + 1);
      const album = this.state.albums[index];
      const updatedAlbum = {
        ...album,
        trackList: data,
      }
      this.setState({
        albums: [
          ...before,
          updatedAlbum,
          ...after
        ],
      });
    }
    this.toggleTrackList(index)
  }

  toggleTrackList(index) {
    const before = this.state.albums.slice(0, index);
    const after = this.state.albums.slice(index + 1);
    const album = this.state.albums[index];
    const toggledAlbum = {
      ...album,
      trackListToggled: !this.state.albums[index].trackListToggled,
    }
    this.setState({
      albums: [
        ...before,
        toggledAlbum,
        ...after,
      ],
    });
  }

  async getTrackList(albumId) {
    const res = await fetch(this.getTrackListUrl(albumId));
    const data = await res.json();
    return data;
  }

  getTrackListUrl(albumId) {
    return `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;
  }

  formatTrackListRes(res) {
    const results = res.results;
    const tracks = results.filter(result => result.wrapperType === 'track');
    const orderedTracks = this.sortByTrackNumber(tracks);
    return orderedTracks.map(track => {
      return {
        name: track.trackName,
        preview: track.previewUrl,
        lengthInMs: track.trackTimeMillis,
        trackNumber: track.trackNumber,
      }
    });
  }

  sortByTrackNumber(tracks) {
    return tracks.sort((a, b) => {
      const trackA = a.trackNumber;
      const trackB = b.trackNumber;
      return trackA - trackB;
    });
  }

  handlePlayClick(src) {
    const audio = new Audio(src);
    audio.play();
  }

  render() {
    const albums = this.state.albums;
    const Discography = albums.map((album, index) => {
      return <AlbumCard
        key = {index}
        index = {index}
        albumName = {album.albumName}
        releaseYear = {album.releaseYear}
        imgSrc = {album.albumArt}
        trackList = {album.trackList}
        trackListToggled = {album.trackListToggled}
        onClick = {this.handleToggleTrackList}
        onPlayClick = {this.handlePlayClick}
      />
    });

    return(
      <React.Fragment>
        <CssBaseline />
        <Grid container
          justify='center'
          alignItems='center'
          direction='column'
        >
          <SearchForm
            onChange = { e => this.handleChange(e) }
            onClick = { e => this.handleSubmit(e) }
          />
          <Header
            artistName={this.state.artistName}
          />
          {Discography}
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
