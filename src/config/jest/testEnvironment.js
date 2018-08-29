const JSDOMEnvironment = require('jest-environment-jsdom');
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

module.exports = class CustomizedJSDomEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);
    this.global.jsdom = this.dom; // here you can try playing with JSDOM configurations
  }

  teardown() {
    this.global.jsdom = null;
    return super.teardown();
  }
};
