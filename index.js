console.log("Init proxyCombinator");

var proxy = require("express-http-proxy");
var app = require("express")();

var mockUrl = "https://dfwtest.mockable.io/";
var retryCounter = 0;
var maxRetries = 3;

app.use("/proxy", proxy(mockUrl));

app.use(
  "/retry",
  proxy(mockUrl, {
    filter: function(req, res) {
      // return req.method == "GET";
      if (retryCounter < maxRetries) {
        retryCounter++;
          return false;
      }

      return true;
    }
  })
);

app.use("/test", function(req, res) {
  res.send("Hello World");
});

console.log("proxyCombinator is listening...");

app.listen(3000);
