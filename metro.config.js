/**
 * metro.config.js
 */
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Add .svg to assetExts and remove it from sourceExts
  const { assetExts, sourceExts } = config.resolver;
  config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];
  // Tell Metro to use the svg-transformer for .svg files
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  return config;
})();
