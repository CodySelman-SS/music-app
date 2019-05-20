import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { SearchForm, AlbumCard } from './components/';

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
    console.log(`search query: ${this.state.searchText}`);
    const res = await this.getAlbums(this.state.searchText);
    console.log(`handleSubmit res:`);
    console.log(res);
    const data = this.formatResponse(res);
    this.setState({
      artistName: data[0].artistName,
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
    console.log(`encodedName: ${encodedName}`)
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
        <SearchForm
          onChange = { e => this.handleChange(e) }
          onClick = { e => this.handleSubmit(e) }
        />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <h1>{this.state.artistName}</h1>
          <h2>{this.state.artistName ? 'Discography' : ''}</h2>
        </div>
        {Discography}
      </ React.Fragment>
    );
  }
}

export default App;
