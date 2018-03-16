import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';

import sinonChai from 'sinon-chai';

import TextInput from './text-input';

chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('<TextInput /> should', () => {
  const label = 'name';
  const value = 'test value';
  const placeholder = 'placeholder';
  const validationText = 'validation text';
  const className = 'test-class-name';
  const eventHandler = sinon.spy(); // sinon defined in global scope
  
  let renderedTextInput;

  it('exist and be a component', () => expect(TextInput).to.be.a('function'));

  beforeEach(() => {
    renderedTextInput = mount(
      <TextInput
        label={label}
        className={className}
        value={value} 
        placeholder={placeholder}
        onChange={eventHandler} 
        onBlur={eventHandler}
        validationText={validationText} 
      />
    );
  });

  it('contain valid initalState', () => {
    expect(renderedTextInput).to.have.state('value', value);
    expect(renderedTextInput).to.have.state('isValid', true);
  });

  it('render wrapper element with className recieved from props', () => {
    expect(renderedTextInput.find(`.${className}`)).to.be.present();
  });

  it('render <input /> html element with all the sent DOM properties', () => {
    const renderedInput = renderedTextInput.find('input');

    expect(renderedInput).to.be.present();
    expect(renderedInput.props()).to.have.property('value', value);
    expect(renderedInput.props()).to.have.property('placeholder', placeholder);
  });

  it('render a label div element with the message received from props', () => {
    const renderedLabel = renderedTextInput.find('.l-form-control-label');

    expect(renderedLabel).to.be.present();
    expect(renderedLabel).to.have.text(label);
  });

  it('reder validation text with the message recieved from props', () => {
    const renderedValidationText = renderedTextInput.find('.l-form-control-validation-msg');
    
    expect(renderedValidationText).to.be.present();
    expect(renderedValidationText).to.have.text(validationText);
  });

  it('calls the change event with the input value and updates state' , () => {
    const renderedInput = renderedTextInput.find('input');
    const changedInputValue = 'some random value';

    renderedInput.simulate('change', {target: {value: changedInputValue}});

    expect(eventHandler.calledOnce).to.be.true;
    expect(eventHandler.args[0][1]).to.equal(changedInputValue);
    expect(renderedTextInput).to.have.state('value', changedInputValue);
    expect(renderedTextInput).to.have.state('isValid', true);
  });

  it('calls the blur event with input validation argument for `pattern = text`', () => {
    const blurEventHandler = sinon.spy();
    const renderedTextPatternInput = mount(
      <TextInput onChange={blurEventHandler} onBlur={blurEventHandler} pattern="text" value="test" />).find('input');

    renderedTextPatternInput.simulate('blur');

    expect(blurEventHandler.calledOnce).to.be.true;
    expect(blurEventHandler.args[0][1]).to.be.true;
  });

  it('updates state on blur event for `pattern = text` and display validation text', () => {
    const blurEventHandler = sinon.spy();
    const renderedTextInput = mount(<TextInput onChange={blurEventHandler} onBlur={blurEventHandler} pattern="text" value="test123" />);

    renderedTextInput.find('input').simulate('blur');

    expect(renderedTextInput).to.have.state('isValid', false);
    expect(renderedTextInput.find('.l-form-control-validation-msg')).to.have.text('Numbers or Special Charecters not allowed');
  });

  it('calls the blur event with input validation argument for `pattern = email`', () => {
    const blurEventHandler = sinon.spy();
    const renderedEmailPatternInput = mount(
      <TextInput 
        onChange={blurEventHandler} 
        onBlur={blurEventHandler} 
        pattern="email" 
        value="visu.subbaiyan@gmail.com" 
      />).find('input');

    renderedEmailPatternInput.simulate('blur');

    expect(blurEventHandler.calledOnce).to.be.true;
    expect(blurEventHandler.args[0][1]).to.be.true;
  });

  it('updates state on blur event for `pattern = email` and display validation text', () => {
    const blurEventHandler = sinon.spy();
    const renderedTextInput = mount(<TextInput onChange={blurEventHandler} onBlur={blurEventHandler} pattern="email" value="test123" />);

    renderedTextInput.find('input').simulate('blur');

    expect(renderedTextInput).to.have.state('isValid', false);
    expect(renderedTextInput.find('.l-form-control-validation-msg')).to.have.text('Value should be a valid email');
  });

  it('calls the blur event with input validation argument for `pattern = IBAN`', () => {
    const blurEventHandler = sinon.spy();
    const renderedEmailPatternInput = mount(
      <TextInput 
        onChange={blurEventHandler} 
        onBlur={blurEventHandler} 
        pattern="IBAN" 
        value="BE68539007547034" 
      />).find('input');

    renderedEmailPatternInput.simulate('blur');

    expect(blurEventHandler.calledOnce).to.be.true;
    expect(blurEventHandler.args[0][1]).to.be.true;
  });

  it('updates state on blur event for `pattern = IBAN` and display validation text', () => {
    const blurEventHandler = sinon.spy();
    const renderedTextInput = mount(<TextInput onChange={blurEventHandler} onBlur={blurEventHandler} pattern="IBAN" value="test123" />);

    renderedTextInput.find('input').simulate('blur');

    expect(renderedTextInput).to.have.state('isValid', false);
    expect(renderedTextInput.find('.l-form-control-validation-msg')).to.have.text('Value should be a valid IBAN');
  });
});
