// @flow
import React from 'react';
import ShowFacts from '../ShowFacts/ShowFacts';
import { getNamesStr, dateDMY } from '../../utils.js';
import styles from './showtv.css';
import Config from '../../config.json';

type State = {
  data: Array<any>
};

type Props = {
  location: {
    state: {
      mediaType: string,
      id: number
    }
  }
};

const ShowTv = props => {
  const {
    created_by: cBy,
    first_air_date: fAirDate,
    last_air_date: lAirDate,
    name,
    networks,
    homepage,
    genres,
    in_production: inProd,
    production_companies: prodComp,
    number_of_episodes: episodes,
    number_of_seasons: nOSeasons,
    origin_country: orgCtry,
    vote_count: voteCnt,
    vote_average: voteAvg,
    original_language: orgLang,
    status
  } = props;
  console.log(props);

  const reCurrency = new RegExp(Config.reCurrency, 'g');
  const modProps = {
    createdBy: getNamesStr(cBy),
    netWorks: getNamesStr(networks),
    firstAirDate: dateDMY(fAirDate),
    lastAirDate: dateDMY(lAirDate),
    prodCompNames: getNamesStr(prodComp),
    genreNames: getNamesStr(genres),
    voteCommas: voteCnt.toString().replace(reCurrency, '$1,')
  };

  return (
    <section className={styles.other}>
      <div>
        <div className="label">Created By:</div> {modProps.createdBy}
      </div>
      <h2>{name} facts: </h2>
      <ShowFacts
        genres={modProps.genreNames}
        homepage={homepage}
        productionCompanies={modProps.prodCompNames}
        firstAirDate={modProps.firstAirDate}
        lastAirDate={modProps.lastAirDate}
        networks={modProps.netWorks}
        status={status}
        seasons={nOSeasons}
        episodes={episodes}
        voteCount={modProps.voteCommas}
        voteAverage={voteAvg}
        originalLanguage={orgLang}
        originalCountry={orgCtry}
        stillInProduction={inProd.toString()}
      />
    </section>
  );
};

export default ShowTv;
