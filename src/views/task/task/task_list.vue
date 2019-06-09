<template>
    <div>
        <Row>
            <Col span="24">
                <Card style="margin-bottom: 10px">
                    <Form inline>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.task_type_id" clearable placeholder='任务类型'
                                    style="width:100px">
                                <Option v-for="(taskType, taskTypeIndex) in taskTypeList" :key="taskTypeIndex" :value="taskType.id">{{taskType.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Input v-model="searchConf.title" clearable placeholder="任务标题"></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.is_repeat" clearable placeholder='是否重复' style="width:100px">
                                <Option value="0">不重复</Option>
                                <Option value="1">重复</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <!--<Select v-model="searchConf.area" clearable placeholder='请选择地区' style="width:100px">
                                <Option :value="1">select1</Option>
                                <Option :value="2">select2</Option>
                                <Option :value="3">select3</Option>
                            </Select>-->
                            <Cascader :data="AreaList" v-model="searchConf.area" trigger="hover" placeholder='请选择地区'></Cascader>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.device" clearable placeholder='设备类型' style="width:100px">
                                <Option value="0">不限</Option>
                                <Option value="1">安卓</Option>
                                <Option value="2">IOS</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.submit_way" clearable placeholder='提交方式' style="width:100px">
                                <Option value="1">文本</Option>
                                <Option value="2">文本+截图</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.status" clearable placeholder='任务状态' style="width:100px">
                                <Option value="0">关闭</Option>
                                <Option value="1">开启</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <DatePicker type="daterange" @on-change="searchConf.gmt_create=$event" placeholder="发布日期范围"
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
                        <Button type="primary" @click="alertAdd" icon="md-add">新增</Button>
                    </p>
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
                <span>{{formItem.task_id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
                <FormItem label="任务类型id" prop="task_type_id">
                    <Select v-model="formItem.task_type_id" style="width:200px">
                        <Option :value="formItem.task_type_id">formItem.task_type_id</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务标题" prop="title">
                    <Input v-model="formItem.title" placeholder="任务标题"></Input>
                </FormItem>
                <FormItem label="任务金额" prop="money">
                    <Input v-model="formItem.money" placeholder="任务金额"></Input>
                </FormItem>
                <FormItem label="任务数量" prop="number">
                    <Input v-model="formItem.number" placeholder="任务数量"></Input>
                </FormItem>
                <FormItem label="截止日期" prop="end_date">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="验收时长" prop="check_duration">
                    <Input v-model="formItem.check_duration" placeholder="验收时长"></Input>
                </FormItem>
                <FormItem label="完成时长" prop="finish_duration">
                    <Select v-model="formItem.finish_duration" style="width:200px">
                        <Option :value="formItem.finish_duration">formItem.finish_duration</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否重复" prop="is_repeat">
                    <Radio v-model="formItem.is_repeat">Radio</Radio>
                </FormItem>
                <FormItem label="地区" prop="area">
                    <Select v-model="formItem.area" style="width:200px">
                        <Option :value="formItem.area">formItem.area</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务步骤" prop="step">
                    <Input v-model="formItem.step" placeholder="任务步骤"></Input>
                </FormItem>
                <FormItem label="图片展示" prop="show_img">
                    <div class="demo-upload-list" v-if="formItem.show_img">
                        <img :src="formItem.show_img">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleImgRemove()"></Icon>
                        </div>
                    </div>
                    <input v-if="formItem.show_img" v-model="formItem.show_img" type="hidden" name="image">
                    <Upload type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            v-if="!formItem.show_img"
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
                        <img :src="formItem.show_img" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="注意事项" prop="take_care">
                    <Input v-model="formItem.take_care" placeholder="注意事项"></Input>
                </FormItem>
                <FormItem label="设备类型" prop="device">
                    <Radio v-model="formItem.device">Radio</Radio>
                </FormItem>
                <FormItem label="提交方式" prop="submit_way">
                    <Select v-model="formItem.submit_way" style="width:200px">
                        <Option :value="formItem.submit_way">formItem.submit_way</Option>
                    </Select>
                </FormItem>
                <FormItem label="提交说明" prop="submit_notice">
                    <Input v-model="formItem.submit_notice" placeholder="提交说明"></Input>
                </FormItem>
                <FormItem label="提交图片" prop="submit_img">
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
    import axios from 'axios';
    import config from '../../../../build/config';
    import {getDataList, saveData, deleteData, change} from '@/api/task_list'

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
                    vm.formItem.task_id = currentRow.task_id;
                    vm.formItem.task_type_id = currentRow.task_type_id;
                    vm.formItem.title = currentRow.title;
                    vm.formItem.money = currentRow.money;
                    vm.formItem.number = currentRow.number;
                    vm.formItem.end_date = currentRow.end_date;
                    vm.formItem.check_duration = currentRow.check_duration;
                    vm.formItem.finish_duration = currentRow.finish_duration;
                    vm.formItem.is_repeat = currentRow.is_repeat;
                    vm.formItem.area = currentRow.area;
                    vm.formItem.step = currentRow.step;
                    vm.formItem.show_img = currentRow.show_img;
                    vm.formItem.take_care = currentRow.take_care;
                    vm.formItem.device = currentRow.device;
                    vm.formItem.submit_way = currentRow.submit_way;
                    vm.formItem.submit_notice = currentRow.submit_notice;
                    vm.formItem.submit_img = currentRow.submit_img;
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
                    deleteData(currentRow.task_id).then(res => {
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
        name: 'task_list',
        components: {},
        data() {
            return {
                columnsList: [{title: "id", key: "task_id", align: "center", width: 80}, {
                    title: "任务类型",
                    key: "task_type_name",
                    align: "center"
                }, {title: "任务标题", key: "title", align: "center"}, {
                    title: "任务金额",
                    key: "money",
                    align: "center"
                }, {title: "任务数量", key: "number", align: "center", width: 100}, {
                    title: "剩余数量",
                    key: "surplus_number",
                    align: "center",
                    width: 100
                }, {
                    title: "截止日期",
                    key: "end_date",
                    align: "center"
                }, {title: "验收时长", key: "check_duration", align: "center", width: 100}, {
                    title: "完成时长",
                    key: "finish_duration",
                    align: "center", width: 100
                }, {title: "是否重复", key: "is_repeat", align: "center", width: 100}, {
                    title: "地区",
                    key: "area",
                    align: "center"
                }, {title: "状态", key: "status", align: "center", width: 100}, {
                    title: "创建时间",
                    key: "gmt_create",
                    align: "center", width: 150
                }, {title: "操作", key: "handle", align: "center", handle: ["edit", "delete"], width: 180}],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {
                    task_type_id: "",
                    title: "",
                    is_repeat: "",
                    area: [],
                    device: "",
                    submit_way: "",
                    status: "",
                    gmt_create: ""
                },
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
                    task_id: "",
                    task_type_id: "",
                    title: "",
                    money: "",
                    number: "",
                    end_date: "",
                    check_duration: "",
                    finish_duration: "",
                    is_repeat: "",
                    area: "",
                    step: "",
                    show_img: "",
                    take_care: "",
                    device: "",
                    submit_way: "",
                    submit_notice: "",
                    submit_img: ""
                },
                ruleValidate: {
                    task_type_id: [{required: true, message: "请选择任务类型", trigger: "blur"}],
                    title: [{required: true, message: "请输入任务标题", trigger: "blur"}],
                    money: [{required: true, message: "请输入任务金额", trigger: "blur"}],
                    number: [{required: true, message: "请输入任务数量", trigger: "blur"}],
                    end_date: [{required: true, message: "请选择任务截止日期", trigger: "blur"}],
                    check_duration: [{required: true, message: "请输入验收时长", trigger: "blur"}],
                    finish_duration: [{required: true, message: "请选择完成时长", trigger: "blur"}],
                    is_repeat: [{required: true, message: "请选择是否重复", trigger: "blur"}],
                    area: [{required: true, message: "请选择任务地区", trigger: "blur"}],
                    step: [{required: true, message: "请填写任务步骤", trigger: "blur"}],
                    show_img: [{required: true, message: "请上传图片", trigger: "blur"}],
                    take_care: [{required: true, message: "请输入注意事项", trigger: "blur"}],
                    device: [{required: true, message: "请选择设备类型", trigger: "blur"}],
                    submit_way: [{required: true, message: "请选择提交方式", trigger: "blur"}],
                    submit_notice: [{required: true, message: "请输入提交说明", trigger: "blur"}],
                    submit_img: [{required: true, message: "请上传图片", trigger: "blur"}]
                },
                loading: true,
                taskTypeList: [],
                AreaList: []
            }
        },
        created() {
            let vm = this
            this.init()
            this.getList()
            this.uploadUrl = config.baseUrl + 'Index/upload';
            this.uploadHeader = {'ApiAuth': sessionStorage.getItem('apiAuth')};
            axios.get('TaskType/getList').then(function (response) {
                if (response.data.code === 1) {
                    vm.taskTypeList = response.data.data.list;
                }
            });
            axios.get('AreaCon/getList').then(function (response) {
                if (response.data.code === 1) {
                    vm.AreaList = response.data.data;
                }
            });
        },
        methods: {
            init() {
                let vm = this
                this.columnsList.forEach(item => {
                    if (item.key === 'handle') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index]
                            return h('div', [
                                editButton(vm, h, currentRowData, param.index),
                                deleteButton(vm, h, currentRowData, param.index)
                            ])
                        }
                    }
                    if (item.key === 'money') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'gold'
                                }
                            }, currentRowData.money);
                        };
                    }
                    if (item.key === 'is_repeat') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.is_repeat) {
                                case 0:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'red'
                                        }
                                    }, '不重复');
                                    break;
                                case 1:
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, '重复');
                                    break;
                            }
                        };
                    }
                    if (item.key === 'area') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'blue'
                                }
                            }, currentRowData.area);
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
                                        change({task_id: currentRowData.task_id, status: status}).then(res => {
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
                                }, '开启'),
                                h('span', {
                                    slot: 'close'
                                }, '关闭')
                            ]);
                        };
                    }
                })
            },
            alertAdd() {
                this.formItem.task_id = 0
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
                    this.formItem.task_id = 0
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
