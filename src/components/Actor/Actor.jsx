// @flow
import React, { Component } from 'react';
// import LazyLoad from 'react-lazyload';
import Rating from '../Rating/Rating';
import Item from '../Item/Item';
import Config from '../../config.json';
import styles from './actor.css';

import {
  dateDMY,
  fetchMultiple,
  uniqueId,
  concatStr,
  toggleList
} from '../../utils.js';

type State = {
  data: Array<any>
};

type Props = {
  location: {
    state: {
      id: boolean
    }
  },
  aka: string
};

class Actor extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    if (this.props.location.state.id) {
      let urls = [];
      const id = this.props.location.state.id;
      // const name = this.props.location.state.name;
      const mediaBase = Config.personBaseURL;

      if (navigator.onLine) {
        urls = urls.concat(
          mediaBase + id + Config.apiKeyQry,
          `${mediaBase + id}/combined_credits${Config.apiKeyQry}`,
          `${mediaBase + id}/images${Config.apiKeyQry}`
        );
      } else {
        const loc = `${window.location.origin}/src/js/`;
        urls = urls.concat(
          `${loc}person.json`,
          `${loc}personCredits.json`,
          `${loc}personImgs.json`
        );
      }
      fetchMultiple.call(this, urls, 'actor'); // utils, setState here
    }
  }

  render() {
    if (this.state.data.length) {
      // 3 arrays here
      // 1: actor info
      // 2: actor credits
      // 3: actor images

      // Actor Info
      const {
        birthday,
        deathday,
        name,
        also_known_as: AKA,
        biography,
        place_of_birth: POB,
        profile_path: profile,
        homepage
      } = this.state.data[0];
      const bDay = dateDMY(birthday); // utils
      let bYear = '';
      let dDay = '';
      let dYr = '';

      if (bDay) {
        // sometimes missing in data
        bYear = bDay.split('/')[2];
        if (deathday) {
          dDay = dateDMY(deathday);
          dYr = dDay.split('/')[2];
        }
      }

      const reNonEng = new RegExp(Config.reRemoveNonEng, 'g');
      const aka = AKA.filter(val => !reNonEng.test(val));
      const image = navigator.onLine ? Config.imgURL + profile : Config.dj;

      return (
        <div className="results centre">
          <ActorInfo
            aka={aka}
            bDay={bDay}
            bio={biography}
            bYear={bYear}
            dDay={dDay}
            dYr={dYr}
            homepage={homepage}
            img={image}
            name={name}
            pob={POB}
          />
          <ActorCredits {...this.state.data[1].cast} />
          <ActorImages name={name} {...this.state.data[2]} />
        </div>
      );
    }
    // One advantage of returning null instead of an empty element is that you’ll improve a little bit
    // the performance of your app because React won’t have to unmount the component to replace it.
    return null;
  }
}

const ActorInfo = props => {
  const { aka, bDay, bio, bYear, dDay, dYr, homepage, img, name, pob } = props;

  return (
    <section className={styles.actor}>
      <h1>
        {name}
        {bYear ? (
          <div>
            ({bYear} {dYr ? ` - ${dYr}` : null})
          </div>
        ) : null}
      </h1>
      <hr />
      <div className={styles.image}>
        <img src={img} alt={name} title={name} />
      </div>
      <div className={styles.other}>
        <div className={styles.bio}>
          <div className="label">Biography:</div>
          <span>{bio}</span>
        </div>
        <h2>Facts</h2>
        {bYear ? (
          <div>
            <div>
              <span className="label">Born: </span>
              {bDay} - {pob}
            </div>
            {dDay ? (
              <div>
                <span className="label">Died: </span>
                {dDay}
              </div>
            ) : null}
          </div>
        ) : null}
        {aka.length ? (
          <div>
            <span className="label">AKA: </span>
            {aka.join(', ')}
          </div>
        ) : null}
        {homepage ? (
          <div>
            <span className="label">Homepage: </span>
            <a target="_blank" rel="noopener noreferrer" href={homepage}>
              {homepage}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const ActorCredits = props => {
  const arr = [];

  Object.keys(props).forEach(key => {
    if (props[key].release_date && props[key].vote_average > 0) {
      arr.push(props[key]);
    }
  });

  arr.sort((a, b) => {
    // sort newest to oldest
    const item1 = new Date(a.release_date);
    const item2 = new Date(b.release_date);
    if (item1 < item2) {
      return 1;
    }
    return -1;
  });

  const arrTop20 = arr.slice(0, 20); // just use 20 latest results (there could be hundreds)
  const keys = uniqueId(arr.length);

  const credits = arrTop20.map((title, i) => {
    const name = title.name ? title.name : title.original_title;
    const id = title.id;
    const imgLink = navigator.onLine
      ? Config.imgResizeURL + title.poster_path
      : Config.pulpFictCover;
    const reRemSpacSpec = new RegExp(Config.reRemoveSpacesSpecials, 'g');
    const link = `/showlist/${name.replace(reRemSpacSpec, '')}`;
    let cName = (i + 1) % 2 === 0 ? 'similar even' : 'similar odd';
    cName += i > Config.showSimilarLimit ? ' extra hide' : ' block';
    const voteAvg = title.vote_average;
    const overview = concatStr(title.overview, 250);
    const mediaType = title.media_type;
    const character = title.character;
    return (
      <Item
        key={keys[i]}
        cname={cName}
        id={id}
        img={imgLink}
        character={character}
        link={link}
        media={mediaType}
        overview={overview}
        score={voteAvg}
        title={name}
      />
    );
  });
  return (
    <section className={`${styles.credits} row showHide`}>
      <h2>Starred in</h2>
      {credits}
      <button
        type="button"
        id="similar"
        className="moreSimilar btn stdBtn"
        onClick={toggleList}
      >
        Show more similar
      </button>
    </section>
  );
};

const ActorImages = props => {
  const arr = props.profiles;
  const total = props.profiles.length;
  const keys = uniqueId(arr.length);
  const name = props.name;
  const ActorImgs = arr.map((val, i) => {
    const { file_path: imgPath, vote_average: voteAvg } = val;
    const img = navigator.onLine ? Config.imgResizeURL + imgPath : Config.dj185;
    let cName = 'carousel-item col-md-3';
    cName = i === 0 ? (cName += ' active') : cName;

    return (
      <div key={keys[i]} className={cName}>
        <h3>{i + 1}</h3>
        <img
          className="img-fluid mx-auto d-block"
          src={img}
          alt={name}
          title={name}
        />
        <Rating score={voteAvg} />
      </div>
    );
  });

  return (
    <section className="actorImgs row center">
      <h2>
        {name} pics ({total})
      </h2>
      <div className="container-fluid">
        <div
          id="carouselActor"
          className="carousel slide"
          data-ride="carousel"
          data-interval="5000"
        >
          <div className="carousel-inner row w-100 mx-auto" role="listbox">
            {ActorImgs}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselActor"
            role="button"
            data-slide="prev"
          >
            <img
              className="carousel-nav"
              src="/src/img/lArrow.png"
              alt="navigate left"
            />
          </a>
          <a
            className="carousel-control-next text-faded"
            href="#carouselActor"
            role="button"
            data-slide="next"
          >
            <img
              className="carousel-nav"
              src="/src/img/rArrow.png"
              alt="navigate right"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Actor;
