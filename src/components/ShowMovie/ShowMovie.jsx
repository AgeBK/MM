// @flow
import React from 'react';
import ShowFacts from '../ShowFacts/ShowFacts';
import { getNamesStr, dateDMY } from '../../utils.js';
import styles from './showmovie.css';
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

const ShowMovie = props => {
  const {
    budget,
    homepage,
    genres,
    production_companies: prodComp,
    production_countries: prodCtry,
    release_date: relDate,
    revenue,
    runtime,
    spoken_languages: sLangs,
    tagline,
    title,
    vote_count: voteCnt,
    vote_average: voteAvg,
    original_language: orgLang,
    status
  } = props;
  console.log(props);

  const reCurrency = new RegExp(Config.reCurrency, 'g');

  const modProps = {
    releaseDate: dateDMY(relDate), // utils function
    budgetCommas: budget.toString().replace(reCurrency, '$1,'),
    revenueCommas: revenue.toString().replace(reCurrency, '$1,'),
    voteCommas: voteCnt.toString().replace(reCurrency, '$1,'),
    prodCompNames: getNamesStr(prodComp),
    prodCtryNames: getNamesStr(prodCtry),
    genreNames: getNamesStr(genres),
    duration: `${runtime} mins`
  };

  const spokenLangs = getNamesStr(sLangs);
  return (
    <section className={styles.other}>
      {tagline && (
        <div>
          <div className="label">Tag Line:</div> {tagline}
        </div>
      )}
      <h2>{title} facts: </h2>
      <div className={styles.otherInner}>
        <ShowFacts
          genres={modProps.genreNames}
          homepage={homepage}
          budget={modProps.budgetCommas}
          revenue={modProps.revenueCommas}
          productionCompanies={modProps.prodCompNames}
          productionCountries={modProps.prodCtryNames}
          releaseDate={modProps.releaseDate}
          runtime={modProps.duration}
          status={status}
          voteCount={modProps.voteCommas}
          voteAverage={voteAvg}
          originalLanguage={orgLang}
          languages={spokenLangs}
        />
      </div>
    </section>
  );
};

export default ShowMovie;
