// @flow
import React, { Component } from 'react';
import ShowCredits from '../ShowCredits/ShowCredits';
import ShowSimilar from '../ShowSimilar/ShowSimilar';
import ShowTv from '../ShowTv/ShowTv';
import ShowMovie from '../ShowMovie/ShowMovie';
import Rating from '../Rating/Rating';
import Config from '../../config.json';
import {
  getNamesStr,
  fetchMultiple,
  dateDMY,
  toggleList
} from '../../utils.js';
import styles from './show.css';

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

// http://localhost:8080/index.html?screen=login&noRedirect for page not found

class Show extends Component<Props, State> {
  mediaType: string; // flow
  constructor(props: Object) {
    super(props);

    this.state = {
      data: []
    };
    this.mediaType = props.location.state.mediaType;
  }

  componentDidMount() {
    if (this.props.location.state.id && this.props.location.state.mediaType) {
      this.getShowData(
        this.props.location.state.id,
        this.props.location.state.mediaType
      );
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (
      nextProps.location.state.id !== this.props.location.state.id &&
      nextProps.location.state.id !== ''
    ) {
      this.getShowData(
        nextProps.location.state.id,
        nextProps.location.state.mediaType
      );
    }
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    if (this.state.data[0]) {
      if (this.state.data[0].id === nextState.data[0].id) {
        return false;
      }
    }
    return true;
  }

  getShowData(id: number, mType: string) {
    let urls = [];
    let loc = '';
    const mediaBase = mType === 'tv' ? Config.tvBaseURL : Config.movieBaseURL;

    if (navigator.onLine) {
      urls = urls.concat(
        mediaBase + id + Config.apiKeyQry,
        `${mediaBase + id}/similar${Config.apiKeyQry}`,
        `${mediaBase + id}/credits${Config.apiKeyQry}`
      );
    } else {
      loc = `${window.location.origin}/src/js/`;
      if (mType === 'tv') {
        urls = urls.concat(
          `${loc}walkingDead.json`,
          `${loc}walkingDeadSimilar.json`,
          `${loc}walkingDeadCast.json`
        ); // TODO: test this with 1 or more failing
      } else {
        urls = urls.concat(
          `${loc}pulpFiction.json`,
          `${loc}pulpFictionSimilar.json`,
          `${loc}pulpFictionCast.json`
        );
      }
    }
    fetchMultiple.call(this, urls); // utils, setState here
  }

  render() {
    const reCurrency = new RegExp(Config.reCurrency, 'g');
    if (this.state.data.length) {
      // 3 arrays here
      // 1: show info
      // 2: similar movies
      // 3: cast/crew

      console.log(this.state.data);

      // tv and movie fields
      const {
        backdrop_path: backdropPath,
        genres,
        homepage,
        // original_language: orgLang,
        overview,
        poster_path: posterPath,
        // production_companies: prodComp,
        // status,
        vote_average: voteAvg,
        release_date: relDate,
        first_air_date: fDate,
        // vote_count: voteCnt,
        title,
        name
      } = this.state.data[0];
      // console.log(this.state.data[0]);

      const genreNames = getNamesStr(genres);
      // const prodCompNames = getNamesStr(prodComp);
      const dtYear = relDate ? relDate.split('-')[0] : fDate.split('-')[0]; // first_air_date
      // console.log(dtYear);

      const img = navigator.onLine
        ? Config.imgResizeURL + posterPath
        : Config.pulpFictCover;
      const bDrop = '';
      if (this.mediaType === 'tv') {
        // console.log('tv');
      } else {
        // console.log('movie');
      }
      // console.log(title);

      const showTitle = name || title;

      let bDropBG;
      if (navigator.onLine) {
        bDropBG = {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${
            Config.imgURL
          }${backdropPath})`
        };
      } else {
        bDropBG = {
          backgroundImage: Config.movieBackDrop
        };
      }
      return (
        <div className={styles.showRslts}>
          <section className={styles.show} style={bDropBG}>
            <ShowDetails
              bDrop={bDrop}
              showTitle={showTitle}
              img={img}
              dtYear={dtYear}
              voteAvg={voteAvg}
              genreNames={genreNames}
              overview={overview}
            />
          </section>
          {this.mediaType === 'tv' && <ShowTv {...this.state.data[0]} />}
          {this.mediaType === 'movie' && <ShowMovie {...this.state.data[0]} />}
          {this.state.data[2] &&
            this.state.data[2].cast && (
              <section className={styles.credits}>
                <h2>Starring:</h2>
                <ShowCredits {...this.state.data[2]} />
                <div className="col-12">
                  <button
                    id="actorItem"
                    className="btn stdBtn"
                    onClick={toggleList}
                    type="button"
                  >
                    Show more credits
                  </button>
                </div>
              </section>
            )}
          {this.state.data[1] &&
            this.state.data[1].results && (
              <section className={`${styles.similar} similarCont row`}>
                <ShowSimilar
                  {...this.state.data[1]}
                  mediaType={this.props.location.state.mediaType}
                />
                <button
                  id="similar"
                  className="btn stdBtn"
                  onClick={toggleList}
                  type="button"
                >
                  Show more similar
                </button>
              </section>
            )}
        </div>
      );
    }
    return null;
  }
}

const ShowDetails = props => {
  const { dtYear, genreNames, img, overview, showTitle, voteAvg } = props;

  return (
    <div className={styles.showContInner}>
      <div className={styles.img}>
        <img src={img} alt={showTitle} title={showTitle} />
      </div>
      <div className={styles.info}>
        <div className={styles.hero}>
          <img src={img} alt={showTitle} title={showTitle} />
        </div>
        <div className={styles.showInfo}>
          <h1 className={styles.title}>
            {showTitle} <div>({dtYear})</div>
          </h1>
          <Rating score={voteAvg} />
          <p>
            <span className="label">Genre:</span> {genreNames}
          </p>
          <p>
            <span className="label">Overview: </span>
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Show;
