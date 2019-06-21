<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                网站配置
            </p>
            <div>
                <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                    <FormItem label="网站域名" prop="website">
                        <Input v-model="formItem.website" placeholder="网站域名"></Input>
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

    export default {
        name: 'website_index',
        data () {
            return {
                saveLoading: false,
                formItem: {
                    website: ''
                },
                ruleValidate: {
                    website: [{required: true, message: "请输入网站域名", trigger: "blur"}]
                }
            };
        },
        methods: {
            submit () {
                let vm = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        axios.post('BasicConf/saveWebsite', vm.formItem).then(function (response) {
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
            init () {
                let vm = this;
                axios.get('BasicConf/website').then(function (res) {
                    if (res.data.code === 1) {
                        vm.formItem.website = res.data.data
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
