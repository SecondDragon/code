export default [{ // 权限管理 后台一一对应的
        path: 'lesson-manager',
        component: () => import('@/views/other/lesson-manager.vue'),
        meta: {
            auth: 'lesson'
        }
    },
    {
        path: 'student-manager',
        component: () => import('@/views/other/student-manager.vue'),
        meta: {
            auth: 'student'
        }
    },
    {
        path: 'points',
        component: () => import('@/views/other/points.vue'),
        meta: {
            auth: 'points'
        }
    }, {
        path: 'collect',
        component: () => import('@/views/other/collect.vue'),
        meta: {
            auth: 'collect'
        }
    }
]