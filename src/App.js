import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      artistName: '',
      albums: [],
    };
  }

  async handleSubmit() {
    console.log(`search query: ${this.state.searchText}`);
    const res = await this.getAlbums(this.state.searchText);
    console.log(`handleSubmit res:`);
    console.log(res);
    const data = this.trimResponse(res);
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

  // sorts albums in reverse-chronological order,
  // then returns only relevant fields
  trimResponse(res) {
    const results = res.results.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateB - dateA;
    });
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

  render() {
    const albums = this.state.albums;
    const Discography = albums.map((album, index) => {
      return <ul key={index}>
        <h3>{album.albumName}</h3>
        <h4>{album.releaseYear}</h4>
        <img src={album.albumArtUrl100} alt={album.albumName} />
      </ul>
    });

    return(
      <div>
        <input
          onChange = { e => this.handleChange(e) }
        />
        <button
          type = "submit"
          onClick = {() => this.handleSubmit()}
        >
          Submit
        </button>
        <h1>{this.state.artistName}</h1>
        <h2>{this.state.artistName ? 'Discography' : ''}</h2>
        {Discography}
      </div>
    )
  }
}

export default App;
