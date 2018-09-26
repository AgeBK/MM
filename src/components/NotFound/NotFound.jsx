// @flow
import React, { Component } from 'react';
import MMContainer from '../../containers/MMContainer/MMContainer';
import { hideLoadingPH } from '../../utils';
import Config from '../../config.json';

class NotFound extends Component {
  componentDidMount() {
    hideLoadingPH();
  }

  render() {
    return (
      <MMContainer>
        <div className="notFound">
          <h1>{Config.errorHdr}</h1>
          <img src={Config.errorImg} alt="404" title="404" />
          <h2>404</h2>
          <hr />
          <div href="/">{Config.error404Txt}</div>
          <a href="/">Return home</a>
        </div>
      </MMContainer>
    );
  }
}

export default NotFound;
