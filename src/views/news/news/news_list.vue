<template>
    <div>
        <Row>
            <Col span="24">
                <Card style="margin-bottom: 10px">
                    <Form inline>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.news_type_id" clearable placeholder='请选择新闻类型'
                                    style="width:100px">
                                <Option v-for="(newsType, newsTypeIndex) in newsTypeList" :key="newsTypeIndex" :value="newsType.news_type_id">{{newsType.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Input v-model="searchConf.title" clearable placeholder="新闻标题"></Input>
                        </FormItem>
                        <!--<FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.status" clearable placeholder='请选择状态' style="width:100px">
                                <Option value="0">关闭</Option>
                                <Option value="1">开启</Option>
                            </Select>
                        </FormItem>-->
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.status" clearable placeholder='显示设备' style="width:100px">
                                <Option value="0">不限</Option>
                                <Option value="1">PC端</Option>
                                <Option value="2">移动端</Option>
                            </Select>
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
                <span>{{formItem.news_id ? '编辑' : '新增'}}</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="100">
                <FormItem label="新闻类型" prop="news_type_id">
                    <Select v-model="formItem.news_type_id" style="width:200px">
                        <Option v-for="(newsType, newsTypeIndex) in newsTypeList" :key="newsTypeIndex" :value="newsType.news_type_id">{{newsType.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="新闻标题" prop="title">
                    <Input v-model="formItem.title" placeholder="新闻标题"></Input>
                </FormItem>
                <FormItem label="新闻封面" prop="img">
                    <div class="demo-upload-list" v-if="formItem.img">
                        <img :src="formItem.img">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleImgRemove()"></Icon>
                        </div>
                    </div>
                    <input v-if="formItem.img" v-model="formItem.img" type="hidden" name="image">
                    <Upload type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            v-if="!formItem.img"
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
                        <img :src="formItem.img" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="显示设备" prop="status">
                    <RadioGroup v-model="formItem.status">
                        <Radio label="0">不限</Radio>
                        <Radio label="1">PC端</Radio>
                        <Radio label="2">移动端</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="新闻简介" prop="comment">
                    <Input type="textarea" :rows="4" v-model="formItem.comment" placeholder="新闻简介"></Input>
                </FormItem>
                <FormItem label="新闻内容" prop="content">
                    <Upload
                            id="iviewUp"
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSingleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-format-error="handleFormatError"
                            :before-upload="handleBeforeUpload()"
                            type="drag"
                            :action="uploadUrl"
                            :headers="uploadHeader"
                            style="display: none;width:0">
                        <div style="width: 0">
                            <Icon type="ios-camera" size="50"></Icon>
                        </div>
                    </Upload>
                    <quill-editor
                            v-model="formItem.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                    </quill-editor>
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
        <!--查看详情-->
        <Modal
                v-model="modalSeeingCon.show"
                :title="formItem.title"
                width="1000"
                :styles="{top: '30px'}">
            <div v-html="formItem.content"></div>
        </Modal>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../../../build/config';
    import {getDataList, saveData, deleteData, change} from '@/api/news_list'
    import {quillEditor} from 'vue-quill-editor';

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
                    vm.formItem.news_id = currentRow.news_id;
                    vm.formItem.news_type_id = currentRow.news_type_id;
                    vm.formItem.title = currentRow.title;
                    vm.formItem.img = currentRow.img;
                    vm.formItem.status = currentRow.status;
                    vm.formItem.comment = currentRow.comment;
                    vm.formItem.content = currentRow.content;
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
                    deleteData({news_id: currentRow.news_id}).then(res => {
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
    // 查看详情
    const seeButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'success',
                size: 'small'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.formItem.title = currentRow.title;
                    vm.formItem.content = currentRow.content;
                    vm.modalSeeingCon.show = true;
                }
            }
        }, '查看');
    };

    export default {
        name: 'news_list',
        components: {
            quillEditor
        },
        data() {
            return {
                columnsList: [{title: "新闻id", key: "news_id", align: "center"}, {
                    title: "新闻类型",
                    key: "news_type_name",
                    align: "center"
                }, {title: "新闻标题", key: "title", align: "center"}, {title: "新闻封面", key: "img", align: "center"}, {title: "新闻简介", key: "comment", align: "center"},  {
                    title: "新闻内容",
                    key: "content",
                    align: "center"
                },
                    {title: "显示设备", key: "status", align: "center"},
                    {
                    title: "操作",
                    key: "handle",
                    align: "center",
                    handle: ["edit", "delete"]
                }],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {news_type_id: '', title: "", status: ''},
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                modalSeeingCon: {
                    show: false
                },
                // 初始化图片弹出框
                modalSeeingImg: {
                    img: '',
                    show: false
                },
                visible: false,
                uploadUrl: '',
                uploadHeader: {},
                editorOption: {
                    modules: {
                        toolbar: {
                            container: [
                                [{'size': ['small', false, 'large', 'huge']}],
                                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'clean'],
                                [{'header': 1}, {'header': 2}],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                [{'script': 'sub'}, {'script': 'super'}],
                                [{'align': []}],
                                [{'color': []}, {'background': []}],
                                ['link', 'image']
                            ],
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        console.log('image')
                                        document.querySelector('#iviewUp input').click();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                },
                                'link': function (value) {
                                    if (value) {
                                        console.log('link')
                                        var href = prompt('Enter the URL');
                                        this.quill.format('link', href);
                                    } else {
                                        this.quill.format('link', false);
                                    }
                                }
                            }
                        }
                    }
                },
                formItem: {news_id: 0, news_type_id: '', title: "", status: "", comment: "",  img: "", content: ""},
                ruleValidate: {
                    news_type_id: [{required: true, message: "请选择新闻类型", trigger: "change"}],
                    title: [{required: true, message: "请输入新闻标题", trigger: "blur"}],
                    img: [{required: true, message: "请上传图片", trigger: "blur"}],
                    status: [{required: true, message: "请选择显示设备", trigger: "change"}],
                    comment: [{required: true, message: "请输入新闻简介", trigger: "blur"}]
                },
                loading: true,
                newsTypeList: []
            }
        },
        created() {
            let vm = this
            this.init()
            this.getList()
            this.uploadUrl = config.baseUrl + 'Index/upload';
            this.uploadHeader = {'ApiAuth': sessionStorage.getItem('apiAuth')};
            axios.get('NewsType/getList').then(function (response) {
                if (response.data.code === 1) {
                    vm.newsTypeList = response.data.data.list;
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
                    if (item.key === 'news_type_id') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('Tag', {
                                attrs: {
                                    color: 'blue'
                                }
                            }, currentRowData.news_type_id);
                        };
                    }
                    if (item.key === 'img') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            if (currentRowData.img) {
                                return h('img', {
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        margin: '5px 0'
                                    },
                                    attrs: {
                                        src: currentRowData.img,
                                        shape: 'square',
                                        size: 'large'
                                    },
                                    on: {
                                        click: (e) => {
                                            vm.modalSeeingImg.img = currentRowData.img;
                                            vm.modalSeeingImg.show = true;
                                        }
                                    }
                                });
                            } else {
                                return h('Tag', {}, '暂无图片');
                            }
                        };
                    }
                    if (item.key === 'content') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                seeButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                    if (item.key === 'status') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            switch (currentRowData.status) {
                                case '0':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'default'
                                        }
                                    }, '不限');
                                    break;
                                case '1':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'green'
                                        }
                                    }, 'PC端');
                                    break;
                                case '2':
                                    return h('Tag', {
                                        attrs: {
                                            color: 'orange'
                                        }
                                    }, '移动端');
                                    break;
                            }
                        };
                    }
                })
            },
            alertAdd() {
                this.formItem.news_id = 0
                this.modalSetting.show = true
            },
            handleView() {
                this.visible = true;
            },
            handleImgRemove() {
                this.formItem.img = '';
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
                    this.formItem.img = response.data.fileUrl;
                } else {
                    this.$Message.error(response.msg);
                }
            },
            // 富文本编辑器中上传图片
            handleSingleSuccess(res, file) {
                // 获取富文本组件实例
                let vm = this
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === 1) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data.fileUrl)
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    vm.$Message.error('图片插入失败');
                }
            },
            handleFormatError() {
            },
            handleBeforeUpload() {
            },
            onEditorBlur() {
            },
            onEditorFocus() {
            },
            onEditorChange() {
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
                    this.formItem.news_id = 0
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
    .ql-editor, .ql-blank {
        height: 200px;
    }
</style>
