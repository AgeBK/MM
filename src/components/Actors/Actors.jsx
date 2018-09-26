import React, { Component } from 'react';
import ActorItem from '../ActorItem/ActorItem'; // used for show credits as well
import Config from '../../config.json';
import { fetchSingle, uniqueId } from '../../utils.js';
import styles from './actors.css';

class Actors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    if (navigator.onLine) {
      fetchSingle.call(this, Config.peopleURL); // utils
    } else {
      const hostJS = `${window.location.origin}${Config.jsFolder}`; // offline
      fetchSingle.call(this, hostJS + Config.people);
    }
  }

  render() {
    if (this.state.data.results) {
      const arr = this.state.data.results;
      const keys = uniqueId(arr.length);

      const actors = arr.map((actor, i) => {
        // get each actors props and known for object
        const { id, name, profile_path: profileImg, known_for: kFor } = actor;
        console.log(kFor);

        // gets actors known for movies from know_for object
        const titles = kFor.map(val => [
          val.title ? val.title : val.name,
          val.id,
          val.media_type
        ]);
        console.log(titles);

        const img = Config.imgResizeURL + profileImg;
        return (
          <ActorItem
            key={keys[i]}
            id={id}
            name={name}
            img={img}
            titles={titles}
          />
        );
      });

      return (
        <section className={`${styles.actors} results`}>
          <div className="row">
            <h2>Actors</h2>
            {actors}
          </div>
        </section>
      );
    }
    return null;
  }
}

export default Actors;
