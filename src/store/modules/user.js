const user = {
    state: {
        apiAuth: ''
    },
    getters: {
        apiAuth: (state) => {
            return state.apiAuth || localStorage.getItem('apiAuth');
        }
    },
    mutations: {
        setApiAuth (state, token) {
            state.apiAuth = token;
            localStorage.setItem('apiAuth', token);
        },
        logout (state, vm) {
            sessionStorage.removeItem('access');
            state.apiAuth = '';
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;
