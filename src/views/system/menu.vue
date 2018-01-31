<style lang="less">
    @import './menu.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title" style="height: 32px">
                        <Button type="primary" icon="plus-round">新增</Button>
                    </p>
                    <div>
                        <Table :columns="columnsList" :data="tableData" border disabled-hover></Table>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal v-model="modalSetting.show" width="668" :styles="{top: '30px'}">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="information-circled"></Icon>
                <span>轮播详情</span>
            </p>
            <Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
                <FormItem label="轮播图片" prop="imageUrl">
                    <div class="demo-upload-list-banner" v-if="formItem.Url">
                        <img :src="formItem.Url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                        </div>
                    </div>
                    <input v-if="formItem.Url" v-model="formItem.Url" type="hidden" name="image">
                </FormItem>
                <FormItem label="广告排序">
                    <InputNumber :min="0" v-model="formItem.order"></InputNumber>
                    <Badge count="数字越大越靠前" style="margin-left:5px"></Badge>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="ok" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import axios from 'axios';
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
                    vm.formItem.videoId = currentRow.videoId;
                    vm.formItem.imageUrl = currentRow.image;
                    vm.formItem.order = currentRow.id;
                    vm.formItem.videoName = currentRow.searchKey;
                    vm.modalSetting.show = true;
                }
            }
        }, '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗?',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    let editRow = vm.thisTableData[index];
                    axios.get('Banner/del', {
                        params: {
                            id: currentRow.id
                        }
                    }).then(function (response) {
                        editRow.loading = false;
                        if (response.data.code === 1) {
                            vm.thisTableData.splice(index, 1);
                            vm.$Message.success(response.data.msg);
                        } else {
                            vm.$Message.error(response.data.msg);
                        }
                    });
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
                    loading: currentRow.isDeleting
                }
            }, '删除')
        ]);
    };
    export default {
        name: 'system_menu',
        data () {
            return {
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '菜单名称',
                        align: 'left',
                        key: 'showName',
                        width: 300
                    },
                    {
                        title: '排序',
                        align: 'center',
                        key: 'sort',
                        width: 80
                    },
                    {
                        title: '菜单URL',
                        align: 'left',
                        key: 'url',
                        width: 180
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'hide',
                        width: 80
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }
                ],
                tableData: [],
                modalSetting: {
                    show: false,
                    loading: false
                },
                formItem: {
                    videoId: '',
                    imageUrl: '',
                    order: 0,
                    id: 0
                }
            };
        },
        created () {
            this.init();
            this.getList();
        },
        methods: {
            init () {
                let vm = this;
                this.columnsList.forEach(item => {
                    if (item.handle) {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                editButton(vm, h, currentRowData, param.index),
                                deleteButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                    if (item.key === 'hide') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            if (currentRowData.hide === 1) {
                                return h('Badge', {
                                    attrs: {
                                        count: '隐藏'
                                    }
                                });
                            } else {
                                return h('Badge', {
                                    attrs: {
                                        count: '显示',
                                        'class-name': 'badge-success'
                                    }
                                });
                            }
                        };
                    }
                });
            },
            alertAdd () {
                this.modalSetting.show = true;
            },
            ok () {
                let vm = this;
                this.$refs['formItem'].validate((valid) => {
                    if (valid) {
                        let targetUrl = '';
                        vm.modalSetting.loading = true;
                        if (vm.formItem.id === 0) {
                            targetUrl = 'Banner/add';
                        } else {
                            targetUrl = 'Banner/edit';
                        }
                        axios.post(targetUrl, vm.formItem).then(function (response) {
                            if (response.data.code === 1) {
                                vm.$Message.success(response.data.msg);
                            } else {
                                vm.$Message.error(response.data.msg);
                            }
                            vm.cancel();
                            vm.getList();
                        });
                    }
                });
            },
            cancel () {
                this.formItem.imageUrl = '';
                this.formItem.videoId = '';
                this.formItem.id = 0;
                this.formItem.order = 0;
                this.$refs['formItem'].resetFields();
                this.modalSetting.show = false;
                this.modalSetting.loading = false;
            },
            successDel (vm, index) {
                return (callback) => {
                    callback();
                    vm.edittingStore.splice(index, 1);
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                };
            },
            getList () {
                let vm = this;
                axios.get('Menu/index').then(function (response) {
                    if (response.data.code === 1) {
                        vm.tableData = response.data.data.list;
                    } else {
                        vm.$Message.error(response.data.msg);
                    }
                });
            }
        }
    };
</script>
