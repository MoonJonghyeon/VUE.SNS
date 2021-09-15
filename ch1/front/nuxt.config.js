module.exports = {
    head: {
            title: 'NodeBird',
            meta: [{
                charset: 'utf-8'
            }, {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, minimus-scale=1.0, maximun-scale=1.0, user-scalabe=yes, viewport-fit=cover'
            }, {
                'http-equiv' : 'X-UA-Compatible', content: 'ID=edge'
            }, {
                hid: 'desc', name: 'description', content: 'Moon SNS',
              }, {
                hid: 'ogtitle', name: 'og:title', content: 'NodeBird',
              }, {
                hid: 'ogdesc', name: 'og:description', content: 'Moon SNS',
              }, {
                hid: 'ogtype', property: 'og:type', content: 'website',
              }, {
                hid: 'ogimage', property: 'og:image', content: 'https://vue.nodebird.com/vue-nodebird.png',
              }, {
                hid: 'ogurl', property: 'og:url', content: 'https://vue.nodebird.com',
              }],
              link: [{ rel: 'shortcut icon', href: '/d0abc6fe74e616536cf07626699bbc707154249a3890514a43687a85e6b6cc82.png' }]
    },
    modules: [
        '@nuxtjs/axios',
    ],
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment'
    ],
    moment: {
        locales: ['ko']
    },
    build: {
        analyze: false,
        extend(config, {isServer, isClient, isDev}) {
            if (isServer && !isDev) {
                config.devtool = 'hidden-source-map'
            }
            console.log('webpack', config, isServer, isClient)
        }
    },
    Plugin: [],
    vuetify: {
        
    },
    axios: {
        browserBaseURL: "http://localhost:3085",
        baseURL: "http://localhost:3085",
        https: false,
    },
    server: {
        port: 3080,
    }
};