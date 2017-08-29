export default config => ({
  ...config,
  publicPath: process.env.ASSET_URL || "/assets/",
});
