module.exports = function override(config, env) {
    // 添加對 node: 前綴的支持
    config.resolve.alias = {
    ...config.resolve.alias,
    'node:buffer': require.resolve('buffer/'),
  }
    return config;
};