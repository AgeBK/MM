import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // enzyme rendering
import NotFound from './NotFound';

describe('NotFound Component', () => {
  const wrapper = shallow(<NotFound />);
  const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 2 divs', () => {
    expect(divs.length).toEqual(2);
  });
});
