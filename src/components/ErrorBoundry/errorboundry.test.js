import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme'; // enzyme rendering
import ErrorBoundry from './ErrorBoundry';

// render in ErrorBoundry.jsx expects props.location.state (mock object)
const props = {
  location: {
    state: {
      data: String
    }
  },
  children: React.Node
};

describe('ErrorBoundry Component', () => {
  const wrapper = mount(
    <Router>
      <ErrorBoundry {...props} />)
    </Router>
  );
  // const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it('should render 2 divs', () => {
  //   expect(divs.length).toEqual(2);
  // });
});
