export const deriveValidationText = (pattern) => {
  if (pattern === 'text') return 'Numbers or Special Charecters not allowed';
  if (pattern === 'email') return 'Value should be a valid email';
  if (pattern === 'IBAN') return 'Value should be a valid IBAN';

  return null;
};
