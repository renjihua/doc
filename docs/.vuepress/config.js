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
                    title: 'PPT',
                    collapsable: false,
                    children: [
                        ['https://docs.qq.com/slide/DY1B1YkJJaXNUc2Nt', 'js内存管理和垃圾回收机制.ppt']
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
