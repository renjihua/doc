module.exports = {
    title: '前端文档',
    description: '',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        nav: [
            { text: '文档', link: '/guide/eltable-dolayout' },
            { text: '工具', link: '/tools/my-gen-form' },
            { text: 'Edit Doc', link: 'https://github.com/renjihua/doc' }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '笔记',
                    collapsable: false,
                    children: [
                        ['eltable-dolayout', 'eltable dolayout'],
                        ['vif-key', 'v-if不加key的问题'],
                        ['echarts-map', 'ecahrts渲染地图案例'],
                    ]
                },
                {
                    title: '书签',
                    collapsable: false,
                    children: [
                        ['https://github.com/chenqf/frontEndBlog/issues/16', '高性能渲染十万条数据(虚拟列表)'],
                        ['https://github.com/chenqf/frontEndBlog/issues/15', '高性能渲染十万条数据(时间分片)'],
                        ['https://segmentfault.com/a/1190000012925872', '从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理'],
                        ['https://juejin.cn/post/6844903509331181575', 'Vue 2.x脱坑记 - 查漏补缺'],
                    ]
                }
            ],
            '/tools/': [
                {
                    title: '工具',
                    collapsable: false,
                    children: [
                        ['my-gen-form', '快速生成vue代码']
                    ]
                },
                {
                    title: '外部工具',
                    collapsable: false,
                    children: [
                        ['https://mrhj.gitee.io/form-generator/#/', 'Form Generator']
                    ]
                }
            ],
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    }
}
