<template>
    <div>
        <Row>
            <Col span="24">
                <Card style="margin-bottom: 10px">
                    <Form inline>
                        <FormItem style="margin-bottom: 0">
                            <Input v-model="searchConf.nickname" clearable placeholder="用户昵称"></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.withdraw_way_id" clearable placeholder='提现方式'
                                    style="width:100px">
                                <Option value="1">微信提现</Option>
                                <Option value="2">支付宝提现</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Input v-model="searchConf.account" clearable placeholder="提现帐号"></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.status" clearable placeholder='提现状态' style="width:100px">
                                <Option value="0">提现中</Option>
                                <Option value="1">成功</Option>
                                <Option value="2">失败</Option>
                                <Option value="3">已取消</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.gmt_create=$event" placeholder="选择日期范围"
                                        style="width: 200px"></DatePicker>
                        </FormItem>
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
                <span>{{formItem.id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
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
    import {getDataList, saveData, deleteData, change} from '@/api/withdraw_list'

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
                    deleteData(currentRow.id).then(res => {
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
        name: 'withdraw_list',
        components: {},
        data() {
            return {
                columnsList: [{title: "id", key: "id", align: "center",width: 80}, {
                    title: "用户昵称",
                    key: "nickname",
                    align: "center"
                }, {title: "金额", key: "money", align: "center"}, {
                    title: "提现方式",
                    key: "withdraw_way_id",
                    align: "center"
                }, {title: "提现帐号", key: "account", align: "center"}, {
                    title: "状态",
                    key: "status",
                    align: "center"
                }, {title: "创建时间", key: "gmt_create", align: "center"}],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {nickname: "", withdraw_way_id: "", account: "", status: "", gmt_create: ""},
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
                formItem: {},
                ruleValidate: {},
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
                        }
                    }
                    if (item.key === 'withdraw_way_id') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.withdraw_way_id) {
                                case 1:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, '微信提现');
                                    break;
                                case 2:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'blue'
                                        }
                                    }, '支付宝提现');
                                    break;
                            }
                        };
                    }
                    if (item.key === 'status') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.status) {
                                case 0:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'blue'
                                        }
                                    }, '提现中');
                                    break;
                                case 1:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, '成功');
                                    break;
                                case 2:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'red'
                                        }
                                    }, '失败');
                                    break;
                                case 3:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'default'
                                        }
                                    }, '已取消');
                                    break;
                            }
                        };
                    }
                })
            },
            alertAdd() {
                this.formItem.id = 0
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
                    this.formItem.id = 0
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
