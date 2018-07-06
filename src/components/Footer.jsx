import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Config from '../config.json';

class Footer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(new Date());
    var scroller = $('.scroller');
    $(window).scroll(function() {
      this.scrollY > Config.showScrollY ? scroller.show() : scroller.hide();
    });
    scroller.on('click', function() {
      //$('html, body').animate({ scrollTop: 0 }, 'slow');
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 10);
        }
      })();
    });
  }

  render() {
    return (
      <footer>
        <div className="scroller">
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
