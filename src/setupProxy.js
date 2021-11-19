const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://nlp-task.azurewebsites.net/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
