//@flow
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { fetchMultiple, strConcat, uniqueId } from '../../utils';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Rating from '../Rating/Rating';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import MMContainer from '../../containers/MMContainer/MMContainer';
import ShowList from '../ShowList/ShowList';
import Show from '../Show/Show';
import Info from '../Info/Info';
import Actors from '../Actors/Actors';
import Actor from '../Actor/Actor';
import Config from '../../config.json';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import styles from './app.css';

// const Show = Loadable({ loader: () => import('./Show/Show' /* webpackChunkName: "Show" */), loading: Loading, }); //magic comment /* webpackChunkName: xxx */
// const ShowList = Loadable({ loader: () => import('./ShowList/ShowList'/* webpackChunkName: "ShowList" */), loading: Loading, });
// const Info = Loadable({ loader: () => import('./Info'/* webpackChunkName: "Info" */), loading: Loading, });
// const Actors = Loadable({ loader: () => import('./Actors/Actors'/* webpackChunkName: "Actors" */), loading: Loading, });
// const Actor = Loadable({ loader: () => import('./Actors/Actor'/* webpackChunkName: "Actor" */), loading: Loading, }); //TODO: this isn't lazy loading??

// for dev only
// const { whyDidYouUpdate } = require('why-did-you-update');
// whyDidYouUpdate(React);

class App extends Component {
  constructor(props) {
    super(props);

    this.url = '';
    this.searchTerm = '';
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="container-fluid">
            <Route path="*" render={props => <Header {...props} />} />
            <Loading />
            <ErrorBoundry>
              <Switch>
                <Route exact path="/" render={props => <Home {...props} />} />
                <Route
                  exact
                  path="/showlist"
                  render={props => (
                    <ShowList
                      {...props}
                      url={this.url}
                      searchTerm={this.searchTerm}
                    />
                  )}
                />
                <Route
                  exact
                  path="/showlist/:id"
                  render={props => <Show {...props} />}
                />
                <Route
                  exact
                  path="/actors"
                  render={props => <Actors {...props} />}
                />
                <Route
                  exact
                  path="/actors/:id"
                  render={props => <Actor {...props} />}
                />
                <Route
                  exact
                  path="/info"
                  render={props => <Info {...props} />}
                />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </ErrorBoundry>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.categorys = Config.homePageCategories.split(','); // used in fetchMultiple
  }

  componentDidMount() {
    setTimeout(() => {
      if (navigator.onLine) {
        fetchMultiple.call(this, Config.homePageURLs.split(','), 'home'); // utils
      } else {
        var hostJS = location.origin + Config.jsFolder; // offline
        fetchMultiple.call(
          this,
          [
            hostJS + 'now_playing.json',
            hostJS + 'popular.json',
            hostJS + 'top_rated.json',
            hostJS + 'upcoming.json'
          ],
          'home'
        ); // utils
      }
    }, 50000);
  }

  render() {
    if (this.state.data.length > 0) {
      const arr = this.state.data;
      const keys = uniqueId(arr.length);
      return (
        <MMContainer>
          <div className={`${styles.intro} col-12`}>
            Check out some of the most popular categories below
          </div>
          <div className="row">
            {arr.map((obj, i) => {
              return i % 4 === 0 ? (
                <Link
                  key={keys[i]}
                  to={{ pathname: 'showlist', state: { catSearch: obj } }}
                  className={`${styles.homeCat} col-12`}
                >
                  <h2>{obj}</h2>
                </Link>
              ) : (
                <HomeItem key={keys[i]} {...obj} />
              );
            })}
          </div>
        </MMContainer>
      );
    }
    return null;
  }
}

const HomeItem = props => {
  const {
    poster_path: posterPath,
    css_class: cssClass,
    id,
    overview,
    title,
    vote_average: voteAvg
  } = props;
  const reSpaces = new RegExp(Config.reRemoveSpaces, 'g');
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');
  const link = '/showlist/' + title.replace(reSpecials, '');
  const css =
    'col-md-4 homeItem ' + cssClass.replace(reSpaces, '').toLowerCase(); // Now Playing to nowplaying etc
  const image = navigator.onLine
    ? Config.imgResizeURL + posterPath
    : Config.pulpFictCover;
  const strOverview = strConcat(overview, Config.strLength250);

  return (
    <div className={`${styles.homeItem} ${styles.nowPlaying} col-md-4`}>
      <Link
        to={{ pathname: link, state: { id: id, mediaType: 'movie' } }}
        className="image"
        aria-label={title}
      >
        <LazyLoad height={193} offset={100}>
          <img src={image} alt={title} title={title} />
        </LazyLoad>
      </Link>
      <div className="detail">
        <Link
          to={{ pathname: link, state: { id: id, mediaType: 'movie' } }}
          aria-label={title}
        >
          <h3>{title}</h3>
        </Link>
        <div className={styles.plot}>
          {strOverview} <br />
          <Link
            to={{ pathname: link, state: { id: id, mediaType: 'movie' } }}
            className="btn stdBtn"
          >
            Find out more...
          </Link>
        </div>
        <Rating score={voteAvg} />
      </div>
    </div>
  );
};

export default hot(module)(App);
