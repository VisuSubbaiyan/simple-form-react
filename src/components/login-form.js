import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';

import TextInput from './base-components/text-input';
import Button from './base-components/button';

import BankAccounts from './bank-accounts/bank-accounts';
import {hasInvalidAccount, hasBankAccount} from '../helpers/login-form-helpers';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
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
  }

  handleTextInputChange = (field, id) => (event, value) => {
    // We can use Seamless-Immutable library setIn or merge deep methods to update the value in statein easy way
    // But I didn't use it to show my JS expertise
    this.setState(prevState => {
      if (id) {
        const updatedBankAccount = {[id]: {...prevState.bankAccounts[id], [field]: value}};
        return ({bankAccounts: Object.assign({}, prevState.bankAccounts, updatedBankAccount), bankAccountsValidationText: ''});
      }

      return ({[field]: value, [`${field}ValidationText`]: ''});
    });
  }

  handleTextInputBlur = (field, id) => (event, isValid) => {
    const updatedState = {[`is${field}Valid`]: isValid};
    this.setState(prevState => {
      if (id) {
        const updatedBankAccount = {[id]: {...prevState.bankAccounts[id], ...updatedState}};
        return ({bankAccounts: Object.assign({}, prevState.bankAccounts, updatedBankAccount)});
      }

      return updatedState;
    });
  }

  // Validate login form
  validateForm = () => {
    let isFormValid = true;
    const validationData = {};

    if (!this.state.firstName) {
      validationData.firstNameValidationText = 'FirstName is required';
      isFormValid = false;
    }

    if (!this.state.lastName) {
      validationData.lastNameValidationText = 'LastName is required';
      isFormValid = false;
    }

    if (!this.state.email) {
      validationData.emailValidationText = 'Email is required';
      isFormValid = false;
    }

    if (!hasBankAccount(this.state.bankAccounts)) {
      validationData.bankAccountsValidationText = 'You should provide at least one bank account';
      isFormValid = false;
    }

    this.setState(validationData);

    return isFormValid;
  }

  handleButtonClick = (field) => () => {
    if (field === 'addAccount') {
      const id = v4();
      this.setState(prevState => ({bankAccounts: Object.assign({}, prevState.bankAccounts, {[id]: {id}})}));
    } else if(this.validateForm()) {
      const {firstName, lastName, email, bankAccounts} = this.state;

      alert('FormData:' + JSON.stringify({
        firstName,
        lastName,
        email,
        bankAccounts: Object.values(bankAccounts).map(bankAccount => ({iban: bankAccount.IBAN, bankName: bankAccount.bankName}))
      }, undefined , 4));
        // submit Action to show popup with required data
        // Need to pick firstName, lastName, email and bankAccounts needs to be shown in ModelPopup 
    }
    // No action if from invalid
  }

  render() {
    const submitDisabled = !this.state.isFirstNameValid || !this.state.isLastNameValid || !this.state.isEmailValid || hasInvalidAccount(this.state.bankAccounts);
    return (
      <div className="login-form">
        <h1>{'Register account'}</h1>
        <TextInput
          label="First name"
          placeholder="First name" 
          value={this.state.firstName}
          onChange={this.handleTextInputChange('firstName')}
          onBlur={this.handleTextInputBlur('FirstName')}
          pattern="text"
          validationText={this.state.firstNameValidationText}
        />
        <TextInput
          label="Last name"
          placeholder="last name" 
          value={this.state.lastName}
          onChange={this.handleTextInputChange('lastName')}
          onBlur={this.handleTextInputBlur('LastName')}
          pattern="text"
          validationText={this.state.lastNameValidationText}
        />
        <TextInput
          label="Email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleTextInputChange('email')}
          onBlur={this.handleTextInputBlur('Email')}
          pattern="email"
          validationText={this.state.emailValidationText}
        />
        <BankAccounts
          onAddButtonClick={this.handleButtonClick('addAccount')}
          onTextInputChange={this.handleTextInputChange}
          onTextInputBlur={this.handleTextInputBlur}
          bankAccounts={this.state.bankAccounts}
          validationText={this.state.bankAccountsValidationText}
        />
        <Button label="Submit!" className="submit" onClick={this.handleButtonClick('submit')} disabled={submitDisabled} />
      </div>
    );
  }
}

export default LoginForm;
