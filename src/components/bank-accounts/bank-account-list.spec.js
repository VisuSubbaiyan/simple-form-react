import React from 'react';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';

import BankAccountList from './bank-account-list';
import TextInput from '../base-components/text-input';

chai.use(chaiEnzyme());

describe('<BankAccountList /> should', () => {
  const bankAccount = {id: 'uid01', IBAN: 'BE68539007547034', bankName: 'CommerzBank', isIBANValid: true, isBankNameValid: true};
  const eventHandler = () => sinon.spy();
  let renderedBankAccountList;

  it('exist and be a component', () => expect(BankAccountList).to.be.a('function'));

  beforeEach(() => {
    renderedBankAccountList = mount(
      <BankAccountList
        bankAccount={bankAccount}
        onTextInputChange={eventHandler}
        onTextInputBlur={eventHandler}
      />);
  });

  it('contain <TextInput /> components', () => {
    expect(renderedBankAccountList.find(TextInput)).to.have.length(2);
  });

  it('first <TextInput /> contain IBAN number in props.value', () => {
    expect(renderedBankAccountList.find(TextInput).at(0)).to.have.prop('value', bankAccount.IBAN);
  });

  it('second <TextInput /> contain bankName in props.value', () => {
    expect(renderedBankAccountList.find(TextInput).at(1)).to.have.prop('value', bankAccount.bankName);
  });
});