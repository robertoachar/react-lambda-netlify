import React, { Component } from 'react';

class Hello extends Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const response = await fetch('/.netlify/functions/hello');
    const json = await response.json();

    this.setState({ message: json.message });
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        <h1>Hello</h1>
        <button type="button" onClick={this.handleClick}>
          Hello
        </button>
        <p>{message}</p>
      </div>
    );
  }
}

export default Hello;
