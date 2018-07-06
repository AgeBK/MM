import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { hideLoadingPH } from '../utils';
import Info from './Info.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      hideLoadingPH();
      this.props.location.state = { data: 'errorMsg' };
      return <Info />;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
