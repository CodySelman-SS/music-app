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

  trimResponse(res) {
    const results = res.results;
    return results.map((result) => {
      return {
        artistName: result.artistName,
        albumName: result.collectionName,
        releaseDate: result.releaseDate,
        albumArtUrl60: result.artworkUrl60,
        albumArtUrl100: result.artworkUrl100,
      }
    });
  }

  render() {
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
      </div>
    )
  }
}

export default App;
