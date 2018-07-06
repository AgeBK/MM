import React from 'react';
import ReactDOM, { render } from 'react-dom';
// import './sw.js';
import 'bootstrap';
// import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap.scss';
// Required
// @import "~bootstrap/scss/functions";
// @import "~bootstrap/scss/variables";
// @import "~bootstrap/scss/mixins";

// // Optional
// @import "~bootstrap/scss/reboot";
// @import "~bootstrap/scss/type";
// @import "~bootstrap/scss/images";
// @import "~bootstrap/scss/code";
// @import "~bootstrap/scss/grid";
import './sass/app.scss';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
