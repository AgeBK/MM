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
    let pathName = this.props.location.pathname;
    const reTextAfterLastSlash = new RegExp(Config.reTextAfterLastSlash, 'g');
    const reSplitByCaps = new RegExp(Config.reSplitByCapitals, 'g');
    pathName =
      pathName.length > 1 ? reTextAfterLastSlash.exec(pathName)[0] : pathName;
    pathName = pathName.split(reSplitByCaps).join(' ');
    document.title = pageTitle(pathName); // utils
  }

  isNavBarOpen() {
    const navToggle = window.document.querySelector('.navbar-toggler');
    const navTogglerOpen = !!navToggle.getAttribute('aria-expanded');

    if (navTogglerOpen) {
      document
        .getElementById('navbarSupportedContent')
        .classList.remove('show');
    }
  }
  // if ($('.navbar-toggler').attr('aria-expanded') === 'true') {
  //   debugger;
  //   $('.navbar-toggler').click();
  // }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop); // withRouter here pushes the history object
