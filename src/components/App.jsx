import { Component } from 'react';

export default class App extends Component {
  state = {
    nameSearch: '',
  };

  handleSubmit = nameSearch => {
    this.setState({ nameSearch });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template
      </div>
    );
  }
}