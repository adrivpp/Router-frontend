import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {

  handleClick =() => {
    this.props.history.goBack()
  }

  render() {
    return (
      <section className="has-error">
        <div className="overlay">
          <div className="wrong">
            <h2>Oops! nothing found</h2>            
            <button className="button" onClick={this.handleClick}>Go back</button>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(NotFound);
