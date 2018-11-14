/* eslint no-unused-expressions: 0 */ // TODO: find a better fix
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config.json';
import styles from './footer.css';

class Footer extends PureComponent {
  componentDidMount() {
    const scroller = document.getElementById('scroller');
    window.addEventListener('scroll', () => {
      if (window.scrollY > Config.showScrollY) {
        scroller.style.display = 'block';
      } else {
        scroller.style.display = 'none';
      }
    });
  }

  smoothscroll = () => {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.smoothscroll);
      window.scrollTo(0, currentScroll - currentScroll / 10);
    }
  };

  render() {
    return (
      <footer>
        <button
          id="scroller"
          className={`${styles.scroller} scroller`}
          onClick={this.smoothscroll}
          onKeyDown={this.smoothscroll}
          type="button"
        >
          <img
            src={Config.scrollerImg}
            alt="scroll to top"
            title="scroll to top"
          />
        </button>
        <a href="/">Home</a>
        <Link to={{ pathname: '/info', state: { data: 'terms' } }}>
          Terms of use
        </Link>
        <Link to={{ pathname: '/info', state: { data: 'termCond' } }}>
          Terms &amp; Conditions
        </Link>
        <Link to={{ pathname: '/info', state: { data: 'privacy' } }}>
          Privacy
        </Link>
        <Link to={{ pathname: '/info', state: { data: 'adrianK' } }}>
          Adrian Kinross
        </Link>
      </footer>
    );
  }
}

export default Footer;
