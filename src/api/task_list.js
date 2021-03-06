import axios from 'axios';

/**
 * 获取列表
 * @returns {*}
 */
export const getDataList = (pageData, searchConf) => {
    return axios.get('Task/getList',{
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
    return axios.post('Task/save', data)
}

export const change = (data) => {
    return axios.post('Task/change', data)
}

export const deleteData = (data) => {
    return axios.post('Task/delete', data)
}

export const getSubmitDataList = (pageData, searchConf) => {
    return axios.get('UserTask/getList',{
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

export const saveUserTaskData = (data) => {
    return axios.post('UserTask/save', data)
}
