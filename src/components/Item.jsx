import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Rating from './Rating';

const Item = props => {
  // Item component used for ShowSimilar, ShowList & ActorCredits

  const {
    id,
    cname,
    character,
    img,
    link,
    media,
    overview,
    title,
    score
  } = props;
  return (
    <div className={'col-md-6 item ' + cname}>
      <div className="overlay">
        <div className="leftItem">
          <Link
            to={{ pathname: link, state: { id: id, mediaType: media } }}
            className="image"
            aria-label={title}
          >
            <LazyLoad height={178} offset={100}>
              <img src={img} alt={title} title={title} />
            </LazyLoad>
          </Link>
          <Rating score={score} />
        </div>
        <Link
          to={{ pathname: link, state: { id: id, mediaType: media } }}
          aria-label={title}
        >
          <h3>{title}</h3>
        </Link>
        {character ? (
          <div className="character">
            <span className="label">As: </span>
            {character}
          </div>
        ) : null}
        <div className="plot clearFix">
          {overview}
          <Link
            to={{ pathname: link, state: { id: id, mediaType: media } }}
            className="btn stdBtn"
            aria-label={title}
          >
            Find out more..
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
