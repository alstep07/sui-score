export const handleError = (error: Error) => {
  // TODO: Add sentry monitoring

  console.error('Wallet connection error:', error);
}
