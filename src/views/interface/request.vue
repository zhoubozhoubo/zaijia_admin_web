<style lang="less" scoped>
    @import './list.less';
</style>
<template>
    <div>
        <Row>
            <Col span="24">
            <Card>
                <p slot="title" style="height: 32px">
                    <Button type="primary" @click="alertAdd" icon="plus-round">新增</Button>
                </p>
                <div>
                    <Table :columns="columnsList" :data="tableData" border disabled-hover></Table>
                </div>
                <div class="margin-top-15" style="text-align: center">
                    <Page :total="tableShow.listCount" :current="tableShow.currentPage"
                          :page-size="tableShow.pageSize" @on-change="changePage"
                          @on-page-size-change="changeSize" show-elevator show-sizer show-total></Page>
                </div>
            </Card>
            </Col>
        </Row>
        <Modal v-model="modalSetting.show" width="668" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="information-circled"></Icon>
                <span>{{formItem.id ? '编辑' : '新增'}}接口</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                <FormItem label="接口名称" prop="info">
                    <Input v-model="formItem.info" placeholder="请输入接口名称"></Input>
                </FormItem>
                <FormItem label="真实类库" prop="apiClass">
                    <Input v-model="formItem.apiClass" placeholder="请输入真实类库"></Input>
                </FormItem>
                <FormItem label="接口分组" prop="groupHash">
                    <Select v-model="formItem.groupHash" style="width:200px">
                        <Option value="default" key="default"> 默认分组 </Option>
                        <Option :value="1" :key="1"> 验证Token </Option>
                    </Select>
                </FormItem>
                <FormItem label="请求方式" prop="method">
                    <Select v-model="formItem.method" style="width:200px">
                        <Option :value="0" :key="0"> 不限 </Option>
                        <Option :value="1" :key="1"> POST </Option>
                        <Option :value="2" :key="2"> GET </Option>
                    </Select>
                </FormItem>
                <FormItem label="接口映射" prop="hash">
                    <Input style="width: 300px" disabled v-model="formItem.hash"></Input>
                    <Badge count="系统自动生成，不允许修改" style="margin-left:5px"></Badge>
                </FormItem>
                <FormItem label="AccessToken" prop="accessToken">
                    <Select v-model="formItem.accessToken" style="width:200px">
                        <Option :value="0" :key="0"> 忽略Token </Option>
                        <Option :value="1" :key="1"> 验证Token </Option>
                    </Select>
                </FormItem>
                <FormItem label="用户登录" prop="needLogin">
                    <Select v-model="formItem.needLogin" style="width:200px">
                        <Option :value="0" :key="0"> 忽略登录 </Option>
                        <Option :value="1" :key="1"> 验证登录 </Option>
                    </Select>
                </FormItem>
                <FormItem label="测试模式" prop="isTest">
                    <Select v-model="formItem.isTest" style="width:200px">
                        <Option :value="0" :key="0"> 生产模式 </Option>
                        <Option :value="1" :key="1"> 测试模式 </Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import axios from 'axios';

    const editButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'primary'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.formItem.id = currentRow.id;
                    vm.formItem.apiClass = currentRow.apiClass;
                    vm.formItem.info = currentRow.info;
                    vm.formItem.method = currentRow.method;
                    vm.formItem.hash = currentRow.hash;
                    vm.formItem.accessToken = currentRow.accessToken;
                    vm.formItem.isTest = currentRow.isTest;
                    vm.formItem.needLogin = currentRow.needLogin;
                    vm.modalSetting.show = true;
                    vm.modalSetting.index = index;
                }
            }
        }, '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗? ',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    axios.get('InterfaceList/del', {
                        params: {
                            id: currentRow.id
                        }
                    }).then(function (response) {
                        currentRow.loading = false;
                        if (response.data.code === 1) {
                            vm.tableData.splice(index, 1);
                            vm.$Message.success(response.data.msg);
                        } else {
                            vm.$Message.error(response.data.msg);
                        }
                    });
                }
            }
        }, [
            h('Button', {
                style: {
                    margin: '0 5px'
                },
                props: {
                    type: 'error',
                    placement: 'top',
                    loading: currentRow.isDeleting
                }
            }, '删除')
        ]);
    };
    export default {
        name: 'interface_request',
        data () {
            return {
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '字段名称',
                        align: 'center',
                        key: 'fieldName',
                        width: 200
                    },
                    {
                        title: '数据类型',
                        align: 'center',
                        key: 'dataType',
                        width: 90
                    },
                    {
                        title: '是否必须',
                        align: 'center',
                        key: 'isMust',
                        width: 90
                    },
                    {
                        title: '默认值',
                        align: 'center',
                        key: 'default',
                        width: 160
                    },
                    {
                        title: '字段说明',
                        align: 'center',
                        key: 'info'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'handle',
                        width: 205,
                        handle: ['edit', 'delete']
                    }
                ],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0,
                    dataType: {}
                },
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                formItem: {
                    apiClass: '',
                    info: '',
                    groupHash: 'default',
                    method: 2,
                    hash: '',
                    accessToken: 1,
                    isTest: 0,
                    needLogin: 0,
                    id: 0
                },
                ruleValidate: {
                    apiClass: [
                        {required: true, message: '真实类库不能为空', trigger: 'blur'}
                    ],
                    info: [
                        {required: true, message: '接口名称不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        created () {
            this.init();
            this.getList();
        },
        methods: {
            init () {
                let vm = this;
                this.columnsList.forEach(item => {
                    if (item.handle) {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                editButton(vm, h, currentRowData, param.index),
                                deleteButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                    if (item.key === 'isMust') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            if (currentRowData.isMust === 1) {
                                return h('Badge', {
                                    attrs: {
                                        count: '必填'
                                    }
                                });
                            } else {
                                return h('Badge', {
                                    attrs: {
                                        count: '可选'
                                    },
                                    props: {
                                        'class-name': 'badge-success'
                                    }
                                });
                            }
                        };
                    }
                    if (item.key === 'dataType') {
                        item.render = (h, param) => {
                            let type = vm.tableData[param.index].dataType;
                            return h('Badge', {
                                attrs: {
                                    count: vm.tableShow.dataType[type]
                                },
                                props: {
                                    'class-name': 'badge-info'
                                }
                            });
                        };
                    }
                });
            },
            alertAdd () {
                let vm = this;
                axios.get('InterfaceList/getHash').then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.formItem.hash = res.data.hash;
                    } else {
                        if (res.code === -14) {
                            vm.$store.commit('logout', vm);
                            vm.$router.push({
                                name: 'login'
                            });
                        } else {
                            vm.$Message.error(res.msg);
                        }
                    }
                });
                this.modalSetting.edit = false;
                this.modalSetting.show = true;
            },
            submit () {
                let self = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        if (this.formItem.id === 0) {
                            target = 'InterfaceList/add';
                        } else {
                            target = 'InterfaceList/edit';
                        }
                        axios.post(target, self.formItem).then(function (response) {
                            if (response.data.code === 1) {
                                self.$Message.success(response.data.msg);
                            } else {
                                self.$Message.error(response.data.msg);
                            }
                            self.getList();
                            self.cancel();
                        });
                    }
                });
            },
            cancel () {
                this.formItem.id = 0;
                this.$refs['myForm'].resetFields();
                this.modalSetting.show = false;
                this.modalSetting.loading = false;
                this.modalSetting.index = 0;
            },
            changePage (page) {
                this.tableShow.currentPage = page;
                this.getList();
            },
            changeSize (size) {
                this.tableShow.pageSize = size;
                this.getList();
            },
            search () {
                this.getList();
            },
            getList () {
                let vm = this;
                axios.get('Fields/request', {
                    params: {
                        page: vm.tableShow.currentPage,
                        size: vm.tableShow.pageSize,
                        hash: vm.$route.params.hash.toString()
                    }
                }).then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.tableData = res.data.list;
                        vm.tableShow.listCount = res.data.count;
                        vm.tableShow.dataType = res.data.dataType;
                    } else {
                        if (res.code === -14) {
                            vm.$store.commit('logout', vm);
                            vm.$router.push({
                                name: 'login'
                            });
                        } else {
                            vm.$Message.error(res.msg);
                        }
                    }
                });
            },
            doCancel (data) {
                if (!data) {
                    this.formItem.id = 0;
                    this.$refs['myForm'].resetFields();
                    this.modalSetting.loading = false;
                    this.modalSetting.index = 0;
                }
            }
        }
    };
</script>
