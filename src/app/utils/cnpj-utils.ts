function getCharValue(char: string): number {
  const charCode = char.charCodeAt(0);
  return charCode - 48; // Subtrair 48 do código ASCII conforme documentação oficial
}

export function cleanAlphanumeric(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export function cleanNumbers(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidCNPJ(cnpj: string): boolean {
  // First, determine if it's an alphanumeric CNPJ
  const hasLetters = /[a-zA-Z]/.test(cnpj);

  // Clean the CNPJ appropriately
  const cleanCNPJ = hasLetters ? cleanAlphanumeric(cnpj) : cleanNumbers(cnpj);

  // CNPJ must have 14 characters
  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // For numeric CNPJs, check for known invalid CNPJs (all same digits)
  if (!hasLetters && /^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }

  // For alphanumeric CNPJs, the last two characters must be digits (verification digits)
  if (hasLetters && !/\d{2}$/.test(cleanCNPJ)) {
    /* istanbul ignore next */
    return false;
  }

  // Validate first verification digit
  let size = cleanCNPJ.length - 2; // 12 primeiros caracteres
  let numbers = cleanCNPJ.substring(0, size);
  const digits = cleanCNPJ.substring(size); // 2 últimos dígitos verificadores

  // Cálculo do primeiro dígito verificador
  // Pesos 5,4,3,2,9,8,7,6,5,4,3,2 da direita para a esquerda
  let sum = 0;
  let weight = 2;

  // Percorre os dígitos da direita para a esquerda
  for (let i = size - 1; i >= 0; i--) {
    const charValue = hasLetters
      ? getCharValue(numbers.charAt(i))
      : parseInt(numbers.charAt(i));

    sum += charValue * weight;

    // Incrementa o peso, voltando para 2 após chegar a 9
    weight = weight === 9 ? 2 : weight + 1;
  }

  // Cálculo do dígito usando módulo 11
  let remainder = sum % 11;
  let result = remainder < 2 ? 0 : 11 - remainder;

  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  // Validate second verification digit
  size = size + 1; // Inclui o primeiro dígito verificador
  numbers = cleanCNPJ.substring(0, size);

  // Cálculo do segundo dígito verificador
  sum = 0;
  weight = 2;

  // Percorre os dígitos da direita para a esquerda
  for (let i = size - 1; i >= 0; i--) {
    const charValue = hasLetters
      ? getCharValue(numbers.charAt(i))
      : parseInt(numbers.charAt(i));

    sum += charValue * weight;

    // Incrementa o peso, voltando para 2 após chegar a 9
    weight = weight === 9 ? 2 : weight + 1;
  }

  // Cálculo do dígito usando módulo 11
  remainder = sum % 11;
  result = remainder < 2 ? 0 : 11 - remainder;

  return result === parseInt(digits.charAt(1));
}