import React from 'react';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router';

import App from './app';
import LoginForm from './components/login-form';

chai.use(chaiEnzyme());

describe('<App /> should', () => {
  it('exist and be a component', () => expect(App).to.be.a('function'));

  it('redirect to login path', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('.container')).to.be.present();
    expect(wrapper.find(LoginForm)).to.be.present();
  });
});