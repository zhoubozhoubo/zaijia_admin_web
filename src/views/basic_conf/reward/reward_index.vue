<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="md-person"></Icon>
                关注奖励配置
            </p>
            <div>
                <Form ref="myForm" :label-width="100">
                    <FormItem label="第一次关注奖励">
                        <Input v-model="first_follow_money.value" placeholder="第一次关注奖励金额(元)" style="width: 100px;"></Input>
                    </FormItem>
                    <FormItem label="邀请新人奖励">
                        <Input v-model="invite_new_money.value" placeholder="邀请新人奖励金额(元)" style="width: 100px;"></Input>
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
        name: 'reward_index',
        data () {
            return {
                saveLoading: false,
                first_follow_money: {
                    value: 0
                },
                invite_new_money: {
                    value: 0
                }
            };
        },
        methods: {
            submit () {
                let vm = this;
                this.saveLoading = true;
                axios.post('BasicConf/saveReward', {first_follow_money:vm.first_follow_money.value,invite_new_money:vm.invite_new_money.value}).then(function (response) {
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
                axios.get('BasicConf/reward').then(function (res) {
                    if (res.data.code === 1) {
                        vm.first_follow_money = res.data.data[0]
                        vm.invite_new_money = res.data.data[1]
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
