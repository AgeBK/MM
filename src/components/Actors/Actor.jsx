import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import Rating from '../Rating';
import Item from '../Item.jsx';
import Config from '../../config.json';
import Carousel from '../../css/carousel.css';

import {
  dateDMY,
  fetchMultiple,
  uniqueId,
  strConcat,
  toggleList
} from '../../utils.js';

type State = {
  //   data[0]:{
  //   },
  //   data[1]:{
  //   }
  //   data[2]:{
  //   }
};

type Props = {
  location: {
    state: {
      id: number
    }
  }
};

class Actor extends Component<Props, State> {
  constructor(props) {
    super(props);
    console.log('Actor');

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log('mounted');

    if (this.props.location.state.id) {
      var urls = [];
      const id = this.props.location.state.id;
      // const name = this.props.location.state.name;
      const mediaBase = Config.personBaseURL;

      if (navigator.onLine) {
        urls = urls.concat(
          mediaBase + id + Config.apiKeyQry,
          mediaBase + id + '/combined_credits' + Config.apiKeyQry,
          mediaBase + id + '/images' + Config.apiKeyQry
        );
      } else {
        const loc = location.origin + '/src/js/';
        urls = urls.concat(
          loc + 'person.json',
          loc + 'personCredits.json',
          loc + 'personImgs.json'
        );
      }
      fetchMultiple.call(this, urls, 'actor'); // utils, setState here
    }
  }

  render() {
    if (this.state.data.length) {
      console.log(this.state.data);
      // 3 arrays here
      // 1: actor info
      // 2: actor credits
      // 3: actor images

      //Actor Info
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
      const bYear = bDay.split('/')[2];
      if (deathday) {
        var dDay = dateDMY(deathday);
        var dYr = dDay.split('/')[2];
      }

      var reNonEng = new RegExp(Config.reRemoveNonEng, 'g');
      const aka = AKA.filter(val => !reNonEng.test(val));
      const image = navigator.onLine ? Config.imgURL + profile : Config.dj;

      return (
        <div className="results actor">
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
    return null;
  }
}

const ActorInfo = props => {
  const { aka, bDay, bio, bYear, dDay, dYr, homepage, img, name, pob } = props;

  return (
    <section className="actor center">
      <h1>
        {name}{' '}
        <div>
          ({bYear} {dYr ? ' - ' + dYr : null})
        </div>{' '}
      </h1>
      <hr />
      <div className="image">
        <img src={img} alt={name} title={name} />
      </div>
      <div className="other">
        <div className="bio">
          <div className="label">Biography:</div>
          <span>{bio}</span>
        </div>
        <h2>Facts</h2>
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
        {aka.length ? (
          <div>
            <span className="label">AKA: </span>
            {aka.join(', ')}
          </div>
        ) : null}
        {homepage ? (
          <div>
            <span className="label">Homepage: </span>
            <a target="_blank" href={homepage}>
              {homepage}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const ActorCredits = props => {
  var arr = [];
  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      if (props[key].release_date && props[key].vote_average > 0) {
        // select movies with release date and have been voted for
        arr.push(props[key]);
      }
    }
  }
  arr.sort(function(a, b) {
    // sort newest to oldest
    const item1 = new Date(a.release_date);
    const item2 = new Date(b.release_date);
    if (item1 < item2) {
      return 1;
    }
    return -1;
  });

  const arrTop20 = arr.slice(0, 20); // just store 20 latest results (there could be hundreds)
  console.log(arrTop20);
  const keys = uniqueId(arr.length);

  const credits = arrTop20.map((title, i) => {
    const name = title.name ? title.name : title.original_title;
    const id = title.id;
    const imgLink = navigator.onLine
      ? Config.imgResizeURL + title.poster_path
      : Config.pulpFictCover;
    const reRemSpacSpec = new RegExp(Config.reRemoveSpacesSpecials, 'g');
    const link = '/showlist/' + name.replace(reRemSpacSpec, '');
    var cName = (i + 1) % 2 === 0 ? 'similar even' : 'similar odd';
    cName += i > Config.showSimilarLimit ? ' extra hide' : ' block';
    const voteAvg = title.vote_average;
    const overview = strConcat(title.overview, 250);
    const mediaType = title.media_type;
    var character = title.character;
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
    <section className="credits row showHide">
      <h2>Starred in</h2>
      {credits}
      <button
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
  console.log(props);

  var arr = props.profiles;
  const total = props.profiles.length;
  const keys = uniqueId(arr.length);
  const name = props.name;
  var ActorImgs = arr.map((val, i) => {
    const { file_path: imgPath, vote_average: voteAvg } = val;
    const img = navigator.onLine ? Config.imgResizeURL + imgPath : Config.dj185;
    let cName = 'carousel-item col-md-3';
    cName = i === 0 ? (cName += ' active') : cName;

    return (
      <div key={keys[i]} className={cName}>
        <h3>{i + 1}</h3>
        <LazyLoad height={193} offset={100}>
          <img
            className="img-fluid mx-auto d-block"
            src={img}
            alt={name}
            title={name}
          />
        </LazyLoad>
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
