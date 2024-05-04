# realworld-html-js-simple

This is a simple HTML/JS implementation of the RealWorld Web APP. It uses the Fetch to make requests to the API and updates the DOM with the results.

这是一个简单的 HTML/JS 实现的 RealWorld Web APP 。它使用 Fetch 向 API 发出请求，并使用结果更新 DOM 。

## How to run

You can build the image locally and run it:

本地构建镜像并运行：

```shell
docker build -t realworld-html-js-simple .
docker run -d -p 80:80 --name realworld-html-js-simple realworld-html-js-simple
```

Or you can run the image directly from DockerHub:

或者直接使用 DockerHub 上的镜像运行：

```shell
docker run -d -p 80:80 --name realworld-html-js-simple daodaobot/realworld-html-js-simple
```

If you are not using Docker, you can refer to the configuration in the /nginx/default.conf file and deploy the program files directly to the Nginx server.

如果不使用 Docker ，可以参考 /nginx/default.conf 文件中的配置，将程序文件直接部署到 Nginx 服务器上。

Then open your browser and navigate to `http://localhost`.

然后打开浏览器，访问 `http://localhost` 。
