export default (config: { mock?: boolean; setup: () => void }) => {
  const { mock = process.env.NODE_ENV === 'development' } = config;
  if (mock === false) return;
  // setup();
};
