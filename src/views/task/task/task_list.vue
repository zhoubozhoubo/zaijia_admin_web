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
                <span>新增</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
                <FormItem label="任务类型" prop="task_type_id">
                    <Select v-model="formItem.task_type_id" style="width:200px" placeholder="选择任务类型">
                        <Option v-for="(taskType, taskTypeIndex) in taskTypeList" :key="taskTypeIndex" :value="taskType.id">{{taskType.name}}</Option>
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
                    <DatePicker type="date" v-model="formItem.end_date" placeholder="任务截止日期" format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="验收时长" prop="check_duration">
                    <Input v-model="formItem.check_duration" placeholder="验收时长"></Input>
                </FormItem>
                <FormItem label="完成时长" prop="finish_duration">
                    <Select v-model="formItem.finish_duration" style="width:200px">
                        <Option value="30">0.5小时</Option>
                        <Option value="1">1小时</Option>
                        <Option value="2">2小时</Option>
                        <Option value="12">12小时</Option>
                        <Option value="24">24小时</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否重复" prop="is_repeat">
                    <RadioGroup v-model="formItem.is_repeat">
                        <Radio label="0">不重复</Radio>
                        <Radio label="1">重复</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="地区">
                    <Cascader :data="AreaList" v-model="formItem.area" trigger="hover" placeholder='请选择地区,不选则为全国'></Cascader>
                </FormItem>
                <FormItem label="任务步骤" prop="step">
                    <Row v-for="(item, index) in formItem.step" :key="index" style="margin-bottom: 10px;">
                        <Col span="22">
                            <Input v-model="formItem.step[index]" :placeholder="'任务步骤' + (index-0+1)"></Input>
                        </Col>
                        <Col span="1" offset="1" v-if="index > 2">
                            <Icon type="md-close-circle" size="20" color="#ed4014" @click="delStep(index)"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <Button type="primary" ghost icon="md-add" @click="addStep">添加步骤</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="任务链接" prop="link">
                    <Input v-model="formItem.link" placeholder="任务链接"></Input>
                </FormItem>
                <FormItem label="图片展示">
                    <div class="demo-upload-list" v-for="item in uploadListShow">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveShow(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="uploadShow"
                            :show-upload-list="false"
                            :default-file-list="formItem.show_img"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            multiple
                            type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="showImgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="注意事项" prop="take_care">
                    <Input v-model="formItem.take_care" type="textarea" :rows="4" placeholder="注意事项"></Input>
                </FormItem>
                <FormItem label="设备类型" prop="device">
                    <RadioGroup v-model="formItem.device">
                        <Radio label="0">不限</Radio>
                        <Radio label="1">安卓</Radio>
                        <Radio label="2">IOS</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="提交方式" prop="submit_way">
                    <Select v-model="formItem.submit_way" placeholder="提交方式" style="width:200px">
                        <Option value="1">文本</Option>
                        <Option value="2">文本+截图</Option>
                    </Select>
                </FormItem>
                <FormItem label="提交说明" prop="submit_notice">
                    <Input v-model="formItem.submit_notice" type="textarea" :rows="4" placeholder="提交说明"></Input>
                </FormItem>
                <FormItem label="提交图片" prop="submit_img" v-show="formItem.submit_way == 2">
                    <div class="demo-upload-list" v-for="item in uploadListSubmit">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemoveSubmit(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="uploadSubmit"
                            :show-upload-list="false"
                            :default-file-list="formItem.submit_img"
                            :on-success="handleSuccessSubmit"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-format-error="handleFormatErrorSubmit"
                            :on-exceeded-size="handleMaxSizeSubmit"
                            multiple
                            type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="showImgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>

        <Modal v-model="modalEditting.show" width="700" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="md-information-circle"></Icon>
                <span>编辑</span>
            </p>
            <Form ref="myFormEdit" :rules="ruleValidateEdit" :model="formItemEdit" :label-width="100">
                <FormItem label="任务标题" prop="title">
                    <Input v-model="formItemEdit.title" disabled placeholder="任务标题"></Input>
                </FormItem>
                <FormItem label="增加数量" prop="number">
                    <Input v-model="formItemEdit.number" placeholder="增加数量"></Input>
                </FormItem>
                <FormItem label="截止日期" prop="end_date">
                    <DatePicker type="date" v-model="formItemEdit.end_date" placeholder="任务截止日期" format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEdit" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submitEdit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>

        <Modal v-model="modalSeeingSubmit.show" width="998" :styles="{top: '30px'}">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="md-information-circle"></Icon>
                <span>{{modalSeeingSubmit.title}} > 提交列表({{modalSeeingSubmit.status}})</span>
            </p>
            <div>
                <Table :loading="submitLoading" :columns="submitColumns" :data="submitData" border disabled-hover></Table>
            </div>
            <div class="margin-top-15" style="text-align: center">
                <Page :total="submitShow.listCount" :current="submitShow.currentPage"
                      :page-size="submitShow.pageSize" @on-change="changeSubmitPage"
                      @on-page-size-change="changeSubmitSize" show-elevator show-sizer show-total></Page>
            </div>
            <p slot="footer"></p>
        </Modal>

        <Modal v-model="modalSubmit.show" width="700" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="md-information-circle"></Icon>
                <span>{{modalSubmit.nickname}} > 提交内容</span>
            </p>
            <Form ref="myFormSubmit" :model="formItemSubmit" :label-width="100">
                <FormItem label="提交图片">
                    <div class="demo-upload-list" v-for="item in modalSubmit.submit_img">
                        <template>
                            <img :src="item">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                            </div>
                        </template>
                    </div>
                </FormItem>
                <FormItem label="提交文本">
                    <Input type="textarea" :rows="4" v-model="modalSubmit.submit_text" disabled placeholder="提交文本"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelSubmit" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="passSubmit" :loading="modalSubmit.loading" v-if="modalSubmit.status == 1">通过</Button>
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
    import {getDataList, saveData, deleteData, change, getSubmitDataList, saveUserTaskData} from '@/api/task_list'

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
                    vm.formItemEdit.task_id = currentRow.task_id;
                    vm.formItemEdit.title = currentRow.title;
                    vm.formItemEdit.end_date = currentRow.end_date;
                    vm.modalEditting.show = true
                    vm.modalEditting.index = index
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
                    deleteData({task_id: currentRow.task_id}).then(res => {
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

    // 查看提交列表
    const seeSubmitListButton = (vm, h, currentRow, index, status) => {
        let type = ''
        let number = 0
        if (status === 1) {
            type = 'warning'
            number = currentRow.wait_check
        }else if (status === 2) {
            type = 'success'
            number = currentRow.have_pass
        }else if (status === 3) {
            type = 'error'
            number = currentRow.no_pass
        }
        return h('Button', {
            props: {
                type: type,
                ghost: true
            },
            on: {
                'click': () => {
                    vm.searchConfSubmit.task_id = currentRow.task_id;
                    vm.searchConfSubmit.status = status;
                    if (status === 1) {
                        vm.modalSeeingSubmit.status = '待审核'
                    }else if (status === 2) {
                        vm.modalSeeingSubmit.status = '已通过'
                    }else if (status === 3) {
                        vm.modalSeeingSubmit.status = '未通过'
                    }
                    vm.modalSeeingSubmit.title = currentRow.title;
                    vm.modalSeeingSubmit.show = true
                    vm.getSubmitList();
                }
            }
        }, number)
    };

    // 查看提交内容
    const seeSubmitContentButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'primary'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.formItemSubmit.id = currentRow.id;
                    vm.modalSubmit.nickname = currentRow.nickname;
                    vm.modalSubmit.submit_img = currentRow.submit_img;
                    vm.modalSubmit.submit_text = currentRow.submit_text;
                    vm.modalSubmit.status = currentRow.status;
                    vm.modalSubmit.show = true
                    vm.modalSubmit.index = index
                }
            }
        }, '查看')
    };

    // 审核拒绝操作
    const noPassButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要不通过这条数据吗? ',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    vm.formItemSubmit.id = currentRow.id;
                    vm.formItemSubmit.status = 3;
                    saveUserTaskData(vm.formItemSubmit).then(res => {
                        if (res.data.code === 1) {
                            vm.submitData.splice(index, 1)
                            vm.$Message.success(res.data.msg)
                            vm.getList()
                        } else {
                            vm.$Message.error(res.data.msg)
                        }
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
            }, '拒绝')
        ])
    };

    export default {
        name: 'task_list',
        components: {},
        data() {
            return {
                columnsList: [{title: "id", key: "task_id", align: "center", width: 80,
                    fixed: 'left'}, {
                    title: "任务类型",
                    key: "task_type_name",
                    align: "center", width: 100,
                    fixed: 'left'
                }, {title: "任务标题", key: "title", align: "center", width: 200,
                    fixed: 'left'}, {
                    title: "任务金额",
                    key: "money",
                    align: "center", width: 100,
                    fixed: 'left'
                }, {title: "任务数量", key: "number", align: "center", width: 100}, {
                    title: "已领数量",
                    key: "have_number",
                    align: "center",
                    width: 100
                }, {
                    title: "待审核",
                    key: "wait_check",
                    align: "center",
                    width: 80
                }, {
                    title: "已通过",
                    key: "have_pass",
                    align: "center",
                    width: 80
                }, {
                    title: "未通过",
                    key: "no_pass",
                    align: "center",
                    width: 80
                }, {
                    title: "截止日期",
                    key: "end_date",
                    align: "center", width: 100
                }, {title: "验收时长", key: "check_duration", align: "center", width: 100}, {
                    title: "完成时长",
                    key: "finish_duration",
                    align: "center", width: 100
                }, {title: "是否重复", key: "is_repeat", align: "center", width: 100}, {
                    title: "地区",
                    key: "city_name",
                    align: "center", width: 120
                }, {title: "状态", key: "status", align: "center", width: 100}, {
                    title: "创建时间",
                    key: "gmt_create",
                    align: "center", width: 150
                }, {title: "操作", key: "handle", align: "center", handle: ["edit", "delete"], width: 180,
                    fixed: 'right'}],
                submitColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '用户头像',
                        align: 'center',
                        key: 'avatarurl', width: 100
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
                        title: '提交时间',
                        align: 'center',
                        key: 'submit_time'
                    },
                    {
                        title: '审核时间',
                        align: 'center',
                        key: 'check_time'
                    }, {title: "操作", key: "handle", align: "center", handle: ["edit", "delete"], width: 180}
                ],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                submitLoading: false,
                submitData: [],
                submitShow: {
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
                searchConfSubmit: {
                    task_id: "",
                    status: ""
                },
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                modalEditting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                modalSeeingSubmit: {
                    show: false,
                    loading: false,
                    title: '',
                    status: '',
                    index: 0
                },
                modalSubmit: {
                    show: false,
                    loading: false,
                    nickname: '',
                    submit_img: [],
                    submit_text: "",
                    status: "",
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
                    task_id: 0,
                    task_type_id: "",
                    title: "",
                    money: "",
                    number: "",
                    end_date: "",
                    check_duration: "",
                    finish_duration: "",
                    is_repeat: 0,
                    area: [],
                    step: ['','',''],
                    link: "",
                    show_img: [],
                    take_care: "",
                    device: 0,
                    submit_way: "",
                    submit_notice: "",
                    submit_img: []
                },
                formItemEdit: {
                    task_id: "",
                    title: "",
                    number: "",
                    end_date: ""
                },
                formItemSubmit: {
                    id: "",
                    status: 2
                },
                ruleValidate: {
                    task_type_id: [{required: true, message: "请选择任务类型", trigger: "change"}],
                    title: [{required: true, message: "请输入任务标题", trigger: "blur"}],
                    money: [{required: true, message: "请输入任务金额", trigger: "blur"}],
                    number: [{required: true, message: "请输入任务数量", trigger: "blur"}],
                    end_date: [{required: true, message: "请选择任务截止日期", trigger: "change", type: 'date'}],
                    check_duration: [{required: true, message: "请输入验收时长", trigger: "blur"}],
                    finish_duration: [{required: true, message: "请选择完成时长", trigger: "change"}],
                    is_repeat: [{required: true, message: "请选择是否重复", trigger: "change"}],
                    // area: [{required: true, message: "请选择任务地区", trigger: "change", type: 'array'}],
                    step: [{required: true, message: "请填写任务步骤", trigger: "change", type: 'array'}],
                    take_care: [{required: true, message: "请输入注意事项", trigger: "blur"}],
                    device: [{required: true, message: "请选择设备类型", trigger: "change"}],
                    submit_way: [{required: true, message: "请选择提交方式", trigger: "change"}],
                    submit_notice: [{required: true, message: "请输入提交说明", trigger: "blur"}]
                },
                ruleValidateEdit: {
                    number: [{required: true, message: "请输入任务数量", trigger: "blur"}],
                    end_date: [{required: true, message: "请选择任务截止日期", trigger: "change", type: 'date'}]
                },
                loading: true,
                taskTypeList: [],
                AreaList: [],
                showImgUrl: '',
                uploadListSubmit: [],
                uploadListShow: []
            }
        },
        created() {
            let vm = this
            this.init()
            this.submitinit()
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
                    if (item.key === 'wait_check') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                seeSubmitListButton(vm, h, currentRowData, param.index,1)
                            ])
                        };
                    }
                    if (item.key === 'have_pass') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                seeSubmitListButton(vm, h, currentRowData, param.index,2)
                            ])
                        };
                    }
                    if (item.key === 'no_pass') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                seeSubmitListButton(vm, h, currentRowData, param.index,3)
                            ])
                        };
                    }
                    if (item.key === 'is_repeat') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.is_repeat) {
                                case '0':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'red'
                                        }
                                    }, '不重复');
                                    break;
                                case '1':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, '重复');
                                    break;
                            }
                        };
                    }
                    if (item.key === 'city_name') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            if (currentRowData.city == '0') {
                                currentRowData.city_name = '全国'
                            }
                            return h('Tag', {
                                attrs: {
                                    color: 'blue'
                                }
                            }, currentRowData.city_name);
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
                                    'true-value': '1',
                                    'false-value': '0',
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
            submitinit () {
                let vm = this;
                this.submitColumns.forEach(item => {
                    if (item.key === 'avatarurl') {
                        item.render = (h, param) => {
                            let currentRowData = vm.submitData[param.index];
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
                    if (item.key === 'status') {
                        item.render = (h, param) => {
                            let currentRowData = vm.submitData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'blue'
                                }
                            }, currentRowData.status);
                        };
                    }
                    if (item.key === 'handle') {
                        item.render = (h, param) => {
                            let currentRowData = vm.submitData[param.index]
                            if (currentRowData.status == 1) {
                                return h('div', [
                                    seeSubmitContentButton(vm, h, currentRowData, param.index),
                                    noPassButton(vm, h, currentRowData, param.index)
                                ])
                            }else if (currentRowData.status == 2 || currentRowData.status == 3) {
                                return h('div', [
                                    seeSubmitContentButton(vm, h, currentRowData, param.index)
                                ])
                            }
                        }
                    }
                });
            },
            changeTime(res) {
                console.log(res)
            },
            alertAdd() {
                this.formItem.task_id = 0
                this.formItem.show_img = []
                this.formItem.submit_img = []
                this.$refs.uploadShow.fileList = ''
                this.$refs.uploadSubmit.fileList = ''
                this.modalSetting.show = true
            },
            addStep () {
                this.formItem.step.push('')
            },
            delStep (index) {
                this.formItem.step.splice(index, 1)
            },
            handleView (url) {
                this.showImgUrl = url
                this.visible = true;
            },
            handleRemoveShow (file) {
                const fileList = this.$refs.uploadShow.fileList;
                this.$refs.uploadShow.fileList.splice(fileList.indexOf(file), 1);
            },
            handleRemoveSubmit (file) {
                const fileList = this.$refs.uploadSubmit.fileList;
                this.$refs.uploadSubmit.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = res.data.fileUrl
                file.name = res.data.fileName
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleSuccessSubmit (res, file) {
                file.url = res.data.fileUrl
                file.name = res.data.fileName
            },
            handleFormatErrorSubmit (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSizeSubmit (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            submit() {
                for (let i = 0; i < this.uploadListShow.length; i++) {
                    this.formItem.show_img[i] = this.uploadListShow[i].url
                }
                if (this.formItem.submit_way == 2) {
                    for (let i = 0; i < this.uploadListSubmit.length; i++) {
                        this.formItem.submit_img[i] = this.uploadListSubmit[i].url
                    }
                }

                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.modalSetting.loading = true
                        saveData(this.formItem).then(res => {
                            if (res.data.code === 1) {
                                this.$Message.success(res.data.msg)
                                this.getList()
                                this.cancel()
                                this.formItem.step = ['','','']
                                this.$refs.uploadShow.fileList = ''
                                this.$refs.uploadSubmit.fileList = ''
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
            submitEdit() {
                this.$refs['myFormEdit'].validate((valid) => {
                    if (valid) {
                        this.modalEditting.loading = true
                        saveData(this.formItemEdit).then(res => {
                            if (res.data.code === 1) {
                                this.$Message.success(res.data.msg)
                                this.getList()
                                this.cancelEdit()
                            } else {
                                this.$Message.error(res.data.msg)
                            }
                        })
                    }
                })
            },
            cancelEdit() {
                this.modalEditting.show = false
            },
            passSubmit() {
                this.modalSubmit.loading = true
                this.formItemSubmit.status = 2;
                saveUserTaskData(this.formItemSubmit).then(res => {
                    if (res.data.code === 1) {
                        this.$Message.success(res.data.msg)
                        this.modalSubmit.loading = false
                        this.getSubmitList()
                        this.cancelSubmit()
                        this.getList()
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                })
            },
            cancelSubmit() {
                this.modalSubmit.show = false
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
            changeSubmitPage (page) {
                this.SubmitShow.currentPage = page;
                this.getSubmitList();
            },
            changeSubmitSize (size) {
                this.submitShow.pageSize = size;
                this.getSubmitList();
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
            getSubmitList () {
                this.submitLoading = true;
                getSubmitDataList(this.submitShow, this.searchConfSubmit).then(res => {
                    this.submitData = res.data.data.list
                    this.submitShow.listCount = res.data.data.count
                    this.submitLoading = false
                })
            }
        },
        mounted () {
            this.uploadListShow = this.$refs.uploadShow.fileList;
            this.uploadListSubmit = this.$refs.uploadSubmit.fileList;
        }
    }
</script>

<style scoped>
    .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<style>
</style>
