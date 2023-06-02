export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: { // seo优化
        title: 'zhufeng-blog',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'element-ui/lib/theme-chalk/index.css', // 使用全局样式
        '@/assets/reset.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/element-ui', // 使用插件
        '@/plugins/axios'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios   - axios  同构 支持客户端和服务端
        '@nuxtjs/axios', // context
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources', // 使用自动注入功能
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt' // app
    ],
    styleResources: {
        scss: [
            '@/assets/_var.scss'
        ]
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    },
    router:{
      middleware:'auth'
    },
    proxy:{ // 内置代理功能
        '/api/':{
            target:'http://localhost:7001/'
        }
    }
}