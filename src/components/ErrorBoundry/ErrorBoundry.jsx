// @flow
import * as React from 'react'; // You need to use import * as React from 'react' here instead of import React from 'react' to get access to the React.Node type.
import { withRouter } from 'react-router-dom';
import { hideLoadingPH } from '../../utils';
import Info from '../Info/Info';

type State = {
  hasError: boolean
};
type Props = {
  location: {
    state: {
      data: string
    }
  },
  children?: React.Node
};

class ErrorBoundary extends React.Component<Props, State> {
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
