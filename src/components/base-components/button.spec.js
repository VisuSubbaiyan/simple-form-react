import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';

import sinonChai from 'sinon-chai';

import Button from './button';

chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('<Button /> should', () => {
  const className = 'test-class-name';
  const label = 'sample text';
  const value = 'sample value';
  const handler = sinon.spy();
  let renderedButton;

  it('exist and be a component', () => expect(Button).to.be.a('function'));

  beforeEach(() => {
    renderedButton = mount(<Button className={className} label={label} value={value} onClick={handler} />).find('button');
  });

  it('render <button /> html element with all the sent DOM properties', () => {
    expect(renderedButton).to.be.present();
    expect(renderedButton).to.have.className(className);
    expect(renderedButton).to.have.text(label);
    expect(renderedButton).to.have.value(value);
  });

  it('calls the click event when clicked', () => {
    renderedButton.simulate('click');

    expect(handler.calledOnce).to.be.true;
  });

  it('have disabled selector when disabled', () => {
    const button = mount(<Button label={label} onClick={handler} disabled />).find('button');

    expect(button).to.be.disabled();
  });
});