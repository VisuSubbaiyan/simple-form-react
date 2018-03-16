import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';

import {hasInvalidAccount, hasBankAccount} from './login-form-helpers';

const validBankAccounts = {
  uid01: {id: 'uid01', IBAN: 'BE68539007547034', bankName: 'CommerzBank', isIBANValid: true, isBankNameValid: true}
};

const inValidBankAccounts = {
  uid01: {id: 'uid01', IBAN: '', bankName: '', isIBANValid: false, isBankNameValid: false}
};

describe('`hasInvalidAccount` should', () => {
  it('exist and be a function', () => expect(hasInvalidAccount).to.be.a('function'));

  it('return true if has any invalid bank account in bankAccounts', () => {
    expect(hasInvalidAccount(inValidBankAccounts)).to.be.true;
  });

  it('return false if no invalid bank account in bankAccounts', () => {
    expect(hasInvalidAccount(validBankAccounts)).to.not.be.true;
  });
});


describe('`hasBankAccount` should', () => {
  it('exist and be a function', () => expect(hasBankAccount).to.be.a('function'));

  it('return true if has anyone of IBAN & bankName in bankAccounts', () => {
    expect(hasBankAccount(validBankAccounts)).to.be.true;
  });

  it('return false if no IBAN & bankName in bankAccounts', () => {
    expect(hasBankAccount(inValidBankAccounts)).to.not.be.true;
  });
});