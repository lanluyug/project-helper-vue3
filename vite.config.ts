import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/src/assets'
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
	// 开发服务器配置
	server: {
		host: '0.0.0.0', // 设置服务器监听的主机名或 IP 地址，默认为localhost
		port: 7999, // 设置服务器端口号
		open: true, // 自动打开浏览器
		cors: true, // 启用跨域支持
		// hmr: { overlay: false }, // 关闭热更新错误提示
		proxy: { // 代理配置
		  '/api': {
			target: 'http://192.168.1.5:8737',
			changeOrigin: true,
			secure: false,
			rewrite: (path) => path.replace('^/api', '')
		  }
		},
	  },
});
