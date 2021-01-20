module.exports = {
  configureWebpack: {
    devtool: "#source-map",
  },
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue-pokedex/" // <== name of your GH repository
      : "/",
};
