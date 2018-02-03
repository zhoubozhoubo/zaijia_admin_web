import Cookies from 'js-cookie';

const user = {
    state: {
        userToken: ''
    },
    getters: {
        userToken: (state) => {
            return state.userToken || localStorage.getItem('userToken');
        }
    },
    mutations: {
        setUserToken (state, token) {
            state.userToken = token;
            localStorage.setItem('userToken', token);
        },
        logout (state, vm) {
            Cookies.remove('access');
            state.userToken = '';
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
