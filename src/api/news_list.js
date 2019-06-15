import axios from 'axios';

/**
 * 获取列表
 * @returns {*}
 */
export const getDataList = (pageData, searchConf) => {
    return axios.get('News/getList',{
        params: {
            'page':
            pageData.currentPage,
            'size':
            pageData.pageSize,
            'searchConf':
            searchConf,
        }
    })
}

export const saveData = (data) => {
    return axios.post('News/save', data)
}

export const change = (data) => {
    return axios.post('News/change', data)
}

export const deleteData = (data) => {
    return axios.post('News/delete', data)
}

