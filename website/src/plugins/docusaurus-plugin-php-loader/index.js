module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-php-loader',
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {test: /(\.txt|\.php|^answer\d+\.md)$/, use: 'raw-loader'}
          ],
        },
      };
    },
  };
};
