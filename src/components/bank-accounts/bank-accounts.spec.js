import React from 'react';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';

import BankAccounts from './bank-accounts';
import TextInput from '../base-components/text-input';

chai.use(chaiEnzyme());

describe('<BankAccounts /> should', () => {
  const bankAccountsMock = {
    uid01: {id: 'uid01', IBAN: 'BE68539007547034', bankName: 'CommerzBank', isIBANValid: true, isBankNameValid: true},
    uid02: {id: 'uid02', IBAN: 'DE68539007675565', bankName: 'Deutsche Bank', isIBANValid: true, isBankNameValid: true}
  };

  const eventHandler = () => sinon.spy();
  const validationText = 'sample validation text';
  const heading = 'Bank accounts';
  const buttonLabel = '+ Add bank account'; 
  let  renderedBankAccounts;

  it('exist and be a component', () => expect(BankAccounts).to.be.a('function'));

  beforeEach(() => {
    renderedBankAccounts = mount(
      <BankAccounts
        onAddButtonClick={eventHandler}
        bankAccounts={bankAccountsMock}
        onTextInputChange={eventHandler}
        onTextInputBlur={eventHandler}
        validationText={validationText}
      />);
  });

  it('render container, heading, validationText and Button', () => {
    expect(renderedBankAccounts.find('.bank-accounts-container')).to.exist;
    expect(renderedBankAccounts.find('h2')).to.have.text(heading);
    expect(renderedBankAccounts.find('.l-error')).to.have.text(validationText);
    expect(renderedBankAccounts.find('button')).to.have.text(buttonLabel);
  });

  it('render expected number of `bank-account-list` and <TextInput /> component', () => {
    expect(renderedBankAccounts.find('.bank-account-list')).to.have.length(2);
    expect(renderedBankAccounts.find(TextInput)).to.have.length(4);
  });
});