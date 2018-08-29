import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Actor from './Actor';
import { Component } from 'preact';

const mockSearch = jest.fn();

const props = {
  location: {
    state: {
      id: Boolean
    }
  }
};

// describe what we are testing
describe('Actor Component', () => {
  //   Shallow render tests are useful to keep yourself constrained to testing the
  //   component as a unit and avoid indirectly testing the behavior of child components

  it('should render required elements without throwing an error', () => {
    const fakeMethod = jest.spyOn(Actor.prototype, 'componentDidMount');
    const wrapper = shallow(<Actor {...props} />);
    wrapper.instance().methodName();
    expect(fakeMethod).toHaveBeenCalledTimes(1);

    // const Header = wrapper.find('h3');
    // const Img = wrapper.find('img');
    console.log(wrapper.debug());
  });

  //   it('image should render src, alt title', () => {
  //     expect(Img.prop('src')).toEqual('imgLink');
  //   });

  //   it('should render the Actor Component', () => {
  //     expect(wrapper.containsMatchingElement(<Actor />)).toEqual(true);
  //   });

  //   it('should render 5 divs', () => {
  //     expect(wrapper.find('div').length).toEqual(5);
  //   });
});
