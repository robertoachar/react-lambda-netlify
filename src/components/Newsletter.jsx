/* eslint jsx-a11y/label-has-for: 0 */
/* eslint jsx-a11y/label-has-associated-control: 0 */

import React, { Component } from 'react';

class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = { email: 'billgates@ms.com', loading: false, data: '' };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    const { value } = e.target;

    this.setState({ email: value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { email } = this.state;

    this.setState({ loading: true });

    const response = await fetch('/.netlify/functions/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    const data = await response.json();

    this.setState({ message: data, loading: false });
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <h1>Newsletter</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" value={email} onChange={this.handleEmail} />
          <button type="submit">Subscribe</button>
        </form>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default Newsletter;
