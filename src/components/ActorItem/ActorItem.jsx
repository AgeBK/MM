// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Config from '../../config.json';
import { uniqueId } from '../../utils.js';
import styles from './actorItem.css';

type Props = {
  character: number,
  id: string,
  img: string,
  css: string,
  name: string,
  // profilePath: string, // TODO: make this optional, failing flow test
  titles?: Array<string>
};

// being used by Actors and ShowCredits
const ActorItem = (props: Props) => {
  const { character, id, img, css, name, titles } = props;
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');
  const link = `/actors/${name.replace(reSpecials, '')}`;
  const cssClass = css
    ? `actorItem${' '}${css}`
    : 'actorItem col-12 col-sm-6 col-lg-3';
  // let image = img || `${Config.imgResizeURL}${profilePath}`;
  const image = navigator.onLine ? img : Config.jt;
  let keys = [];
  if (titles) {
    keys = uniqueId(titles.length);
  }

  return (
    <div className={`${styles.actorItem} ${cssClass}`}>
      <div className={`${styles.actorInner} ${styles.creditsInner}`}>
        <Link to={{ pathname: link, state: { id } }}>
          <h3>{name}</h3>
          <div className={styles.img}>
            <LazyLoad height={193} offset={100}>
              <img src={image} alt={name} title={name} />
            </LazyLoad>
          </div>
        </Link>
        {character && (
          <div className="character">
            <i>
              As <b>{character}</b>
            </i>
          </div>
        )}
        {titles && (
          <div className="titles">
            <div className="titlesHdr">Known for</div>
            {titles.map((title, i) => (
              <ActorTitles key={keys[i]} titles={title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ActorTitles = props => {
  const [title, id, media] = props.titles;
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');
  const link = `/showlist/ ${title.replace(reSpecials, '')}`;

  return (
    <Link
      to={{ pathname: link, state: { id, mediaType: media } }}
      className="block"
    >
      {title}
    </Link>
  );
};

export default ActorItem;
