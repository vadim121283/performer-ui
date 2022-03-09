export function useFormValidator() {
  function isValidString(value: string) {
    return value !== undefined && value !== '';
  }
  return {
    isValidString,
  };
}
