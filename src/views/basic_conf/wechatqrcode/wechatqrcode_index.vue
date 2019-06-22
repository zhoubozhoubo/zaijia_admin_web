<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                一键分享海报
            </p>
            <div>
                <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                    <FormItem label="一键分享海报" prop="wechat_qr_code">
                        <div class="demo-upload-list" v-if="formItem.wechat_qr_code">
                            <img :src="formItem.wechat_qr_code">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleImgRemove()"></Icon>
                            </div>
                        </div>
                        <input v-if="formItem.wechat_qr_code" v-model="formItem.wechat_qr_code" type="hidden" name="image">
                        <Upload type="drag"
                                :action="uploadUrl"
                                :headers="uploadHeader"
                                v-if="!formItem.wechat_qr_code"
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
                            <img :src="formItem.wechat_qr_code" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                    <div>
                        <Button type="primary" style="width: 100px; margin-left: 80px;" :loading="saveLoading" @click="submit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../../../build/config';

    export default {
        name: 'wechatqrcode_index',
        data () {
            return {
                saveLoading: false,
                formItem: {
                    wechat_qr_code: ''
                },
                ruleValidate: {
                    wechat_qr_code: [{required: true, message: "请上传图片", trigger: "change"}]
                },
                // 初始化图片弹出框
                modalSeeingImg: {
                    wechat_qr_code: '',
                    show: false
                },
                visible: false,
                uploadUrl: '',
                uploadHeader: {}
            };
        },
        methods: {
            submit() {
                let vm = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        axios.post('BasicConf/saveWechatQrCode', vm.formItem).then(function (response) {
                            if (response.data.code === 1) {
                                vm.$Message.success(response.data.msg);
                                vm.saveLoading = false;
                            }else{
                                vm.$Message.fail(response.data.msg);
                                vm.saveLoading = false;
                            }
                        });
                    }
                })
            },
            handleView() {
                this.visible = true;
            },
            handleImgRemove() {
                this.formItem.wechat_qr_code = '';
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
                    this.formItem.wechat_qr_code = response.data.fileUrl;
                } else {
                    this.$Message.error(response.msg);
                }
            },
            init () {
                this.uploadUrl = config.baseUrl + 'Index/upload';
                this.uploadHeader = {'ApiAuth': sessionStorage.getItem('apiAuth')};
                let vm = this;
                axios.get('BasicConf/wechatQrCode').then(function (res) {
                    if (res.data.code === 1) {
                        vm.formItem.wechat_qr_code = res.data.data
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
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