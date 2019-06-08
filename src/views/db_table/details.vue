<template>
  <div>
    <!--表格-->
    <Row>
      <Col span="24">
        <Card>
          <p slot="title" style="height: 32px">
            <Button type="info" @click="goBack" icon="md-arrow-round-back">{{tableName}}表配置</Button>
            <Button type="success" @click="oneTouch" icon="md-create" style="margin-left: 20px;">一键生成</Button>
          </p>
          <Row style="margin-bottom: 16px;">
            <Col span="2">
              <p style="line-height: 32px; text-align: right;">表名称:</p>
            </Col>
            <Col span="22">
              <p style="line-height: 32px; margin-left: 15px">{{tableName}}</p>
            </Col>
          </Row>
          <Row style="margin-bottom: 16px;">
            <Col span="2">
              <p style="line-height: 32px; text-align: right;">表主键:</p>
            </Col>
            <Col span="22">
              <Select v-model="baseConfig.pk" clearable placeholder='请选择表主键' style="width: 150px; margin-left: 15px;">
                <Option v-for="(item, Index) in tableData" :key="Index" :value="item.Field">{{item.Field}}</Option>
              </Select>
              <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                <span v-if="baseConfig.pk" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 表主键</span>
                <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 表主键</span>
              </p>
            </Col>
          </Row>
          <Row style="margin-bottom: 16px;">
            <Col span="2">
              <p style="line-height: 32px; text-align: right;">操作:</p>
            </Col>
            <Col span="22" style="line-height: 32px;">
              <i-switch style="margin-left: 15px;" size="large" v-model="baseConfig.add">
                <span slot="open">新增</span>
                <span slot="close">新增</span>
              </i-switch>
              <i-switch style="margin-left: 15px;" size="large" v-model="baseConfig.edit">
                <span slot="open">编辑</span>
                <span slot="close">编辑</span>
              </i-switch>
              <i-switch style="margin-left: 15px;" size="large" v-model="baseConfig.delete">
                <span slot="open">删除</span>
                <span slot="close">删除</span>
              </i-switch>
            </Col>
          </Row>
          <Row style="margin-bottom: 16px;">
            <Col span="2">
              <p style="line-height: 32px; text-align: right;">后端文件配置:</p>
            </Col>
            <Col span="22">
              <Input style="width: 150px; margin-left: 15px;" v-model="baseConfig.backControllerName" clearable placeholder="请输入后端控制器名称"></Input>
              <Input style="width: 150px; margin-left: 15px;" v-model="baseConfig.backModelName" clearable placeholder="请输入后端模型名称"></Input>
              <div>
                <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                  <span v-if="baseConfig.backControllerName.trim()" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 后端控制器名称</span>
                  <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 后端控制器名称</span>
                </p>
                <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                  <span v-if="baseConfig.backModelName.trim()" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 后端模型名称</span>
                  <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 后端模型名称</span>
                </p>
              </div>
            </Col>
          </Row>
          <Row style="margin-bottom: 16px;">
            <Col span="2">
              <p style="line-height: 32px; text-align: right;">前端文件配置:</p>
            </Col>
            <Col span="22">
              <Input style="width: 150px; margin-left: 15px;" v-model="baseConfig.frontModelName" clearable placeholder="请输入前端文件模块名称"></Input>
              <Input style="width: 150px; margin-left: 15px;" v-model="baseConfig.frontGroupName" clearable placeholder="请输入前端文件组名称"></Input>
              <Input style="width: 150px; margin-left: 15px;" v-model="baseConfig.frontFileName" clearable placeholder="请输入前端vue文件名称"></Input>
              <div>
                <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                  <span v-if="baseConfig.frontModelName.trim()" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 前端文件模块名称</span>
                  <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 前端文件模块名称</span>
                </p>
                <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                  <span v-if="baseConfig.frontGroupName.trim()" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 前端文件组名称</span>
                  <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 前端文件组名称</span>
                </p>
                <p style="display: inline-block; width: 150px; margin: 5px 0 0 15px; font-size: 12px; color: #ed4014;">
                  <span v-if="baseConfig.frontFileName.trim()" style="color: #515a6e;"><Icon type="ios-alert-outline" size="12"/> 前端vue文件名称</span>
                  <span v-else style="color: #ed4014;"><Icon type="ios-alert-outline" size="12"/> 前端vue文件名称</span>
                </p>
              </div>
            </Col>
          </Row>
          <div>
            <Table :loading="tableLoading" :columns="columnsList" :data="tableData" border disabled-hover></Table>
          </div>
        </Card>
      </Col>
    </Row>
    <!--验证消息表单-->
    <Modal :closable="closAble" :mask-closable="maskClosable" v-model="modalMessage.show" width="668" :styles="{top: '30px'}">
      <p slot="header" style="color:#2d8cf0;">
        <Icon type="md-information-circle"></Icon>
        <span>{{messageForm.field}} > 验证消息</span>
      </p>
      <Form ref="myForm" :rules="ruleValidate" :model="messageForm" :label-width="80">
        <FormItem label="提示消息" prop="msg">
          <Input v-model="messageForm.msg" placeholder="请输入提示消息"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelMsg(messageForm.index)" style="margin-right: 8px">取消</Button>
        <Button type="primary" @click="submitMsg(messageForm.index)" :loading="modalMessage.loading">确定</Button>
      </div>
    </Modal>
    <!--重新生成文件弹窗-->
    <Modal :closable="closAble" :mask-closable="maskClosable" v-model="modalSetting.show" width="668" :styles="{top: '30px'}">
      <p slot="header" style="color:#2d8cf0;">
        <Icon type="md-information-circle"></Icon>
        <span>文件生成结果</span>
      </p>
      <Row>
        <Col span="24">
          <p style="margin-bottom: 10px;">请勾选要重新生成的文件（<span style="color: #19be6b;">绿色</span>表示<span style="color: #19be6b;">生成成功</span>；<span style="color: #ed4014;">红色</span>表示<span style="color: #ed4014;">生成失败</span>或<span style="color: #ed4014;">文件已存在</span>）</p>
        </Col>
        <Col span="6" v-for="(file, fileIndex) in fileList" :key="fileIndex">
          <Checkbox v-if="file.create === 1" disabled><span style="color: #19be6b;">{{file.name}}</span></Checkbox>
          <Checkbox v-else v-model="file.forceWrite"><span style="color: #ed4014;">{{file.name}}</span></Checkbox>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
        <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<Input v-model="value" placeholder="Enter something..." style="width: 300px" />
