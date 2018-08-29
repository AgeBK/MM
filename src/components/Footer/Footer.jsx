import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config.json';
import styles from './footer.css';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const scroller = document.getElementById('scroller');
    window.addEventListener('scroll', () => {
      window.scrollY > Config.showScrollY
        ? (scroller.style.display = 'block')
        : (scroller.style.display = 'none');
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
        <div
          id="scroller"
          className={`${styles.scroller} scroller`}
          onClick={this.smoothscroll}
        >
          <img
            src={Config.scrollerImg}
            alt="scroll to top"
            title="scroll to top"
          />
        </div>
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
