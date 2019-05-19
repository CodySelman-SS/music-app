import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleClick() {
    // TODO
  }

  handleChange(e) {
    // TODO
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
