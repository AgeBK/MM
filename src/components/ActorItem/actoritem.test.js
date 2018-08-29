import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // enzyme rendering
import Info from '../info/info';

// render in Info.jsx expects props.location.state (mock object)
const props = {
  location: {
    state: {}
  }
};

// because Info is exported within withRouter (Router props) we have to explicitly
// tell the shallow fn to render the wrapped component using WrappedComponent keyword.
describe('Actor Item Component', () => {
  const wrapper = shallow(<Info.WrappedComponent {...props} />);
  const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 2 divs', () => {
    expect(divs.length).toEqual(2);
  });
});
