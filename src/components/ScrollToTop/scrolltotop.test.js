import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // enzyme rendering
import ScrollToTop from './ScrollToTop';

// render in ScrollToTop.jsx expects props.location.state (mock object)
const props = {
  location: {
    pathName: '/showlist/TheWalkingDead'
  },
  children: React.Node
};

// because ScrollToTop is exported within withRouter (Router props) we have to explicitly
// tell the shallow fn to render the wrapped component using WrappedComponent keyword.
describe('ScrollToTop Component', () => {
  const wrapper = shallow(
    <ScrollToTop.WrappedComponent pathName={'abc/def'} {...props} />
  );
  const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 2 divs', () => {
    expect(divs.length).toEqual(2);
  });
});
