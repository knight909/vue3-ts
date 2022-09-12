import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    //指定服务器应该监听哪个 IP 地址， 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
    //默认:'127.0.0.1'
    //命令设置:--host 0.0.0.0 或 --host
    host: "127.0.0.1",
    port: 8080, //指定开发服务器端口。注意:如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
    //默认:3000
    strictPort: false,//设为true时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    //默认:false
    // https:启用 TLS + HTTP/2。注意:当 server.proxy 选项 也被使用时，将会仅使用 TLS。
    //   当为true:启用 TLS + HTTP/2。注意:当 server.proxy 选项 也被使用时，将会仅使用 TLS。
    //   这个值也可以是一个传递给 https.createServer() 的 选项对象https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener

    https: true,
    //在开发服务器启动时自动在浏览器中打开应用程序。
    // 设置打开的浏览器:设置环境变量 
    //process.env.BROWSER='firefox',
    // open其他配置:https://github.com/sindresorhus/open#app
    open: 'ie',

    //服务器代理
    proxy:
    {
      '/foo': 'http://localhost:4567',	//字符串简写写法
      '/api': { //以 ^ 开头，将会被解释为正则，如:'^/fallback/.*' 
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      '/socket.io': { //代理 websockets or socket.io
        target: 'ws://localhost:3000',
        ws: true
      }
    },
    // 为开发服务器配置 CORS。默认启用并允许任何源
    // 传递一个 选项对象 来调整行为，https://github.com/expressjs/cors#configuration-options
    // 设置false表示禁用   
    cors: true,
    // 依赖预构建
    // 设置为 true 强制使依赖预构建。
    force: true,
    // 热更新相关
    //   false禁用
    // hmr:
    //   {
    //     protocol?: string,  协议
    //     host?: string, 
    //     port?: number, 
    //     path?: string, 
    //     timeout?: number, 
    //     overlay?: boolean, 为 false 可以禁用开发服务器错误的屏蔽
    //     clientPort?: number, 只在客户端的情况下覆盖端口，这允许你为 websocket 提供不同的端口，而并非在客户端代码中查找。如果需要在 dev-server 情况下使用 SSL 代理，这非常有用。
    //     server?: Server, 当使用 server.middlewareMode 或 server.https 时，你需将 server.hmr.server 指定为你 HTTP(S) 的服务器，这将通过你的服务器来处理 HMR 的安全连接请求。这在使用自签证书或想通过网络在某端口暴露 Vite 的情况下，非常有用。
    //   }
    // middlewareMode:以中间件模式创建 Vite 服务器
    //   'ssr' | 'html'	在SSR中使用
    // fs.strict:限制为工作区 root 路径以外的文件的访问
    //   默认:true
    // fs.allow:限制哪些文件可以通过 /@fs/ 路径提供服务，Vite 将会搜索此根目录下潜在工作空间并作默认使用
    // fs.deny:用于限制 Vite 开发服务器提供敏感文件的黑名单。
    //   默认为 ['.env', '.env.*', '*.{pem,crt}']
    // watch:监听文件改变
    //   通过命令:vite build --watch
    //   {
    //     ignored: ['!**/node_modules/your-package-name/**']		默认会忽略对 .git/ 和 node_modules/ 目录的监听,如果需要对 node_modules/ 内的包进行监听，可以为 server.watch.ignored 赋值一个取反的 glob 模式
    //     其他选项:使用的是rollup的选项配置:https://rollupjs.org/guide/en/#watch-options
    //   }			
  }

})
