const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const config = require("./config");
const axios = require("axios").default;

const router = new Router();

router
  .all("/", (ctx) => {
    ctx.body = "ok";
  })
  .use(bodyParser())
  .post("/api/sendEmail", async (ctx) => {
    const options = {
      method: "POST",
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
        "x-rapidapi-key": config.API_KEYS.SEND_GRID,
      },
      data: ctx.request.rawBody,
    };
    const res = await axios.request(options).catch((error) => {
      return error.response;
    });
    ctx.response.status = res.status;
    ctx.response.headers = {
      ...(ctx.response.headers ?? {}),
      ...(res.headers ?? {}),
    };
    ctx.response.body = res.data;
  })
  .get("/api/stock/v2/get-chart", async (ctx) => {
    const options = {
      method: "GET",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": config.API_KEYS.SEND_GRID,
      },
      params: ctx.query,
      data: ctx.request.rawBody,
    };
    const res = await axios.request(options).catch((error) => {
      return error.response;
    });
    ctx.response.status = res.status;
    ctx.response.headers = {
      ...(ctx.response.headers ?? {}),
      ...(res.headers ?? {}),
    };
    ctx.response.body = res.data;
  });

function createApp() {
  const app = new Koa();

  // make app silent in test env
  if (process.env.NODE_ENV === "test") app.silent = true;

  // install router into Koa instance
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
}

if (!module.parent) {
  console.debug(config);
  const app = createApp();
  app.listen(config.PORT);

  if (process.send) {
    process.send("ok");
  }
}

module.exports = createApp;
