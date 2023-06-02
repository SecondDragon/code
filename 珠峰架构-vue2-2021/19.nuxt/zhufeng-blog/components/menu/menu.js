export default {
    home: { // 默认访问admin的菜单
        name: '首页',
        path: '/admin',
        icon: 'el-icon-menu'
    },
    content: { // 内容相关的
        name: '内容管理',
        path:'',
        children: [{
                name: '文章列表',
                path: '/admin/article/list',
                icon: 'el-icon-menu'
            },
            {
                name: '文章添加',
                path: '/admin/article/add',
                icon: 'el-icon-menu'
            }
        ]
    }
}