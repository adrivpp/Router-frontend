import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Error extends Component {

  handleClick =() => {
    this.props.goBack()
  }

  render() {
    return (
      <section className="has-error">
        <div className="overlay">
          <div>
            <h2>Oops! Something went wrong</h2>
            <p>Try again later</p>
            <button className="button" onClick={this.handleClick}>Go back</button>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Error);