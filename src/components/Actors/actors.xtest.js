import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // enzyme rendering
import Config from '../../config.json';
import Actors from './actors';

// because Actors is exported within withRouter (Router props) we have to explicitly
// tell the shallow fn to render the wrapped component using WrappedComponent keyword.
describe('Actors Component', () => {
  const wrapper = shallow(<Actors />);
  wrapper.setState({ data: Config.people });
  const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 2 divs', () => {
    expect(divs.length).toEqual(2);
  });
});
