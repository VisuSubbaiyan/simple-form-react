import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';

import {deriveValidationText} from './base-component-helpers';

describe('`deriveValidationText` should', () => {
  const pattern = {text: 'text', email: 'email', IBAN: 'IBAN'};
  const expectedDataMock = {
    text: 'Numbers or Special Charecters not allowed',
    email: 'Value should be a valid email',
    IBAN: 'Value should be a valid IBAN'
  };

  it('exist and be a function', () => expect(deriveValidationText).to.be.a('function'));

  it('return valid message for argument `text`', () => {
    expect(deriveValidationText(pattern.text)).to.equal(expectedDataMock.text);
  });

  it('return valid message for argument `email`', () => {
    expect(deriveValidationText(pattern.email)).to.equal(expectedDataMock.email);
  });

  it('return valid message for argument `IBAN`', () => {
    expect(deriveValidationText(pattern.IBAN)).to.equal(expectedDataMock.IBAN);
  });
});

