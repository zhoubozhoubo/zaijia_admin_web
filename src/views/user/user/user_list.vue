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
                            <Input v-model="searchConf.phone" clearable placeholder="用户手机号"></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.gmt_create=$event" placeholder="创建日期"
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
                    <p slot="title" style="height: 40px">
                        <Button type="primary" @click="alertAdd" icon="ios-send-outline">发送消息</Button>
                        <Button type="primary" @click="alertAddAll" icon="ios-send">发送消息给所有用户</Button>
                    </p>
                    <div>
                        <Table :loading="loading" :columns="columnsList" :data="tableData" border disabled-hover @on-selection-change="handleRowChange" ref="selection"></Table>
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
                <span>发送消息</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
                <FormItem label="标题" prop="title">
                    <Input v-model="formItem.title" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input v-model="formItem.content" placeholder="请输入内容"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>
        <!--团队-->
        <Modal v-model="modalSeeingTeam.show" width="998" :styles="{top: '30px'}">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="md-information-circle"></Icon>
                <span>{{modalSeeingTeam.nickname}} > {{teamConf.level === 1 ? '一级队员' : '二级队员'}}</span>
            </p>
            <div>
                <Table :loading="teamLoading" :columns="teamColumns" :data="teamData" border disabled-hover></Table>
            </div>
            <div class="margin-top-15" style="text-align: center">
                <Page :total="teamShow.listCount" :current="teamShow.currentPage"
                      :page-size="teamShow.pageSize" @on-change="changeTeamPage"
                      @on-page-size-change="changeTeamSize" show-elevator show-sizer show-total></Page>
            </div>
            <p slot="footer"></p>
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
    import {getDataList, sendNotice} from '@/api/user_list'

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
                    deleteData(currentRow.user_id).then(res => {
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

    // 查看一级团队
    const oneTeamButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'success'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.modalSeeingTeam.show = true;
                    vm.modalSeeingTeam.nickname = currentRow.nickname;
                    vm.teamConf.level = 1;
                    vm.teamConf.user_id = currentRow.user_id;
                    vm.getTeamList();
                }
            }
        }, '一级成员');
    };

    // 查看二级团队
    const twoTeamButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'info'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.modalSeeingTeam.show = true;
                    vm.modalSeeingTeam.nickname = currentRow.nickname;
                    vm.teamConf.level = 2;
                    vm.teamConf.user_id = currentRow.user_id;
                    vm.getTeamList();
                }
            }
        }, '二级成员');
    };

    export default {
        name: 'user_list',
        components: {},
        data() {
            return {
                columnsList: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center',
                        key: 'user_id'
                    }, {title: "用户id", key: "user_id", align: "center", width: 80}, {
                        title: "用户头像",
                        key: "avatarurl",
                        align: "center"
                    }, {
                        title: "用户昵称",
                        key: "nickname",
                        align: "center"
                    }, {
                        title: "上级用户昵称",
                        key: "superior_user_nickname",
                        align: "center"
                    }, {title: "用户手机号", key: "phone", align: "center"}, {
                        title: "创建时间",
                        key: "gmt_create",
                        align: "center"
                    }, {
                        title: '一级团队',
                        align: 'center',
                        key: 'one_team',
                        width: 130
                    }, {
                        title: '二级团队',
                        align: 'center',
                        key: 'two_team',
                        width: 130
                    }],
                teamColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '用户头像',
                        align: 'center',
                        key: 'avatarurl'
                    },
                    {
                        title: '用户昵称',
                        align: 'center',
                        key: 'nickname'
                    },
                    {
                        title: '用户手机号',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'gmt_create'
                    }
                ],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                teamLoading: false,
                teamData: [],
                teamShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {nickname: "", phone: "", gmt_create: ""},
                teamConf: {user_id: '',level: ''},
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                modalSeeingTeam: {
                    show: false,
                    loading: false,
                    index: 0
                },
                // 初始化图片弹出框
                modalSeeingImg: {
                    img: '',
                    show: false
                },
                formItem: {
                    user_id: 0,
                    title: '',
                    content: ''
                },
                ruleValidate: {
                    title: [{required: true, message: "请输入消息标题", trigger: "blur"}],
                    content: [{required: true, message: "请输入消息内容", trigger: "blur"}]
                },
                loading: true,
            }
        },
        created() {
            this.init()
            this.teaminit()
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
                    if (item.key === 'avatarurl') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            if (currentRowData.avatarurl) {
                                return h('img', {
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        margin: '5px 0'
                                    },
                                    attrs: {
                                        src: currentRowData.avatarurl,
                                        shape: 'square',
                                        size: 'large'
                                    },
                                    on: {
                                        click: (e) => {
                                            vm.modalSeeingImg.img = currentRowData.avatarurl;
                                            vm.modalSeeingImg.show = true;
                                        }
                                    }
                                });
                            } else {
                                return h('Tag', {}, '暂无图片');
                            }
                        };
                    }
                    if (item.key === 'one_team') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                oneTeamButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                    if (item.key === 'two_team') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                twoTeamButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                })
            },
            teaminit () {
                let vm = this;
                this.teamColumns.forEach(item => {
                    if (item.key === 'avatarurl') {
                        item.render = (h, param) => {
                            let currentRowData = vm.teamData[param.index];
                            if (currentRowData.avatarurl) {
                                return h('img', {
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        margin: '5px 0'
                                    },
                                    attrs: {
                                        src: currentRowData.avatarurl,
                                        shape: 'square',
                                        size: 'large'
                                    },
                                    on: {
                                        click: (e) => {
                                            vm.modalSeeingImg.img = currentRowData.avatarurl;
                                            vm.modalSeeingImg.show = true;
                                        }
                                    }
                                });
                            } else {
                                return h('Tag', {}, '暂无图片');
                            }
                        };
                    }
                });
            },
            alertAdd() {
                if (this.formItem.user_id === 0) {
                    this.$Message.warning('请选择需要发送消息的用户')
                    return
                }
                this.modalSetting.show = true
            },
            alertAddAll() {
                this.modalSetting.show = true
            },
            submit() {
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.modalSetting.loading = true
                        sendNotice(this.formItem).then(res => {
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
                    this.formItem.user_id = 0
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
            changeTeamPage (page) {
                this.teamShow.currentPage = page;
                this.getTeamList();
            },
            changeTeamSize (size) {
                this.teamShow.pageSize = size;
                this.getTeamList();
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
            },
            getTeamList () {
                this.teamLoading = true;
                getDataList(this.teamShow, this.teamConf).then(res => {
                    this.teamData = res.data.data.list
                    this.teamShow.listCount = res.data.data.count
                    this.teamLoading = false
                })
            },
            // 选中列表
            handleRowChange (selection) {
                for (let i = 0; i < selection.length; i++) {
                    this.formItem.user_id += selection[i].user_id + ',';
                }
                this.formItem.user_id = this.formItem.user_id.substr(0, this.formItem.user_id.length - 1);
            }
        }
    }
</script>

<style scoped>
</style>
<style>
</style>
