# react-cms
cotent manager system based on ant design.  

## usage
```
git clone 
npm install
npm start
```

## 开发模式
开发模式下,所有除静态资源的请求都会转发到localhost:8080(地址在`app/package.json`中的`proxy`段配置)这个项目
```shell
PORT=8080 npm start # 服务端 localhost:8080
cd app
npm start # 前端使用localhost:3000调试项目
```

## 生产模式
```shell
cd app
npm run build
cd ..
PORT=8080 npm start # localhost:8080
```

## optimize
+ login field real-time validation.
