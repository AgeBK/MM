// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeThis } from '../../js/actions/index'; // import action storeThis
import Config from '../../config.json';
import { uniqueId } from '../../utils';
import styles from './header.css';
// import Logo from '../logo.svg'; //TODO, not working in webpack 4

// mapStateToProps is a pure function that connects redux global state to props of your react component
const mapStateToProps = (state, ownProps) =>
  // state will be the result of the redux process
  // ownProps is all the history which is available straight away and then in state when it has loaded
  ({ data: state.value });

// mapDispatchToProps is a pure function that connects redux actions to react props
const mapDispatchToProps = dispatch =>
  // 2: mapDispatchToProps connects Redux actions to React props. This will call action storeThis.
  ({
    // storeThis: val => dispatch(storeThis(val)) // storeThis is the redux action
    storeThis: val => dispatch({ type: 'STORE_THIS', data: val }) // same as above, dispatch action directly
  });

type Props = {
  title: string,
  data: {
    value: {
      clearSearched: Function,
      keyChange: Function,
      search: string
    }
  },
  storeThis: Function,
  history: {
    push: Function
  }
};

class Header extends Component<Props> {
  searchTerm: string;
  searched: string;
  loaded: boolean;

  constructor(props) {
    super(props);

    this.searchTerm = '';
    this.searched = '';
    this.loaded = false;
  }

  componentDidMount() {
    this.loaded = true;
    this.props.storeThis({ value: this }); // 1: trigger redux (only when component is mounted or errors) with storeThis action
  }

  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   // TODO:
  //   return true;
  // }

  search = e => {
    if (
      (e.key === 'Enter' || e.target.type === 'button') &&
      this.searchTerm !== '' &&
      this.searchTerm !== this.searched
    ) {
      this.searched = this.searchTerm;
      this.props.history.push('/showlist', { searchTerm: this.searchTerm });
    }
  };

  clearSearched = () => {
    this.searched = '';
  };

  keyChange = e => {
    this.searchTerm = e.target.value;
  };

  render() {
    return <header>{this.loaded && <MainHdr {...this.props} />}</header>;
  }
}

const MainHdr = () => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a
      className={`${styles.navCnt} navbar-brand`}
      href="/"
      aria-label="homepage"
    >
      <Logo />
    </a>
    <NavButton />
    <NavContent />
  </nav>
);

let NavContent = (props: Props) => {
  // props contains redux results (stored this value)
  Object;
  const val = props.data.value;

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <div
            className={`${styles.pointer} nav-link dropdown-toggle pointer `}
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Categories
          </div>
          <NavDropDown />
        </li>
      </ul>
      <input
        id="searchInput"
        className="form-control mr-sm-2"
        onChange={val.keyChange}
        onKeyUp={val.search}
        placeholder="Search for a title..."
        type="search"
        aria-label="Search"
      />
      <button
        id="searchBtn"
        className="btn stdBtn"
        onClick={val.search}
        type="button"
      >
        Search
      </button>
    </div>
  );
};

const NavButton = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
);

const NavDropDown = () => {
  const arrHomeCats = Config.homePageCategories.split(',');
  const keys = uniqueId(arrHomeCats.length);
  const navItems = arrHomeCats.map((val, index) => (
    <CategoryItem title={val} key={keys[index]} />
  ));
  return (
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      {navItems}
      <div className="dropdown-divider" />
      <Link to="/actors" className="dropdown-item">
        Actors
      </Link>
    </div>
  );
};

let CategoryItem = (props: Props) => {
  // props contains redux results (stored this value) + title prop that is passed into CategoryItem from NavDropDown
  const { title } = props;
  return (
    <Link
      to={{ pathname: '/showlist', state: { catSearch: title } }}
      onClick={() => props.data.value.clearSearched()}
      className="dropdown-item"
    >
      {title}
    </Link>
  );
};

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
    <g fill="#61dafb">
      <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
      <circle cx="420.9" cy="296.5" r="45.7" />
      <path d="M520.5 78.1z" />
    </g>
  </svg>
);

// connects redux global state to NavContent and CategoryItem components
NavContent = connect(mapStateToProps)(NavContent);
CategoryItem = connect(mapStateToProps)(CategoryItem);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);