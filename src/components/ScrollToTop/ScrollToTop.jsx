import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Config from '../../config.json';
import { pageTitle } from '../../utils';

type Props = {
  location: {},
  children: React.Node
};

// Scroll back to top of the page & close bootstrap navbar on route change
class ScrollToTop extends Component<Props> {
  componentDidMount() {
    this.setPageTitle();
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);
    this.setPageTitle();
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      this.isNavBarOpen();
    }
  }

  setPageTitle() {
    var pathName = this.props.location.pathname;
    console.log(pathName);
    const reTextAfterLastSlash = new RegExp(Config.reTextAfterLastSlash, 'g');
    const reSplitByCaps = new RegExp(Config.reSplitByCapitals, 'g');
    pathName =
      pathName.length > 1 ? reTextAfterLastSlash.exec(pathName)[0] : pathName;
    pathName = pathName.split(reSplitByCaps).join(' ');
    document.title = pageTitle(pathName); // utils
  }

  isNavBarOpen() {
    if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
      $('.navbar-toggler').click();
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop); // withRouter here pushes the history object
