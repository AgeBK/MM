import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Config from '../config.json';
import { uniqueId } from '../utils.js';

const ActorItem = props => {
  const {
    character,
    id,
    img,
    css,
    name,
    profile_path: profileImg,
    titles
  } = props;
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');
  const link = '/actors/' + name.replace(reSpecials, '');
  const cssClass = css
    ? 'actorItem ' + css
    : 'actorItem col-12 col-sm-6 col-lg-3';
  var image = img ? img : Config.imgResizeURL + profileImg;
  image = navigator.onLine ? image : Config.jt;
  if (titles) {
    var keys = uniqueId(titles.length);
  }

  return (
    <div className={cssClass}>
      <div className="actorInner creditsInner">
        <Link to={{ pathname: link, state: { id: id } }}>
          <h3>{name}</h3>
          <div className="img">
            <LazyLoad height={193} offset={100}>
              <img src={image} alt={name} title={name} />
            </LazyLoad>
          </div>
        </Link>
        {character ? (
          <div className="character">
            <i>
              As <b>{character}</b>
            </i>
          </div>
        ) : null}
        {titles ? (
          <div className="titles">
            <div className="titlesHdr">Known for</div>
            {titles.map((title, i) => (
              <ActorTitles key={keys[i]} titles={title} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ActorTitles = props => {
  const [title, id, media] = props.titles;
  const reSpecials = new RegExp(Config.reRemoveSpacesSpecials, 'g');
  const link = '/showlist/' + title.replace(reSpecials, '');

  return (
    <Link
      to={{ pathname: link, state: { id: id, mediaType: media } }}
      className="block"
    >
      {title}
    </Link>
  );
};

export default ActorItem;
