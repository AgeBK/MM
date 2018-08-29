// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MMContainer from '../../containers/MMContainer/MMContainer';
import Config from '../../config.json';
import { hideLoadingPH } from '../../utils';

type Props = {
  location: {
    state: {
      data: string
    }
  }
};

class Info extends Component<Props> {
  componentDidMount() {
    hideLoadingPH();
  }

  render() {
    const { data } = this.props.location.state;
    var info = Config[data];
    return (
      <MMContainer>
        <div className="information">
          <div dangerouslySetInnerHTML={{ __html: info }} />
        </div>
      </MMContainer>
    );
  }
}

export default withRouter(Info);
