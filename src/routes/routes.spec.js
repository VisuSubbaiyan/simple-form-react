import React from 'react';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';

import Routes from './routes';
import App from '../app';

chai.use(chaiEnzyme());

describe('<Routes /> should', () => {
  it('exist and be a component', () => expect(Routes).to.be.a('function'));

  it('contain <App/> component with in it', () => {
    const routes = shallow(<Routes />);

    expect(routes.find(App)).to.be.present();
  });
});