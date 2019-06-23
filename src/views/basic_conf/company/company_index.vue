<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                公司简介
            </p>
            <div>
                <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                    <FormItem label="公司简介" prop="company">
                        <Input v-model="formItem.company" type="textarea" :rows="4" placeholder="公司简介"></Input>
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
        name: 'company_index',
        data () {
            return {
                saveLoading: false,
                formItem: {
                    company: ''
                },
                ruleValidate: {
                    company: [{required: true, message: "请输入公司简介", trigger: "blur"}]
                }
            };
        },
        methods: {
            submit () {
                let vm = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        axios.post('BasicConf/saveCompany', vm.formItem).then(function (response) {
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
                axios.get('BasicConf/company').then(function (res) {
                    if (res.data.code === 1) {
                        vm.formItem.company = res.data.data
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
