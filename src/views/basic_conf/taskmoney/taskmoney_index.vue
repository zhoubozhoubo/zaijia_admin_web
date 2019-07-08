<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                任务金额显示配置
            </p>
            <div>
                <Form ref="myForm" :model="formItem" :label-width="80">
                    <FormItem label="任务金额显示状态" prop="taskmoney_status">
                        <RadioGroup v-model="formItem.taskmoney_status">
                            <Radio label="0">
                                <span>关闭</span>
                            </Radio>
                            <Radio label="1">
                                <span>显示</span>
                            </Radio>
                        </RadioGroup>
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
        name: 'taskmoney_index',
        data () {
            return {
                saveLoading: false,
                formItem: {
                    taskmoney_status: ''
                }
            };
        },
        methods: {
            submit () {
                let vm = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        axios.post('BasicConf/saveTaskmoney', vm.formItem).then(function (response) {
                            if (response.data.code === 1) {
                                vm.$Message.success(response.data.msg);
                            }else{
                                vm.$Message.fail(response.data.msg);
                            }
                            vm.saveLoading = false;
                        });
                    }
                })
            },
            init () {
                let vm = this;
                axios.get('BasicConf/taskmoney').then(function (res) {
                    if (res.data.code === 1) {
                        vm.formItem.taskmoney_status = res.data.data
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
