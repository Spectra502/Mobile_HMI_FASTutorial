/**
 * metro.config.js
 */

/*
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
*/

/**
 * metro.config.js
 */


// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // 1) Keep your SVG setup
  const { assetExts, sourceExts } = config.resolver;
  config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts = [...sourceExts, 'svg'];
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  // 2) Add .gif so Metro treats it as an asset
  config.resolver.assetExts.push('gif');

  // 3) Alias “@/foo” → “<project-root>/foo”
  const projectRoot = __dirname;
  config.resolver.extraNodeModules = new Proxy({}, {
    get: (_, name) => path.join(projectRoot, name)
  });
  // And watch the root so Metro picks up your top-level folders
  config.watchFolders = [ projectRoot ];

  return config;
})();

