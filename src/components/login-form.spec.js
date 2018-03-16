import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount} from 'enzyme';

import sinonChai from 'sinon-chai';

import TextInput from './base-components/text-input';
import Button from './base-components/button';

import BankAccounts from './bank-accounts/bank-accounts';
import LoginForm from './login-form';

chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('<LoginForm /> should', () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    bankAccounts: {},
    isFirstNameValid: true,
    isLastNameValid: true,
    isEmailValid: true,
    firstNameValidationText: '',
    lastNameValidationText: '',
    emailValidationText: '',
    bankAccountsValidationText: ''
  };
  let renderedLoginForm;

  it('exist and to be a component', () => expect(LoginForm).to.be.a('function'));

  beforeEach(() => {
    renderedLoginForm = mount(<LoginForm />);
  });

  it('contain valid initialState', () => {
    expect(renderedLoginForm).to.have.state('firstName', initialState.firstName);
    expect(renderedLoginForm).to.have.state('lastName', initialState.lastName);
    expect(renderedLoginForm).to.have.state('email', initialState.email);
    expect(renderedLoginForm).to.have.state('bankAccounts').deep.equal(initialState.bankAccounts);
    expect(renderedLoginForm).to.have.state('isFirstNameValid', initialState.isFirstNameValid);
    expect(renderedLoginForm).to.have.state('isLastNameValid', initialState.isLastNameValid);
    expect(renderedLoginForm).to.have.state('isEmailValid', initialState.isEmailValid);
    expect(renderedLoginForm).to.have.state('firstNameValidationText', initialState.firstNameValidationText);
    expect(renderedLoginForm).to.have.state('lastNameValidationText', initialState.lastNameValidationText);
    expect(renderedLoginForm).to.have.state('emailValidationText', initialState.emailValidationText);
    expect(renderedLoginForm).to.have.state('bankAccountsValidationText', initialState.bankAccountsValidationText);
  });

  it('contain <TextInput />, <BankAccounts /> and <Button /> components', () => {
    expect(renderedLoginForm.find(TextInput)).to.have.length(3);
    expect(renderedLoginForm.find(BankAccounts)).to.be.present();
    expect(renderedLoginForm.find(Button)).to.have.length(2);
  });

  it('validate form and update state on submit button click', () => {
    renderedLoginForm.find('button').at(1).simulate('click'); // submit button onClick

    expect(renderedLoginForm).to.have.state('firstNameValidationText', 'FirstName is required');
    expect(renderedLoginForm).to.have.state('lastNameValidationText', 'LastName is required');
    expect(renderedLoginForm).to.have.state('emailValidationText', 'Email is required');
    expect(renderedLoginForm).to.have.state('bankAccountsValidationText', 'You should provide at least one bank account');
  });

  it('update firstName, lastName and email in state', () => {
    const firstName = 'Peter';
    const lastName = 'Trum';
    const email = 'peter.trum@gmail.com';

    renderedLoginForm.find('input').at(0).simulate('change', {target: {value: firstName}});
    renderedLoginForm.find('input').at(1).simulate('change', {target: {value: lastName}});
    renderedLoginForm.find('input').at(2).simulate('change', {target: {value: email}});

    expect(renderedLoginForm).to.have.state('firstName', firstName);
    expect(renderedLoginForm).to.have.state('lastName', lastName);
    expect(renderedLoginForm).to.have.state('email', email);
  });

  it('update bankAccount with id, IBAN & bankName in state', () => {
    const bankAccount = {IBAN: 'BE68539007547034', bankName: 'CommerzBank'};

    renderedLoginForm.find('button').at(0).simulate('click');
    renderedLoginForm.find('input').at(3).simulate('change', {target: {value: bankAccount.IBAN}});
    renderedLoginForm.find('input').at(4).simulate('change', {target: {value: bankAccount.bankName}});

    expect(renderedLoginForm.state('bankAccounts')).to.satisfy((bankAccounts) => {
        const stateValue = Object.values(bankAccounts)[0];
        return stateValue.IBAN === bankAccount.IBAN && stateValue.bankName === bankAccount.bankName;
      });
  });

  it('disable submit button for invalid firstName and updates state', () => {
    const firstName = 'Peter123';

    renderedLoginForm.find('input').at(0).simulate('change', {target: {value: firstName}});
    renderedLoginForm.find('input').at(0).simulate('blur');

    expect(renderedLoginForm).to.have.state('isFirstNameValid', false);
    expect(renderedLoginForm.find('button').at(1)).to.be.disabled();
  });

  it('disable submit button for invalid lastName and updates state', () => {
    const lastName = 'Trum123';

    renderedLoginForm.find('input').at(1).simulate('change', {target: {value: lastName}});
    renderedLoginForm.find('input').at(1).simulate('blur');

    expect(renderedLoginForm).to.have.state('isLastNameValid', false);
    expect(renderedLoginForm.find('button').at(1)).to.be.disabled();
  });

  it('disable submit button for invalid email and updates state', () => {
    const email = 'invalidEmail';

    renderedLoginForm.find('input').at(2).simulate('change', {target: {value: email}});
    renderedLoginForm.find('input').at(2).simulate('blur');

    expect(renderedLoginForm).to.have.state('isEmailValid', false);
    expect(renderedLoginForm.find('button').at(1)).to.be.disabled();
  });
  
  it('disable submit button for invalid IBAN and updates state', () => {
    const IBAN = 'invalidIBAN';

    renderedLoginForm.find('button').at(0).simulate('click');
    renderedLoginForm.find('input').at(3).simulate('change', {target: {value: IBAN}});
    renderedLoginForm.find('input').at(3).simulate('blur');

    expect(renderedLoginForm.state('bankAccounts')).to.satisfy((bankAccounts) => {
      const stateValue = Object.values(bankAccounts)[0];

      return stateValue.isIBANValid === false;
    });
    expect(renderedLoginForm.find('button').at(1)).to.be.disabled();
  });

  it('disable submit button for invalid Bank name and updates state', () => {
    const bankName = 'invalidBankName123';

    renderedLoginForm.find('button').at(0).simulate('click');
    renderedLoginForm.find('input').at(4).simulate('change', {target: {value: bankName}});
    renderedLoginForm.find('input').at(4).simulate('blur');

    expect(renderedLoginForm.state('bankAccounts')).to.satisfy((bankAccounts) => {
      const stateValue = Object.values(bankAccounts)[0];
      
      return stateValue.isBankNameValid === false;
    });
    expect(renderedLoginForm.find('button').at(1)).to.be.disabled();
  });
});