<script>
  import {getTableFullFields, oneTouch} from '@/api/db'

  // 作为搜索
  const searchCheckbox = (vm, h, currentRow, index) => {
    return h('Checkbox', {
      props: {
        value: false,
        size: 'large'
      },
      style: {
        margin: '5px 0'
      },
      on: {
        'on-change': (res) => {
          if (res === true) {
            vm.selectCheckbox(vm.searchData, index, currentRow.Field)
          } else {
            vm.cancelCheckbox(vm.searchData, index)
          }
        }
      }
    })
  }

  // 搜索名称
  const searchInput = (vm, h, currentRow, index) => {
    if (!vm.searchData[index].key) {
      return h('Input', {
        props: {
          value: '',
          size: 'default',
          disabled: true
        }
      })
    } else {
      return h('Input', {
        props: {
          value: vm.searchData[index].name,
          size: 'default',
          clearable: true,
          disabled: false
        },
        on: {
          input: (val) => {
            vm.fillInput(vm.searchData, index, val)
          }
        }
      })
    }
  }

  // 搜索组件类型
  const searchComponentsTypeSelect = (vm, h, currentRow, index) => {
    if (!vm.searchData[index].key) {
      return h('Select', {
        props: {
          value: ' ',
          clearable: true,
          size: 'large',
          disabled: true
        }
      }, vm.searchSelectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    } else {
      return h('Select', {
        props: {
          value: vm.searchComponentsData[index].name,
          clearable: true,
          size: 'large'
        },
        on: {
          'on-change': (val) => {
            if(val){
              vm.selectSelect(vm.searchComponentsData, index, currentRow.Field, val)
            }else{
              vm.canCelSelect(vm.searchComponentsData, index)
            }
          }
        }
      }, vm.searchSelectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    }
  }

  // 作为表格列
  const columnsCheckbox = (vm, h, currentRow, index) => {
    return h('Checkbox', {
      props: {
        value: false,
        size: 'large'
      },
      style: {
        margin: '5px 0'
      },
      on: {
        'on-change': (res) => {
          if (res === true) {
            vm.selectCheckbox(vm.columnsData, index, currentRow.Field)
          } else {
            vm.cancelCheckbox(vm.columnsData, index)
          }
        }
      }
    })
  }

  // 表格列名称
  const nameInput = (vm, h, currentRow, index) => {
    if (!vm.columnsData[index].key) {
      return h('Input', {
        props: {
          value: '',
          size: 'default',
          disabled: true
        }
      })
    } else {
      return h('Input', {
        props: {
          value: vm.columnsData[index].name,
          size: 'default',
          clearable: true,
          disabled: false
        },
        on: {
          input: (val) => {
            vm.fillInput(vm.columnsData, index, val)
          }
        }
      })
    }
  }

  // 表格组件类型
  const tableComponentsTypeSelect = (vm, h, currentRow, index) => {
    if (!vm.columnsData[index].key) {
      return h('Select', {
        props: {
          value: ' ',
          clearable: true,
          size: 'large',
          disabled: true
        }
      }, vm.tableSelectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    } else {
      return h('Select', {
        props: {
          value: vm.tableComponentsData[index].name,
          clearable: true,
          size: 'large'
        },
        on: {
          'on-change': (val) => {
            if(val){
              vm.selectSelect(vm.tableComponentsData, index, currentRow.Field, val)
            }else{
              vm.canCelSelect(vm.tableComponentsData, index)
            }
          }
        }
      }, vm.tableSelectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    }
  }

  // 作为表单元素
  const formItemCheckbox = (vm, h, currentRow, index) => {
    return h('Checkbox', {
      props: {
        value: false,
        size: 'large'
      },
      style: {
        margin: '5px 0'
      },
      on: {
        'on-change': (res) => {
          if (res === true) {
            vm.selectCheckbox(vm.formData, index, currentRow.Field)
          } else {
            vm.cancelCheckbox(vm.formData, index)
          }
        }
      }
    })
  }

  // 表单元素名称
  const itemInput = (vm, h, currentRow, index) => {
    if (!vm.formData[index].key) {
      return h('Input', {
        props: {
          value: '',
          size: 'default',
          disabled: true
        }
      })
    } else {
      return h('Input', {
        props: {
          value: vm.formData[index].name,
          size: 'default',
          clearable: true,
          disabled: false
        },
        on: {
          input: (val) => {
            vm.fillInput(vm.formData, index, val)
          }
        }
      })
    }
  }

  // 表单中显示
  const showItemCheckbox = (vm, h, currentRow, index) => {
    if (!vm.formData[index].key) {
      return h('Checkbox', {
        props: {
          value: vm.showData[index].show !== '',
          size: 'large',
          disabled: true
        },
        style: {
          margin: '5px 0'
        }
      })
    } else {
      return h('Checkbox', {
        props: {
          value: vm.showData[index].show,
          size: 'large',
          disabled: false
        },
        style: {
          margin: '5px 0'
        },
        on: {
          'on-change': (res) => {
            if (res === true) {
              vm.selectShowCheckbox(vm.showData, index, currentRow.Field)
            } else {
              vm.cancelShowCheckbox(vm.showData, index, currentRow.Field)
            }
          }
        }
      })
    }
  }

  // 表单组件类型
  const componentsTypeSelect = (vm, h, currentRow, index) => {
    if (!vm.showData[index].show) {
      return h('Select', {
        props: {
          value: ' ',
          clearable: true,
          size: 'large',
          disabled: true
        }
      }, vm.selectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    } else {
      return h('Select', {
        props: {
          value: vm.componentsData[index].name,
          clearable: true,
          size: 'large'
        },
        on: {
          'on-change': (val) => {
            if(val){
              vm.selectSelect(vm.componentsData, index, currentRow.Field, val)
            }else{
              vm.canCelSelect(vm.componentsData, index)
            }
          }
        }
      }, vm.selectList.map((item) => {
        return h('Option', {
          props: {
            value: item.value,
            label: item.name
          }
        })
      }))
    }
  }

  // 表单字段验证规则
  // 必填项
  const requiredRuleTag = (vm, h, currentRow, index) => {
    if (!vm.showData[index].show) {
      return h('Tag', {
        attrs: {
          color: 'success',
          checked: false
        }
      }, '必填')
    } else {
      if(!vm.requiredRuleData[index].required){
        return h('Tag', {
          attrs: {
            color: 'success',
            checkable: true,
            checked: false
          },
          on: {
            'on-change': (val) => {
              console.log(val)
              if(val){
                vm.selectRequiredTag(vm.requiredRuleData, index, currentRow.Field)
              }else{
                vm.canCelRequiredTag(vm.requiredRuleData, index)
              }
            }
          }
        }, '必填')
      } else {
        return h('Tag', {
          attrs: {
            color: 'success',
            checkable: true,
            checked: true
          },
          on: {
            'on-change': (val) => {
              console.log(val)
              if(val){
                vm.selectRequiredTag(vm.requiredRuleData, index, currentRow.Field)
              }else{
                vm.canCelRequiredTag(vm.requiredRuleData, index)
              }
            }
          }
        }, '必填')
      }
    }
  }
  // 数字类型
  // const numberTypeRuleTag = (vm, h, currentRow, index) => {
  //   if (!vm.showData[index].show) {
  //     return h('Tag', {
  //       attrs: {
  //         color: 'success',
  //         checked: false
  //       }
  //     }, '数字')
  //   } else {
  //     return h('Tag', {
  //       attrs: {
  //         color: 'success',
  //         checkable: true,
  //         checked: true
  //       }
  //     }, '数字')
  //   }
  // }

  export default {
    name: "db_details",
    components: {
    },
    data() {
      return {
        // 表名称
        tableName: '',
        // 初始化表格
        columnsList: [
          {
            title: '序号',
            align: 'center',
            width: 65,
            type: 'index',
            fixed: 'left'
          },
          {
            title: '字段名称',
            align: 'left',
            width: 150,
            key: 'Field',
            fixed: 'left'
          },
          {
            title: '字段类型',
            align: 'left',
            width: 150,
            key: 'Type',
            fixed: 'left'
          },
          {
            title: '注释',
            align: 'left',
            width: 150,
            key: 'Comment',
            tooltip: true,
            fixed: 'left'
          },
          {
            title: '作为搜索',
            align: 'center',
            width: 100,
            key: 'Search'

          },
          {
            title: '搜索名称',
            align: 'left',
            width: 150,
            key: 'SearchName'
          },
          {
            title: '搜索组件类型',
            align: 'center',
            width: 200,
            key: 'SearchComponentsType'

          },
          {
            title: '作为表格列',
            align: 'center',
            width: 100,
            key: 'Columns'

          },
          {
            title: '显示名称',
            align: 'left',
            width: 150,
            key: 'Name'
          },
          {
            title: '表格组件类型',
            align: 'center',
            width: 200,
            key: 'TableComponentsType'

          },
          {
            title: '表单元素',
            align: 'center',
            width: 100,
            key: 'FormItem'

          },
          {
            title: '表单元素名称',
            align: 'left',
            width: 150,
            key: 'ItemName'
          },
          {
            title: '表单中显示',
            align: 'center',
            width: 100,
            key: 'ShowItem'

          },
          {
            title: '表单组件类型',
            align: 'center',
            width: 200,
            key: 'ComponentsType'

          },
          {
            title: '验证规则',
            align: 'left',
            width: 200,
            key: 'RuleValidate'

          }
        ],
        // 表格加载状态
        tableLoading: false,
        // 表格数据
        tableData: [],
        // 搜索组件类型下拉列表
        searchSelectList: [
          {
            value: 'shuRuKuang',
            name: 'Input 输入框'
          },
          {
            value: 'Select',
            name: 'Select 选择器'
          },
          {
            value: 'DatePicker',
            name: 'DatePicker 日期选择器'
          },
          {
            value: 'DateRangePicker',
            name: 'DatePicker 日期范围选择器'
          }
          // {
          //   value: 'TimePicker',
          //   name: 'TimePicker 时间选择器'
          // },
          // {
          //   value: 'TimeRangePicker',
          //   name: 'TimePicker 时间范围选择器'
          // }
        ],
        // 表格组件类型下拉列表
        tableSelectList: [
          {
            value: 'Img',
            name: 'Img 图片'
          },
          {
            value: 'Tag',
            name: 'Tag 标签'
          },
          {
            value: 'Switch',
            name: 'Switch 开关'
          }
        ],
        // 表单组件类型下拉列表
        selectList: [
          {
            value: 'shuRuKuang',
            name: 'Input 输入框'
          },
          {
            value: 'Radio',
            name: 'Radio 单选框'
          },
          {
            value: 'Checkbox',
            name: 'Checkbox 多选框'
          },
          {
            value: 'Switch',
            name: 'Switch 开关'
          },
          {
            value: 'Select',
            name: 'Select 选择器'
          },
          {
            value: 'Slider',
            name: 'Slider 滑块'
          },
          {
            value: 'DatePicker',
            name: 'DatePicker 日期选择器'
          },
          {
            value: 'TimePicker',
            name: 'TimePicker 时间选择器'
          },
          {
            value: 'InputNumber',
            name: 'InputNumber 数字输入框'
          },
          {
            value: 'UploadImg',
            name: 'UploadImg 上传图片'
          },
          {
            value: 'TextArea',
            name: 'TextArea 富文本'
          }
          // {
          //   value: 'Rate',
          //   name: 'Rate 评分'
          // }
        ],
        // 基本配置
        baseConfig: {
          // 表主键
          pk: '',
          // 新增操作
          add: true,
          // 编辑操作
          edit: true,
          // 删除操作
          delete: true,
          // 后端控制器名称
          backControllerName: '',
          // 后端模型名称
          backModelName: '',
          // 前端文件模块名称
          frontModelName: '',
          // 前端文件组名称
          frontGroupName: '',
          // 前端文件名称
          frontFileName: '',
        },
        // 可搜索列数据
        searchData: [],
        // 搜索组件数据
        searchComponentsData: [],
        // 表格列数据
        columnsData: [],
        // 表格组件数据
        tableComponentsData: [],
        // 表单元素数据
        formData: [],
        // 表单显示数据
        showData: [],
        // 表单组件数据
        componentsData: [],
        // 表单过滤规则
        // 必填数据
        requiredRuleData: [],
        // 初始化重新生成文件弹出框
        modalSetting: {
          show: false,
          loading: false
        },
        closAble: false,
        maskClosable: false,
        fileList: [],
        // 验证消息弹出框
        modalMessage: {
          show: false,
          loading: false
        },
        // 验证消息表单
        messageForm: {
          index: '',
          msg: ''
        },
        // 表单验证规则
        ruleValidate: {
          msg: [
            { required: true, message: '提示消息不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.tableName = this.$route.params.tableName
      this.init()
      this.getList()
    },
    // activated () {
    //   this.tableName = this.$route.params.tableName
    //   this.init()
    //   this.getList()
    // },
    methods: {
      // 初始化页面
      init() {
        let vm = this

        // 初始化默认文件配置
        this.baseConfig.backControllerName = this.camelCase(this.tableName) + 'Con'
        this.baseConfig.backModelName = this.camelCase(this.tableName)
        this.baseConfig.frontModelName = this.tableName
        this.baseConfig.frontGroupName = this.tableName
        this.baseConfig.frontFileName = this.tableName

        // 初始化表格显示
        this.columnsList.forEach(item => {
          // 作为搜索列
          if (item.key === 'Search') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                searchCheckbox(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 搜索名称列
          if (item.key === 'SearchName') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                searchInput(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 搜索组件类型列
          if (item.key === 'SearchComponentsType') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                searchComponentsTypeSelect(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 作为表格列
          if (item.key === 'Columns') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                columnsCheckbox(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 显示名称列
          if (item.key === 'Name') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                nameInput(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 表格组件类型列
          if (item.key === 'TableComponentsType') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                tableComponentsTypeSelect(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 作为表单元素列
          if (item.key === 'FormItem') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                formItemCheckbox(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 表单元素名称列
          if (item.key === 'ItemName') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                itemInput(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 表单中显示列
          if (item.key === 'ShowItem') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                showItemCheckbox(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 表单组件类型列
          if (item.key === 'ComponentsType') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                componentsTypeSelect(vm, h, currentRowData, param.index)
              ])
            }
          }
          // 表单字段验证规则列
          if (item.key === 'RuleValidate') {
            item.render = (h, param) => {
              let currentRowData = vm.tableData[param.index]
              return h('div', [
                // 必填规则
                requiredRuleTag(vm, h, currentRowData, param.index)
                // numberTypeRuleTag(vm, h, currentRowData, param.index)
              ])
            }
          }
        })
      },
      // 返回上一页
      goBack () {
        this.$router.go(-1)
      },
      // 数据检测
      checkData() {
        if (!this.baseConfig['pk'].trim() ||
          !this.baseConfig['backControllerName'].trim() ||
          !this.baseConfig['backModelName'].trim() ||
          !this.baseConfig['frontModelName'].trim() ||
          !this.baseConfig['frontGroupName'].trim() ||
          !this.baseConfig['frontFileName'].trim()
        ) {
          this.$Message.error('请检查配置信息')
          return 0
        }
        return 1
      },
      // 一键生成
      oneTouch () {
        // 生成前数据检测
        if (!this.checkData()) {
          return
        }
        //一键生成
        oneTouch(this.tableName, this.baseConfig, this.searchData, this.searchComponentsData, this.columnsData, this.tableComponentsData, this.formData, this.showData, this.componentsData, this.requiredRuleData, this.fileList).then(res=>{
          if (res.data.code === 1) {
            // 生成成功
            this.$Message.success('生成成功')
          } else if (res.data.code === 0) {
            // 生成失败
            this.$Message.error(res.data.msg)
            this.modalSetting.show = true
            this.fileList = res.data.data
          }
        })
      },
      // 获取列表数据
      getList() {
        this.tableLoading = true
        getTableFullFields(this.tableName).then(res => {
          this.tableLoading = false
          this.tableData = res.data.data
          // 初始化数据
          for (let i = 0; i < this.tableData.length; i++) {
            // 初始化表主键
            if (this.tableData[i]['Key'] === "PRI") {
              this.baseConfig.pk = this.tableData[i]['Field']
            }
            // 初始化搜索数据
            this.searchData[i] = {
              key: '',
              name: ''
            }
            // 初始化搜索组件数据
            this.searchComponentsData[i] = {
              key: '',
              name: ''
            }
            // 初始化表格列数据
            this.columnsData[i] = {
              key: '',
              name: ''
            }
            // 初始化表单元素数据
            this.formData[i] = {
              key: '',
              name: ''
            }
            // 初始化表格组件数据
            this.tableComponentsData[i] = {
              key: '',
              name: ''
            }
            // 初始化表单显示数据
            this.showData[i] = {
              key: '',
              show: ''
            }
            // 初始化表单组件数据
            this.componentsData[i] = {
              key: '',
              name: ''
            }
            // 初始化必填数据
            this.requiredRuleData[i] = {
              key: '',
              required: '',
              msg: ''
            }
          }
        })
      },
      // 选择复选框
      selectCheckbox(list, index, field) {
        this.$set(list, index, {
          key: field,
          name: this.tableData[index].Comment
        })
        if(list === this.formData){
          this.$set(this.showData, index, {
            key: field,
            show: false
          })
          this.$set(this.requiredRuleData, index, {
            key: field,
            required: false,
            msg: ''
          })
        }
      },
      // 取消复选框
      cancelCheckbox(list, index) {
        this.$set(list, index, {
          key: '',
          name: ''
        })
        if(list === this.formData){
          this.$set(this.componentsData, index, {
            key: '',
            name: ''
          })
          this.$set(this.showData, index, {
            key: '',
            show: ''
          })
        }
        if(list === this.searchData){
          this.$set(this.searchComponentsData, index, {
            key: '',
            name: ''
          })
        }
        if(list === this.columnsData){
          this.$set(this.tableComponentsData, index, {
            key: '',
            name: ''
          })
        }
      },
      // 选择菜单显示复选框
      selectShowCheckbox(list, index, field) {
        this.$set(list, index, {
          key: field,
          show: true
        })
        if(list === this.showData){
          this.$set(this.requiredRuleData, index, {
            key: field,
            required: true,
            msg: ''
          })
          this.messageForm.index = index
          this.messageForm.field = field
          this.modalMessage.show = true
        }
      },
      // 取消菜单显示复选框
      cancelShowCheckbox(list, index, field) {
        this.$set(list, index, {
          key: field,
          show: false
        })
        if(list === this.showData){
          this.$set(this.componentsData, index, {
            key: '',
            name: ''
          })
          this.$set(this.requiredRuleData, index, {
            key: field,
            required: false,
            msg: ''
          })
        }
      },
      // 输入框
      fillInput(list, index, val) {
        list[index].name = val
      },
      // 选择组件类型
      selectSelect(list, index, field, val) {
        list[index] = {
          key: field,
          name: val
        }
      },
      // 取消组件类型
      canCelSelect(list, index) {
        list[index] = {
          key: '',
          name: ''
        }
      },
      // 选择必填规则
      selectRequiredTag(list, index, field) {
        this.$set(list, index, {
          key: field,
          required: true,
          msg: ''
        })
        this.messageForm.index = index
        this.messageForm.field = field
        this.modalMessage.show = true
      },
      // 取消必填规则
      canCelRequiredTag(list, index) {
        this.$set(list, index, {
          key: '',
          required: '',
          msg: ''
        })
      },
      // 表单取消
      cancel () {
        this.modalSetting.show = false
        this.fileList = []
      },
      // 提交表单
      submit () {
        oneTouch(this.tableName, this.baseConfig, this.searchData, this.searchComponentsData, this.columnsData, this.tableComponentsData, this.formData, this.showData, this.componentsData, this.requiredRuleData, this.fileList).then(res=>{
          if (res.data.code === 1) {
            // 生成成功
            this.$Message.success('生成成功')
            this.modalSetting.show = false
            this.fileList = []
          } else if (res.data.code === 0) {
            // 生成失败
            this.$Message.error(res.data.msg)
            this.modalSetting.show = true
            this.fileList = res.data.data
          } else if (res.data.code === -2) {
            this.$Message.error(res.data.msg)
          }
        })
      },
      // Msg表单取消
      cancelMsg (index) {
        this.modalMessage.show = false
        this.$set(this.requiredRuleData, index, {
          key: '',
          required: '',
          msg: ''
        })
      },
      // 提交Msg表单
      submitMsg (index) {
        let vm = this;
        this.$refs['myForm'].validate((valid) => {
          if (valid) {
            vm.requiredRuleData[index].msg = vm.messageForm.msg
            vm.messageForm.msg = ''
            vm.modalMessage.show = false
          }
        })
      },
      // 下划线转驼峰
      camelCase(string) {
        string = string.replace( /_([a-z])/g, function( all, letter ) {
          return letter.toUpperCase()
        })
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    }
  }
</script>

<style scoped>

</style>
