module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', {}],
    ['@babel/preset-typescript'],
    ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }]
  ];

  const plugins = [
    ['@babel/transform-runtime'],
    ['babel-plugin-styled-components', { minify: true, pure: true }]
  ];

  if (api.env('development')) {
    plugins.push('react-refresh/babel');
  }

  return { presets, plugins };
};
