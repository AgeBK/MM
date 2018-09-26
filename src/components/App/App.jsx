// @flow
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';
import Home from '../Home/Home';
// import { fetchMultiple, concatStr, uniqueId } from '../../utils';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Rating from '../Rating/Rating';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
// import MMContainer from '../../containers/MMContainer/MMContainer';
import ShowList from '../ShowList/ShowList';
import Show from '../Show/Show';
import Info from '../Info/Info';
import Actors from '../Actors/Actors';
import Actor from '../Actor/Actor';
// import Config from '../../config.json';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

// const Show = Loadable({ loader: () => import('./Show/Show' /* webpackChunkName: "Show" */), loading: Loading, }); //magic comment /* webpackChunkName: xxx */
// const ShowList = Loadable({ loader: () => import('./ShowList/ShowList'/* webpackChunkName: "ShowList" */), loading: Loading, });
// const Info = Loadable({ loader: () => import('./Info'/* webpackChunkName: "Info" */), loading: Loading, });
// const Actors = Loadable({ loader: () => import('./Actors/Actors'/* webpackChunkName: "Actors" */), loading: Loading, });
// const Actor = Loadable({ loader: () => import('./Actors/Actor'/* webpackChunkName: "Actor" */), loading: Loading, }); //TODO: this isn't lazy loading??

// for dev only
// const { whyDidYouUpdate } = require('why-did-you-update');
// whyDidYouUpdate(React);

type State = {
  data: Array<any>
};

type Props = {
  cast: Array<any>,
  crew: Array<any>,
  mediaType: string,
  id: number,
  location: {
    state: {
      mediaType: string,
      id: number
    }
  }
};

class App extends Component<Props, State> {
  url: string;
  searchTerm: string;

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

export default hot(module)(App);
