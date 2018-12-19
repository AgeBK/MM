// @flow
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { fetchMultiple, concatStr, uniqueId } from '../../utils';
import Rating from '../Rating/Rating';
import MMContainer from '../../containers/MMContainer/MMContainer';
import Config from '../../config.json';
import styles from './home.css';

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

class Home extends Component<Props, State> {
  categorys: Function;
  props: Object;

  constructor(props: any) {
    super(props);

    this.state = {
      data: []
    };
    this.categorys = Config.homePageCategories.split(','); // used in fetchMultiple
  }

  componentDidMount() {
    // setTimeout(() => {
    if (navigator.onLine) {
      fetchMultiple.call(this, Config.homePageURLs.split(','), 'home'); // utils
    } else {
      const hostJS = `${window.location.origin}${Config.jsFolder}`; // offline
      fetchMultiple.call(
        this,
        [
          `${hostJS}/now_playing.json`,
          `${hostJS}/popular.json`,
          `${hostJS}/top_rated.json`,
          `${hostJS}/upcoming.json`
        ],
        'home'
      ); // utils
    }
    // }, 2000);
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
          {arr.map((showArr, i) => (
            <div className="row" key={keys[i]}>
              <Link
                to={{
                  pathname: 'showlist',
                  state: { catSearch: showArr[0] }
                }}
                className={`${styles.homeCat} col-12`}
              >
                <h2>{showArr[0]}</h2>
              </Link>
              {showArr.map((show, j) => {
                let homeItem = null;
                if (j > 0) {
                  homeItem = <HomeItem key={show.id} {...show} ind={j} />;
                }
                return homeItem;
              })}
            </div>
          ))}
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
    ind,
    overview,
    title,
    vote_average: voteAvg
  } = props;

  const reSpaces = new RegExp(Config.reRemoveSpaces, 'g');
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');

  const modProps = {
    link: `/showlist/${title.replace(reSpecials, '')}`,
    css: `${cssClass.replace(reSpaces, '').toLowerCase()} col-md-4`, // Now Playing to nowplaying etc
    image: navigator.onLine
      ? Config.imgResizeURL + posterPath
      : Config.pulpFictCover,
    strOverview: concatStr(overview, Config.strLength250),
    oddOrEven: ind % 2 !== 0
  };

  return (
    <div className={`${styles.homeItem} ${modProps.css}`}>
      <Link
        to={{ pathname: modProps.link, state: { id, mediaType: 'movie' } }}
        className={styles.imageLink}
        aria-label={title}
      >
        <LazyLoad height={193} offset={100}>
          <img src={modProps.image} alt={title} title={title} />
        </LazyLoad>
      </Link>
      <div className="detail" key={id}>
        <Link
          to={{ pathname: modProps.link, state: { id, mediaType: 'movie' } }}
          aria-label={title}
        >
          <h3>{title}</h3>
        </Link>
        <div className={styles.plot}>
          {modProps.strOverview} <br />
          <Link
            to={{ pathname: modProps.link, state: { id, mediaType: 'movie' } }}
            className={`${styles.btnLink} btn stdBtn `}
          >
            Find out more...
          </Link>
        </div>
        <Rating score={voteAvg} oddOrEven={modProps.oddOrEven} homePage />
      </div>
    </div>
  );
};
export default Home;
