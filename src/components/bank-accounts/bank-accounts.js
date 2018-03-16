import React from 'react';
import PropTypes from 'prop-types';

import Button from '../base-components/button';
import BankAccountList from './bank-account-list';

const processBankAccounts = (bankAccounts, onTextInputChange, onTextInputBlur) => Object.values(bankAccounts)
  .map(bankAccount => (
    <BankAccountList
      bankAccount={bankAccount} 
      onTextInputChange={onTextInputChange} 
      onTextInputBlur={onTextInputBlur} 
      key={bankAccount.id}
    />)
  );

const BankAccounts = ({onAddButtonClick, bankAccounts, onTextInputChange, onTextInputBlur, validationText}) => (
  <div className="bank-accounts-container">
    <h2>{'Bank accounts'}</h2>
    {validationText && <label className="l-error">{validationText}</label>}
    {processBankAccounts(bankAccounts, onTextInputChange, onTextInputBlur)}
    <Button onClick={onAddButtonClick} label="+ Add bank account"  />
  </div>
);

BankAccounts.propTypes = {
  onAddButtonClick: PropTypes.func,
  bankAccounts: PropTypes.object,
  onTextInputChange: PropTypes.func,
  onTextInputBlur: PropTypes.func,
  validationText: PropTypes.string
};

export default BankAccounts;