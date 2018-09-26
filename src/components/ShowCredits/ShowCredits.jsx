// @flow
import React from 'react';
import ActorItem from '../ActorItem/ActorItem'; // used for actors as well
import Config from '../../config.json';
import { uniqueId } from '../../utils.js';

type Props = {
  cast: Array<any>,
  crew: Array<any>
};

const ShowCredits = (props: Props) => {
  const cast = props.cast;
  const keys = uniqueId(cast.length);

  if (cast.length) {
    // return cast.map((arr, i) => { // this is what i had working for react
    const actors = cast.map((arr, i) => {
      const { character, name, profile_path: profilePath, id } = cast[i];
      const image = Config.imgResizeURL + profilePath;
      const cName =
        i < Config.creditsLimit // 6
          ? 'col-12 col-sm-4 col-lg-2 block'
          : 'col-12 col-sm-4 col-lg-2 extra hide';
      return (
        <ActorItem
          key={keys[i]}
          name={name}
          character={character}
          img={image}
          css={cName}
          id={id}
        />
      );
    });

    // in preact i need to do this or no data gets returned??
    return <div className="row">{actors}</div>;
  }
  return null;
};

export default ShowCredits;
