import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  async handleSubmit() {
    console.log(`search query: ${this.state.searchText}`);
    console.log(await this.getAlbums(this.state.searchText));
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  async getAlbums(artistName) {
    const res = await fetch(this.getUrl(artistName));
    return await res.json();
  }

  getUrl(artistName) {
    const encodedName = encodeURI(artistName);
    console.log(`encodedName: ${encodedName}`)
    return `https://itunes.apple.com/search?term=${encodedName}&entity=album`
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
