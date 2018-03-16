import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../base-components/text-input';

const BankAccountList = ({bankAccount, onTextInputChange, onTextInputBlur}) => (
  <div className="bank-account-list">
    <TextInput
      label="IBAN"
      placeholder="IBAN" 
      value={bankAccount.IBAN || ''} 
      pattern="IBAN" 
      onChange={onTextInputChange('IBAN', bankAccount.id)} 
      onBlur={onTextInputBlur('IBAN', bankAccount.id)}
    />
    <TextInput
      label="Bank name"
      placeholder="Bank name"
      value={bankAccount.bankName || ''}
      pattern="text" 
      onChange={onTextInputChange('bankName', bankAccount.id)} 
      onBlur={onTextInputBlur('BankName', bankAccount.id)}
    />
  </div>
);

BankAccountList.propTypes = {
  bankAccount: PropTypes.object,
  onTextInputChange: PropTypes.func,
  onTextInputBlur: PropTypes.func
}

export default BankAccountList;