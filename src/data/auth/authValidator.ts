export const authValidator = (response: Response): AuthError | undefined => {
  switch (response.status) {
    case 404:
      return 'notFound';
    case 403:
      return 'forbidden';
    case 503:
      return 'unavailable';
    default:
      return undefined;
  }
};
