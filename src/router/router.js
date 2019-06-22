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
    component: () => import('@/views/error_page/403.vue')
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
            path: 'own',
            title: '个人中心',
            name: 'own_index',
            component: () => import('@/views/own/index.vue')
        },
        {
            path: 'request/:hash',
            title: '请求参数',
            name: 'interface_request',
            component: () => import('@/views/interface/request.vue')
        },
        {
            path: 'response/:hash',
            title: '返回参数',
            name: 'interface_response',
            component: () => import('@/views/interface/response.vue')
        },
        {
            path: 'response/:hash',
            title: '返回参数',
            name: 'interface_response',
            component: () => import('@/views/interface/response.vue')
        },
        {
            path: 'db_table_details/:tableName',
            title: '数据表配置',
            name: 'db_table_details',
            component: () => import('@/views/db_table/details.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/system',
    //     icon: 'ios-build',
    //     name: 'system',
    //     title: '系统配置',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'menu',
    //             icon: 'md-menu',
    //             name: 'menu',
    //             access: 'admin/Menu/index',
    //             title: '菜单维护',
    //             component: () => import('@/views/system/menu.vue')
    //
    //         },
    //         {
    //             path: 'user',
    //             icon: 'ios-people',
    //             name: 'user',
    //             access: 'admin/User/index',
    //             title: '用户管理',
    //             component: () => import('@/views/system/user.vue')
    //         },
    //         {
    //             path: 'auth',
    //             icon: 'md-warning',
    //             name: 'auth',
    //             access: 'admin/Auth/index',
    //             title: '权限管理',
    //             component: () => import('@/views/system/auth.vue')
    //         },
    //         {
    //             path: 'log',
    //             icon: 'md-list-box',
    //             name: 'log',
    //             access: 'admin/Log/index',
    //             title: '操作日志',
    //             component: () => import('@/views/system/log.vue')
    //         }
    //     ]
    // },
    // {
    //     path: "/app",
    //     icon: 'md-globe',
    //     name: "app",
    //     title: "应用接入",
    //     component: Main,
    //     children: [
    //         {
    //             path: "group",
    //             icon: 'logo-buffer',
    //             name: "app_group",
    //             access: 'admin/AppGroup/index',
    //             title: "应用分组",
    //             component: () => import('@/views/app/group.vue')
    //         },
    //         {
    //             path: "index",
    //             icon: "md-code-working",
    //             name: "app_index",
    //             access: 'admin/App/index',
    //             title: "应用列表",
    //             component: () => import('@/views/app/list.vue')
    //         }
    //     ]
    // },
    // {
    //     path: "/interface",
    //     icon: "md-cube",
    //     name: "interface",
    //     title: "接口管理",
    //     component: Main,
    //     children: [
    //         {
    //             path: "group",
    //             icon: "ios-folder-open",
    //             name: "interface_group",
    //             access: 'admin/InterfaceGroup/index',
    //             title: "接口分组",
    //             component: () => import('@/views/interface/group.vue')
    //         },
    //         {
    //             path: "list",
    //             icon: "ios-document-outline",
    //             name: "interface_list",
    //             access: 'admin/InterfaceList/index',
    //             title: "接口列表",
    //             component: () => import('@/views/interface/list.vue')
    //         }
    //     ]
    // },
    // {
    //     path: "/db_table",
    //     icon: "md-cube",
    //     name: "db_table",
    //     title: "数据库管理",
    //     component: Main,
    //     children: [
    //         {
    //             path: "db_table_list",
    //             icon: "ios-folder-open",
    //             name: "db_table_list",
    //             access: 'admin/DbTable/index',
    //             title: "数据库管理",
    //             component: () => import('@/views/db_table/list.vue')
    //         }
    //     ]
    // },
    {
        path: "/basic_conf",
        icon: "md-cube",
        name: "basic_conf",
        title: "基本配置",
        component: Main,
        children: [
            {
                path: "wechatqrcode_index",
                icon: "ios-folder-open",
                name: "wechatqrcode_index",
                access: 'admin/BasicConf/wechatQrCode',
                title: "一键分享海报",
                component: () => import('@/views/basic_conf/wechatqrcode/wechatqrcode_index.vue')
            },
            {
                path: "website_index",
                icon: "ios-folder-open",
                name: "website_index",
                access: 'admin/BasicConf/website',
                title: "网站配置",
                component: () => import('@/views/basic_conf/website/website_index.vue')
            },
            {
                path: "invite_index",
                icon: "ios-folder-open",
                name: "invite_index",
                access: 'admin/BasicConf/invite',
                title: "邀请技巧",
                component: () => import('@/views/basic_conf/invite/invite_index.vue')
            },
            {
                path: "customer_index",
                icon: "ios-folder-open",
                name: "customer_index",
                access: 'admin/BasicConf/customer',
                title: "联系客服",
                component: () => import('@/views/basic_conf/customer/customer_index.vue')
            }
        ]
    },
    {
        path: "/index",
        icon: "md-cube",
        name: "index",
        title: "首页管理",
        component: Main,
        children: [
            {
                path: "banner",
                icon: "ios-folder-open",
                name: "banner_list",
                access: 'admin/Banner/getList',
                title: "轮播图列表",
                component: () => import('@/views/index/banner/banner_list.vue')
            },
            {
                path: "link",
                icon: "ios-document-outline",
                name: "link_list",
                access: 'admin/Link/getList',
                title: "链接列表",
                component: () => import('@/views/index/link/link_list.vue')
            }
        ]
    },
    {
        path: "/user",
        icon: "md-cube",
        name: "user",
        title: "用户管理",
        component: Main,
        children: [
            {
                path: "user",
                icon: "ios-folder-open",
                name: "user_list",
                access: 'admin/UserCon/getList',
                title: "用户列表",
                component: () => import('@/views/user/user/user_list.vue')
            },
            {
                path: "user_income",
                icon: "ios-folder-open",
                name: "user_income_list",
                access: 'admin/UserIncome/getList',
                title: "用户收入列表",
                component: () => import('@/views/user/user_income/user_income_list.vue')
            },
            {
                path: "user_notice",
                icon: "ios-folder-open",
                name: "user_notice_list",
                access: 'admin/UserNotice/getList',
                title: "用户消息列表",
                component: () => import('@/views/user/user_notice/user_notice_list.vue')
            },
            {
                path: "user_task",
                icon: "ios-folder-open",
                name: "user_task_list",
                access: 'admin/UserTask/getList',
                title: "用户任务列表",
                component: () => import('@/views/user/user_task/user_task_list.vue')
            },
        ]
    },
    {
        path: "/withdraw",
        icon: "md-cube",
        name: "withdraw",
        title: "提现管理",
        component: Main,
        children: [
            {
                path: "withdraw",
                icon: "ios-folder-open",
                name: "withdraw_list",
                access: 'admin/Withdraw/getList',
                title: "提现列表",
                component: () => import('@/views/withdraw/withdraw/withdraw_list.vue')
            },
            {
                path: "withdraw_way",
                icon: "ios-folder-open",
                name: "withdraw_way_list",
                access: 'admin/Withdraw/getList',
                title: "提现方式列表",
                component: () => import('@/views/withdraw/withdraw_way/withdraw_way_list.vue')
            }
        ]
    },
    {
        path: "/commission",
        icon: "md-cube",
        name: "commission",
        title: "佣金管理",
        component: Main,
        children: [
            {
                path: "commission",
                icon: "ios-folder-open",
                name: "commission_list",
                access: 'admin/Commission/getList',
                title: "佣金列表",
                component: () => import('@/views/commission/commission/commission_list.vue')
            },
            {
                path: "commission_conf",
                icon: "ios-folder-open",
                name: "commission_conf_list",
                access: 'admin/CommissionConf/getList',
                title: "佣金配置",
                component: () => import('@/views/commission/commission_conf/commission_conf_list.vue')
            }
        ]
    },
    {
        path: "/task",
        icon: "md-cube",
        name: "task",
        title: "任务管理",
        component: Main,
        children: [
            {
                path: "task",
                icon: "ios-folder-open",
                name: "task_list",
                access: 'admin/Task/getList',
                title: "上架中任务列表",
                component: () => import('@/views/task/task/task_list.vue')
            },
            {
                path: "task",
                icon: "ios-folder-open",
                name: "task_list",
                access: 'admin/Task/getList',
                title: "已下架任务列表",
                component: () => import('@/views/task/task/task_list_down.vue')
            },
            {
                path: "task_type",
                icon: "ios-folder-open",
                name: "task_type_list",
                access: 'admin/TaskType/getList',
                title: "任务类型",
                component: () => import('@/views/task/task_type/task_type_list.vue')
            }
        ]
    },
    {
        path: "/news",
        icon: "md-cube",
        name: "news",
        title: "新闻管理",
        component: Main,
        children: [
            {
                path: "news",
                icon: "ios-folder-open",
                name: "news_list",
                access: 'admin/News/getList',
                title: "新闻列表",
                component: () => import('@/views/news/news/news_list.vue')
            },
            {
                path: "news_type",
                icon: "ios-folder-open",
                name: "news_type_list",
                access: 'admin/NewsType/getList',
                title: "新闻类型",
                component: () => import('@/views/news/news_type/news_type_list.vue')
            }
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // }
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
