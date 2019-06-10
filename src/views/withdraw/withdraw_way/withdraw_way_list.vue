<template>
    <div>
        <Row>
            <Col span="24">
                <Card style="margin-bottom: 10px">
                    <Form inline>
                        <FormItem style="margin-bottom: 0">
                            <Button type="primary" shape="circle" icon="ios-search" @click="search">查询/刷新</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Card>
                    <div>
                        <Table :loading="loading" :columns="columnsList" :data="tableData" border
                               disabled-hover></Table>
                    </div>
                    <div style="text-align: center;margin-top: 15px">
                        <Page :total="tableShow.listCount" :current="tableShow.currentPage"
                              :page-size="tableShow.pageSize" @on-change="changePage"
                              @on-page-size-change="changeSize" show-elevator show-sizer show-total></Page>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal v-model="modalSetting.show" width="700" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="md-information-circle"></Icon>
                <span>{{formItem.withdraw_way_id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
                <FormItem label="提现方式名称" prop="name">
                    <Input v-model="formItem.name" placeholder="提现方式名称"></Input>
                </FormItem>
                <FormItem label="提现最小金额" prop="min_money">
                    <Input v-model="formItem.min_money" placeholder="提现最小金额"></Input>
                </FormItem>
                <FormItem label="提现最大金额" prop="max_money">
                    <Input v-model="formItem.max_money" placeholder="提现最大金额"></Input>
                </FormItem>
                <FormItem label="提现说明" prop="notice">
                    <Input v-model="formItem.notice" placeholder="提现说明" type="textarea" :row="4"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>
        <!--查看大图-->
        <Modal v-model="modalSeeingImg.show"
               class-name="fl-image-modal"
               @on-visible-change="doCancel">
            <img :src="modalSeeingImg.img" v-if="modalSeeingImg.show" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import {getDataList, saveData, deleteData, change} from '@/api/withdraw_way_list'

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
                    vm.formItem.withdraw_way_id = currentRow.withdraw_way_id;
                    vm.formItem.name = currentRow.name;
                    vm.formItem.min_money = currentRow.min_money;
                    vm.formItem.max_money = currentRow.max_money;
                    vm.formItem.notice = currentRow.notice;
                    vm.modalSetting.show = true
                    vm.modalSetting.index = index
                }
            }
        }, '编辑')
    }
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗? ',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    deleteData(currentRow.withdraw_way_id).then(res => {
                        if (res.data.code === 1) {
                            vm.tableData.splice(index, 1)
                            vm.$Message.success(res.data.msg)
                        } else {
                            vm.$Message.error(res.data.msg)
                        }
                    }, err => {
                        vm.$Message.error(err.data.msg)
                    })
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
                }
            }, '删除')
        ])
    }

    export default {
        name: 'withdraw_way_list',
        components: {},
        data() {
            return {
                columnsList: [{title: "id", key: "withdraw_way_id", align: "center", width: 80}, {
                    title: "提现方式名称",
                    key: "name",
                    align: "center"
                }, {title: "提现最小金额", key: "min_money", align: "center"}, {
                    title: "提现最大金额",
                    key: "max_money",
                    align: "center"
                }, {
                    title: "提现说明",
                    key: "notice",
                    align: "center"
                }, {title: "状态", key: "status", align: "center", width: 100}, {
                    title: "操作",
                    key: "handle",
                    align: "center",
                    handle: ["edit", "delete"],
                    width: 180
                }],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: [],
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                // 初始化图片弹出框
                modalSeeingImg: {
                    img: '',
                    show: false
                },
                formItem: {withdraw_way_id: "", name: "", min_money: "", max_money: ""},
                ruleValidate: {
                    name: [{required: true, message: "请输入提现名称", trigger: "blur"}],
                    min_money: [{required: true, message: "请输入最小金额", trigger: "blur", type: 'number'}],
                    max_money: [{required: true, message: "请输入最大金额", trigger: "blur", type: 'number'}]
                },
                loading: true,
            }
        },
        created() {
            this.init()
            this.getList()
        },
        methods: {
            init() {
                let vm = this
                this.columnsList.forEach(item => {
                    if (item.key === 'handle') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index]
                            return h('div', [
                                editButton(vm, h, currentRowData, param.index)
                            ])
                        }
                    }
                    if (item.key === 'min_money') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'green'
                                }
                            }, currentRowData.min_money);
                        };
                    }
                    if (item.key === 'max_money') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'red'
                                }
                            }, currentRowData.max_money);
                        };
                    }
                    if (item.key === 'status') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('i-switch', {
                                attrs: {
                                    size: 'large'
                                },
                                props: {
                                    'true-value': 1,
                                    'false-value': 0,
                                    value: currentRowData.status
                                },
                                on: {
                                    'on-change': function (status) {
                                        change({
                                            withdraw_way_id: currentRowData.withdraw_way_id,
                                            status: status
                                        }).then(res => {
                                            vm.$Message.success(res.data.msg)
                                            vm.cancel()
                                        }, err => {
                                            vm.$Message.error(res.data.msg)
                                            vm.cancel()
                                        })
                                    }
                                }
                            }, [
                                h('span', {
                                    slot: 'open'
                                }, '启用'),
                                h('span', {
                                    slot: 'close'
                                }, '禁用')
                            ]);
                        };
                    }
                })
            },
            alertAdd() {
                this.formItem.withdraw_way_id = 0
                this.modalSetting.show = true
            },
            submit() {
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.modalSetting.loading = true
                        saveData(this.formItem).then(res => {
                            if (res.data.code === 1) {
                                this.$Message.success(res.data.msg)
                                this.getList()
                                this.cancel()
                            } else {
                                this.$Message.error(res.data.msg)
                            }
                        })
                    }
                })
            },
            cancel() {
                this.modalSetting.show = false
            },
            doCancel(data) {
                if (!data) {
                    this.formItem.withdraw_way_id = 0
                    this.$refs['myForm'].resetFields()
                    this.modalSetting.loading = false
                    this.modalSetting.index = 0
                }
            },
            changePage(page) {
                this.tableShow.currentPage = page
                this.getList()
            },
            changeSize(size) {
                this.tableShow.pageSize = size
                this.getList()
            },
            search() {
                this.tableShow.currentPage = 1
                this.getList()
            },
            getList() {

                this.loading = true;
                getDataList(this.tableShow, this.searchConf).then(res => {
                    this.tableData = res.data.data.list
                    this.tableShow.listCount = res.data.data.count
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>
</style>
<style>
</style>
