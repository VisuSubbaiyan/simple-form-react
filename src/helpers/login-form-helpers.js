export const hasInvalidAccount = (bankAccounts) => Object.values(bankAccounts)
  .some(bankAccount => bankAccount.isIBANValid === false || bankAccount.isBankNameValid === false);

export const hasBankAccount = (bankAccounts) => Object.values(bankAccounts)
  .some(bankAccount => bankAccount.IBAN && bankAccount.bankName);