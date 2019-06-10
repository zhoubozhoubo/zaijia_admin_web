import axios from 'axios';

/**
 * 获取数据库表
 * @returns {*}
 */
export const getTableList = () => {
  return axios.get('DbTable/getTableList',{
    params: {}
  })
}

/**
 * 获取数据表所有字段
 * @returns {*}
 */
export const getTableFullFields = (name) => {
    return axios.get('DbTable/getTableFullFields',{
        params: {
            'name': name
        }
    })
}

/**
 * 一键生成
 * @param baseConfig
 * @param searchData
 * @param columnsData
 * @param formData
 * @param componentsData
 * @returns {*}
 */
export const oneTouch = (tableName, baseConfig, searchData, searchComponentsData, columnsData, tableComponentsData, formData, showData, componentsData, requiredRuleData, fileList) => {
    return axios.post('DbTable/index',{
        data: {
            'tableName': tableName,
            'baseConfig': baseConfig,
            'searchData': searchData,
            'searchComponentsData': searchComponentsData,
            'columnsData': columnsData,
            'tableComponentsData': tableComponentsData,
            'formData': formData,
            'showData': showData,
            'componentsData': componentsData,
            'requiredRuleData': requiredRuleData,
            'fileList': fileList
        }
    })
}
