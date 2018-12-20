// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MMContainer from '../../containers/MMContainer/MMContainer';
// import Test from '../Test/Test';

import Config from '../../config.json';
import { hideLoadingPH } from '../../utils';
import styles from './info.css';

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
  // TODO: component test renders if theres an error on the homepage ??
  render() {
    const { data } = this.props.location.state;
    const info = Config[data];
    return (
      <MMContainer>
        <div className={styles.information}>
          <div dangerouslySetInnerHTML={{ __html: info }} />
        </div>
        {/* <Test /> */}
      </MMContainer>
    );
  }
}

export default withRouter(Info);
