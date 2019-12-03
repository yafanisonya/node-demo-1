var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号!Example:\nnode server.js 8888 ");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  console.log("有人发请求过来！路径为：" + pathWithQuery);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>node.js demo</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Success</h1>
    </body>
    </html>`);
    response.end();
  } else if (path === "/style.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write("h1{color:red;}");
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write("你访问的页面不存在");
    response.end();
  }
});

server.listen(port);
console.log(
  "开启" + port + "端口监听成功，请用浏览器打开 http://localhost:" + port
);
