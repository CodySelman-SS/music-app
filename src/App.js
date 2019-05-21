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
  }

  async handleSubmit(e) {
    e.preventDefault();
    const res = await this.getAlbums(this.state.searchText);
    const data = this.formatResponse(res);
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
    const res = await fetch(this.getUrl(artistName));
    const data = await res.json();
    return data;
  }

  getUrl(artistName) {
    const encodedName = encodeURI(artistName);
    return `https://itunes.apple.com/search?term=${encodedName}&entity=album`
  }

  formatResponse(res) {
    const results = this.sortByDate(res);
    return results.map((result) => {
      const date = new Date(result.releaseDate);
      return {
        artistName: result.artistName,
        albumName: result.collectionName,
        releaseYear: date.getFullYear(),
        albumArtUrl100: result.artworkUrl100,
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

  render() {
    const albums = this.state.albums;
    const Discography = albums.map((album, index) => {
      return <AlbumCard
        key = {index}
        albumName = {album.albumName}
        releaseYear = {album.releaseYear}
        imgSrc = {album.albumArtUrl100}
      />
    });

    return(
      <React.Fragment>
        <CssBaseline />
        <Grid container
        justify='center'
        alignItems='center'
        direction='column'>
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
