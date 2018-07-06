import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MainOuter from './MainOuter.jsx';
import Config from '../config.json';
import { hideLoadingPH } from '../utils';

class Info extends Component {
  componentDidMount() {
    hideLoadingPH();
  }

  render() {
    const { data } = this.props.location.state;
    var info = Config[data];
    return (
      <MainOuter>
        <div className="information">
          <div dangerouslySetInnerHTML={{ __html: info }} />
        </div>
      </MainOuter>
    );
  }
}

export default withRouter(Info);
