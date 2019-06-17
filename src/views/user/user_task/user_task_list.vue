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
                            <Input v-model="searchConf.title" clearable placeholder="任务标题"></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.submit_time=$event" placeholder="提交日期范围"
                                        style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.check_time=$event" placeholder="审核日期范围"
                                        style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.status" clearable placeholder='请选择状态' style="width:100px">
                                <Option value="0">执行中</Option>
                                <Option value="1">待审核</Option>
                                <Option value="2">已通过</Option>
                                <Option value="3">未通过</Option>
                                <Option value="4">已放弃</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.gmt_create=$event" placeholder="领取日期范围"
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
                <FormItem label="用户id" prop="user_id">
                    <Input v-model="formItem.user_id" placeholder="用户id"></Input>
                </FormItem>
                <FormItem label="任务id" prop="task_id">
                    <Input v-model="formItem.task_id" placeholder="任务id"></Input>
                </FormItem>
                <FormItem label="上传图片" prop="submit_img">
                    <div class="demo-upload-list" v-if="formItem.submit_img">
                        <img :src="formItem.submit_img">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleImgRemove()"></Icon>
                        </div>
                    </div>
                    <input v-if="formItem.submit_img" v-model="formItem.submit_img" type="hidden" name="image">
                    <Upload type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            v-if="!formItem.submit_img"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-success="handleImgSuccess"
                            :on-format-error="handleImgFormatError"
                            :on-exceeded-size="handleImgMaxSize"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="formItem.submit_img" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="上传文本" prop="submit_text">
                    <Input v-model="formItem.submit_text" placeholder="上传文本"></Input>
                </FormItem>
                <FormItem label="提交时间" prop="submit_time">
                    <Input v-model="formItem.submit_time" placeholder="提交时间"></Input>
                </FormItem>
                <FormItem label="状态" prop="status">
                    <Input v-model="formItem.status" placeholder="状态"></Input>
                </FormItem>
                <FormItem label="创建时间" prop="gmt_create">
                    <Input v-model="formItem.gmt_create" placeholder="创建时间"></Input>
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
    import config from '../../../../build/config';
    import {getDataList, saveData, deleteData, change} from '@/api/user_task_list'

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
                    vm.formItem.user_id = currentRow.user_id;
                    vm.formItem.task_id = currentRow.task_id;
                    vm.formItem.submit_img = currentRow.submit_img;
                    vm.formItem.submit_text = currentRow.submit_text;
                    vm.formItem.submit_time = currentRow.submit_time;
                    vm.formItem.status = currentRow.status;
                    vm.formItem.gmt_create = currentRow.gmt_create;
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
        name: 'user_task_list',
        components: {},
        data() {
            return {
                columnsList: [{title: "id", key: "id", align: "center", width: 80}, {
                    title: "用户昵称",
                    key: "nickname",
                    align: "center"
                }, {title: "任务标题", key: "title", align: "center"}, {
                    title: "提交时间",
                    key: "submit_time",
                    align: "center"
                }, {title: "审核时间", key: "check_time", align: "center"}, {
                    title: "状态",
                    key: "status",
                    align: "center", width: 100
                }, {title: "领取时间", key: "gmt_create", align: "center"}],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {nickname: "", title: "", submit_time: "", check_time: "", status: "", gmt_create: ""},
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
                visible: false,
                uploadUrl: '',
                uploadHeader: {},
                formItem: {
                    id: "",
                    user_id: "",
                    task_id: "",
                    submit_img: "",
                    submit_text: "",
                    submit_time: "",
                    status: "",
                    gmt_create: ""
                },
                ruleValidate: {id: [{required: 0, message: "", trigger: "blur"}]},
                loading: true,
            }
        },
        created() {
            this.init()
            this.getList()
            this.uploadUrl = config.baseUrl + 'Index/upload';
            this.uploadHeader = {'ApiAuth': sessionStorage.getItem('apiAuth')};
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
                    if (item.key === 'status') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.status) {
                                case '0':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'blue'
                                        }
                                    }, '执行中');
                                    break;
                                case '1':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'orange'
                                        }
                                    }, '待审核');
                                    break;
                                case '2':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, '已通过');
                                    break;
                                case '3':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'red'
                                        }
                                    }, '未通过');
                                    break;
                                case '4':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'default'
                                        }
                                    }, '已放弃');
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
            handleView() {
                this.visible = true;
            },
            handleImgRemove() {
                this.formItem.submit_img = '';
            },
            handleImgFormatError(file) {
                this.$Notice.warning({
                    title: '文件类型不合法',
                    desc: file.name + '的文件类型不正确，请上传jpg或者png图片。'
                });
            },
            handleImgMaxSize(file) {
                this.$Notice.warning({
                    title: '文件大小不合法',
                    desc: file.name + '太大啦请上传小于5M的文件。'
                });
            },
            handleImgSuccess(response) {
                if (response.code === 1) {
                    this.$Message.success(response.msg);
                    this.formItem.submit_img = response.data.fileUrl;
                } else {
                    this.$Message.error(response.msg);
                }
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
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<style>
</style>
