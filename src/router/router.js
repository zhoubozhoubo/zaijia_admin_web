import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error_page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error_403',
    component: () => import('@//views/error_page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: () => import('@/views/error_page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main_components/lock_screen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: {i18n: 'home'},
            name: 'home_index',
            component: () => import('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () => import('@/views/own_space/index.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        },
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/system',
        icon: 'wrench',
        name: 'system',
        title: '系统配置',
        component: Main,
        children: [
            {
                path: 'menu',
                icon: 'navicon-round',
                name: 'menu',
                title: '菜单维护',
                component: () => import('@/views/system/menu.vue')

            },
            {
                path: 'user',
                icon: 'ios-people',
                name: 'user',
                title: '用户管理',
                component: () => import('@/views/system/user.vue')
            },
            {
                path: 'image-editor',
                icon: 'locked',
                name: 'auth',
                title: '权限管理',
                component: () => import('@/views/system/auth.vue')
            },
            {
                path: 'log',
                icon: 'clipboard',
                name: 'log',
                title: '操作日志',
                component: () => import('@/views/error_page/404.vue')
            }
        ]
    },
    {
        path: "/app",
        icon: "android-cloud",
        name: "app",
        title: "应用接入",
        component: Main,
        children: [
            {
                path: "group",
                icon: "ios-box",
                name: "app_group",
                title: "应用分组",
                component: () => import('@/views/error_page/404.vue')
            },
            {
                path: "index",
                icon: "ios-list",
                name: "app_index",
                title: "应用列表",
                component: () => import('@/views/app/list.vue')
            }
        ]
    },
    {
        path: "/interface",
        icon: "navigate",
        name: "interface",
        title: "接口管理",
        component: Main,
        children: [
            {
                path: "group",
                icon: "folder",
                name: "interface_group",
                title: "接口分组",
                component: () => import('@/views/error_page/404.vue')
            },
            {
                path: "list",
                icon: "document",
                name: "interface_list",
                title: "接口列表",
                component: () => import('@/views/interface/list.vue')
            }
        ]
    },
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            {
                path: 'index',
                title: '权限管理',
                name: 'access_index',
                component: () => import('@/views/access/access.vue')
            }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            {
                path: 'index',
                title: '权限测试页',
                name: 'accesstest_index',
                access: 0,
                component: () => import('@/views/access/access-test.vue')
            }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            {
                path: 'index',
                title: {i18n: 'international'},
                name: 'international_index',
                component: () => import('@/views/international/international.vue')
            }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [
            {
                path: 'mutative-router',
                title: '动态路由',
                name: 'mutative-router',
                icon: 'link',
                component: () => import('@/views/advanced-router/mutative-router.vue')
            },
            {
                path: 'argument-page',
                title: '带参页面',
                name: 'argument-page',
                icon: 'android-send',
                component: () => import('@/views/advanced-router/argument-page.vue')
            }
        ]
    },
    {
        path: '/error_page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            {
                path: 'index',
                title: '错误页面',
                name: 'errorpage_index',
                component: () => import('@/views/error_page/index.vue')
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
