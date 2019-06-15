<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                联系客服
            </p>
            <div>
                <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                    <FormItem label="联系客服" prop="step">
                        <Row v-for="(item, index) in formItem.step" :key="index" style="margin-bottom: 10px;">
                            <Col span="10">
                                <Input v-model="formItem.step[index]" :placeholder="'联系客服' + (index-0+1)"></Input>
                            </Col>
                            <Col span="1" offset="1" v-if="index > 1">
                                <Icon type="md-close-circle" size="20" color="#ed4014" @click="delStep(index)"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="4">
                                <Button type="primary" ghost icon="md-add" @click="addStep">添加联系</Button>
                            </Col>
                        </Row>
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
        name: 'customer_index',
        data () {
            return {
                saveLoading: false,
                formItem: {
                    step: ['','']
                },
                ruleValidate: {}
            };
        },
        methods: {
            addStep () {
                this.formItem.step.push('')
            },
            delStep (index) {
                this.formItem.step.splice(index, 1)
            },
            confirmSubmit () {
                this.confirmSub = true;
            },
            submit () {
                let vm = this;
                this.saveLoading = true;
                axios.post('BasicConf/saveCustomer', vm.formItem).then(function (response) {
                    if (response.data.code === 1) {
                        vm.$Message.success(response.data.msg);
                        vm.saveLoading = false;
                    }else{
                        vm.$Message.fail(response.data.msg);
                        vm.saveLoading = false;
                    }
                });
            },
            init () {
                let vm = this;
                axios.get('BasicConf/customer').then(function (res) {
                    if (res.data.code === 1) {
                        vm.formItem.step = res.data.data
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
