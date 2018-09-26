// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Rating from '../Rating/Rating';
import styles from './item.css';

type Props = {
  id: number,
  cname: string,
  character?: string,
  img: string,
  link: string,
  media: string,
  overview: string,
  title: string,
  score: number
};

const Item = (props: Props) => {
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
  const oddOrEven = cname.indexOf('odd') > -1;
  // const oddOrEven = oddoreven;
  const itemOdr = oddOrEven ? styles.odd : styles.even;

  return (
    <div className={`col-md-6 item ${cname} ${styles.item} ${itemOdr}`}>
      <div className={styles.overlay}>
        <div className={styles.leftItem}>
          <Link
            to={{ pathname: link, state: { id, mediaType: media } }}
            className={styles.image}
            aria-label={title}
          >
            <LazyLoad height={178} offset={100}>
              <img src={img} alt={title} title={title} />
            </LazyLoad>
          </Link>
          <Rating score={score} oddOrEven={oddOrEven} />
        </div>
        <Link
          to={{ pathname: link, state: { id, mediaType: media } }}
          aria-label={title}
        >
          <h3 className={styles.title}>{title}</h3>
        </Link>
        {character ? (
          <div className={styles.character}>
            <span className="label">As: </span>
            {character}
          </div>
        ) : null}
        <div className={`${styles.plot} ${styles.clearFix}`}>
          {overview}
          <Link
            to={{ pathname: link, state: { id, mediaType: media } }}
            className="stdBtn btn"
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
