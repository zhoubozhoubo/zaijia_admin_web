webpackJsonp([11],{245:function(n,t,e){"use strict";function a(n){m||(e(902),e(904))}Object.defineProperty(t,"__esModule",{value:!0});var i=e(477),s=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);var r=e(907),l=(e.n(r),e(4)),m=!1,d=a,c=Object(l.a)(s.a,r.render,r.staticRenderFns,!1,d,"data-v-40a27eae",null);c.options.__file="src/views/task/task/task_list.vue",t.default=c.exports},477:function(n,t,e){"use strict";function a(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(t,"__esModule",{value:!0});var i=e(33),s=a(i),o=e(55),r=a(o),l=e(906),m=function(n,t,e,a){return t("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){n.formItemEdit.task_id=e.task_id,n.formItemEdit.title=e.title,n.formItemEdit.end_date=e.end_date,n.modalEditting.show=!0,n.modalEditting.index=a}}},"编辑")},d=function(n,t,e,a){return t("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗? ",transfer:!0},on:{"on-ok":function(){(0,l.deleteData)({task_id:e.task_id}).then(function(t){1===t.data.code?(n.tableData.splice(a,1),n.$Message.success(t.data.msg)):n.$Message.error(t.data.msg)},function(t){n.$Message.error(t.data.msg)})}}},[t("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"删除")])},c=function(n,t,e,a,i){var s="",o=0;return 1===i?(s="warning",o=e.wait_check):2===i?(s="success",o=e.have_pass):3===i&&(s="error",o=e.no_pass),t("Button",{props:{type:s,ghost:!0},on:{click:function(){n.searchConfSubmit.task_id=e.task_id,n.searchConfSubmit.status=i,1===i?n.modalSeeingSubmit.status="待审核":2===i?n.modalSeeingSubmit.status="已通过":3===i&&(n.modalSeeingSubmit.status="未通过"),n.modalSeeingSubmit.title=e.title,n.modalSeeingSubmit.show=!0,n.getSubmitList()}}},o)},u=function(n,t,e,a){return t("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){n.formItemSubmit.id=e.id,n.modalSubmit.nickname=e.nickname,n.modalSubmit.submit_img=e.submit_img,n.modalSubmit.submit_text=e.submit_text,n.modalSubmit.status=e.status,n.modalSubmit.show=!0,n.modalSubmit.index=a}}},"查看")},p=function(n,t,e,a){return t("Poptip",{props:{confirm:!0,title:"您确定要不通过这条数据吗? ",transfer:!0},on:{"on-ok":function(){n.formItemSubmit.id=e.id,n.formItemSubmit.status=3,(0,l.saveUserTaskData)(n.formItemSubmit).then(function(t){1===t.data.code?(n.submitData.splice(a,1),n.$Message.success(t.data.msg),n.getList()):n.$Message.error(t.data.msg)})}}},[t("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"拒绝")])};t.default={name:"task_list",components:{},data:function(){return{columnsList:[{title:"id",key:"task_id",align:"center",width:80,fixed:"left"},{title:"任务类型",key:"task_type_name",align:"center",width:100,fixed:"left"},{title:"任务标题",key:"title",align:"center",width:200,fixed:"left"},{title:"任务金额",key:"money",align:"center",width:100,fixed:"left"},{title:"任务数量",key:"number",align:"center",width:100},{title:"已领数量",key:"have_number",align:"center",width:100},{title:"待审核",key:"wait_check",align:"center",width:80},{title:"已通过",key:"have_pass",align:"center",width:80},{title:"未通过",key:"no_pass",align:"center",width:80},{title:"截止日期",key:"end_date",align:"center",width:100},{title:"验收时长",key:"check_duration",align:"center",width:100},{title:"完成时长",key:"finish_duration",align:"center",width:100},{title:"是否重复",key:"is_repeat",align:"center",width:100},{title:"地区",key:"city_name",align:"center",width:120},{title:"状态",key:"status",align:"center",width:100},{title:"创建时间",key:"gmt_create",align:"center",width:150},{title:"操作",key:"handle",align:"center",handle:["edit","delete"],width:180,fixed:"right"}],submitColumns:[{title:"序号",type:"index",width:65,align:"center"},{title:"用户头像",align:"center",key:"avatarurl",width:100},{title:"用户昵称",align:"center",key:"nickname"},{title:"用户手机号",align:"center",key:"phone"},{title:"提交时间",align:"center",key:"submit_time"},{title:"审核时间",align:"center",key:"check_time"},{title:"操作",key:"handle",align:"center",handle:["edit","delete"],width:180}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},submitLoading:!1,submitData:[],submitShow:{currentPage:1,pageSize:10,listCount:0},searchConf:{task_type_id:"",title:"",is_repeat:"",area:[],device:"",submit_way:"",status:"",gmt_create:""},searchConfSubmit:{task_id:"",status:""},modalSetting:{show:!1,loading:!1,index:0},modalEditting:{show:!1,loading:!1,index:0},modalSeeingSubmit:{show:!1,loading:!1,title:"",status:"",index:0},modalSubmit:{show:!1,loading:!1,nickname:"",submit_img:[],submit_text:"",status:"",index:0},modalSeeingImg:{img:"",show:!1},visible:!1,uploadUrl:"",uploadHeader:{},formItem:{task_id:0,task_type_id:"",title:"",money:"",number:"",end_date:"",check_duration:"",finish_duration:"",is_repeat:0,area:[],step:["","",""],link:"",show_img:[],take_care:"",device:0,submit_way:"",submit_notice:"",submit_img:[]},formItemEdit:{task_id:"",title:"",number:"",end_date:""},formItemSubmit:{id:"",status:2},ruleValidate:{task_type_id:[{required:!0,message:"请选择任务类型",trigger:"change"}],title:[{required:!0,message:"请输入任务标题",trigger:"blur"}],money:[{required:!0,message:"请输入任务金额",trigger:"blur"}],number:[{required:!0,message:"请输入任务数量",trigger:"blur"}],end_date:[{required:!0,message:"请选择任务截止日期",trigger:"change",type:"date"}],check_duration:[{required:!0,message:"请输入验收时长",trigger:"blur"}],finish_duration:[{required:!0,message:"请选择完成时长",trigger:"change"}],is_repeat:[{required:!0,message:"请选择是否重复",trigger:"change"}],step:[{required:!0,message:"请填写任务步骤",trigger:"change",type:"array"}],take_care:[{required:!0,message:"请输入注意事项",trigger:"blur"}],device:[{required:!0,message:"请选择设备类型",trigger:"change"}],submit_way:[{required:!0,message:"请选择提交方式",trigger:"change"}],submit_notice:[{required:!0,message:"请输入提交说明",trigger:"blur"}]},ruleValidateEdit:{number:[{required:!0,message:"请输入任务数量",trigger:"blur"}],end_date:[{required:!0,message:"请选择任务截止日期",trigger:"change",type:"date"}]},loading:!0,taskTypeList:[],AreaList:[],showImgUrl:"",uploadListSubmit:[],uploadListShow:[]}},created:function(){var n=this;this.init(),this.submitinit(),this.getList(),this.uploadUrl=r.default.baseUrl+"Index/upload",this.uploadHeader={ApiAuth:sessionStorage.getItem("apiAuth")},s.default.get("TaskType/getList").then(function(t){1===t.data.code&&(n.taskTypeList=t.data.data.list)}),s.default.get("AreaCon/getList").then(function(t){1===t.data.code&&(n.AreaList=t.data.data)})},methods:{init:function(){var n=this;this.columnsList.forEach(function(t){"handle"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("div",[m(n,t,a,e.index),d(n,t,a,e.index)])}),"money"===t.key&&(t.render=function(t,e){return t("Tag",{attrs:{color:"gold"}},n.tableData[e.index].money)}),"wait_check"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("div",[c(n,t,a,e.index,1)])}),"have_pass"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("div",[c(n,t,a,e.index,2)])}),"no_pass"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("div",[c(n,t,a,e.index,3)])}),"is_repeat"===t.key&&(t.render=function(t,e){switch(n.tableData[e.index].is_repeat){case"0":return t("Tag",{attrs:{color:"red"}},"不重复");case"1":return t("Tag",{attrs:{color:"green"}},"重复")}}),"city_name"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return"0"==a.city&&(a.city_name="全国"),t("Tag",{attrs:{color:"blue"}},a.city_name)}),"status"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("i-switch",{attrs:{size:"large"},props:{"true-value":"1","false-value":"0",value:a.status},on:{"on-change":function(t){(0,l.change)({task_id:a.task_id,status:t}).then(function(t){n.$Message.success(t.data.msg),n.cancel()},function(t){n.$Message.error(res.data.msg),n.cancel()})}}},[t("span",{slot:"open"},"开启"),t("span",{slot:"close"},"关闭")])})})},submitinit:function(){var n=this;this.submitColumns.forEach(function(t){"avatarurl"===t.key&&(t.render=function(t,e){var a=n.submitData[e.index];return a.avatarurl?t("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.avatarurl,shape:"square",size:"large"},on:{click:function(t){n.modalSeeingImg.img=a.avatarurl,n.modalSeeingImg.show=!0}}}):t("Tag",{},"暂无图片")}),"status"===t.key&&(t.render=function(t,e){return t("Tag",{attrs:{color:"blue"}},n.submitData[e.index].status)}),"handle"===t.key&&(t.render=function(t,e){var a=n.submitData[e.index];return 1==a.status?t("div",[u(n,t,a,e.index),p(n,t,a,e.index)]):2==a.status||3==a.status?t("div",[u(n,t,a,e.index)]):void 0})})},changeTime:function(n){console.log(n)},alertAdd:function(){this.formItem.task_id=0,this.formItem.show_img=[],this.formItem.submit_img=[],this.$refs.uploadShow.fileList="",this.$refs.uploadSubmit.fileList="",this.modalSetting.show=!0},addStep:function(){this.formItem.step.push("")},delStep:function(n){this.formItem.step.splice(n,1)},handleView:function(n){this.showImgUrl=n,this.visible=!0},handleRemoveShow:function(n){var t=this.$refs.uploadShow.fileList;this.$refs.uploadShow.fileList.splice(t.indexOf(n),1)},handleRemoveSubmit:function(n){var t=this.$refs.uploadSubmit.fileList;this.$refs.uploadSubmit.fileList.splice(t.indexOf(n),1)},handleSuccess:function(n,t){t.url=n.data.fileUrl,t.name=n.data.fileName},handleFormatError:function(n){this.$Notice.warning({title:"The file format is incorrect",desc:"File format of "+n.name+" is incorrect, please select jpg or png."})},handleMaxSize:function(n){this.$Notice.warning({title:"Exceeding file size limit",desc:"File  "+n.name+" is too large, no more than 2M."})},handleSuccessSubmit:function(n,t){t.url=n.data.fileUrl,t.name=n.data.fileName},handleFormatErrorSubmit:function(n){this.$Notice.warning({title:"The file format is incorrect",desc:"File format of "+n.name+" is incorrect, please select jpg or png."})},handleMaxSizeSubmit:function(n){this.$Notice.warning({title:"Exceeding file size limit",desc:"File  "+n.name+" is too large, no more than 2M."})},submit:function(){for(var n=this,t=0;t<this.uploadListShow.length;t++)this.formItem.show_img[t]=this.uploadListShow[t].url;if(2==this.formItem.submit_way)for(var e=0;e<this.uploadListSubmit.length;e++)this.formItem.submit_img[e]=this.uploadListSubmit[e].url;this.$refs.myForm.validate(function(t){t&&(n.modalSetting.loading=!0,(0,l.saveData)(n.formItem).then(function(t){1===t.data.code?(n.$Message.success(t.data.msg),n.getList(),n.cancel(),n.formItem.step=["","",""],n.$refs.uploadShow.fileList="",n.$refs.uploadSubmit.fileList=""):n.$Message.error(t.data.msg)}))})},cancel:function(){this.modalSetting.show=!1},submitEdit:function(){var n=this;this.$refs.myFormEdit.validate(function(t){t&&(n.modalEditting.loading=!0,(0,l.saveData)(n.formItemEdit).then(function(t){1===t.data.code?(n.$Message.success(t.data.msg),n.getList(),n.cancelEdit()):n.$Message.error(t.data.msg)}))})},cancelEdit:function(){this.modalEditting.show=!1},passSubmit:function(){var n=this;this.modalSubmit.loading=!0,this.formItemSubmit.status=2,(0,l.saveUserTaskData)(this.formItemSubmit).then(function(t){1===t.data.code?(n.$Message.success(t.data.msg),n.modalSubmit.loading=!1,n.getSubmitList(),n.cancelSubmit(),n.getList()):n.$Message.error(t.data.msg)})},cancelSubmit:function(){this.modalSubmit.show=!1},doCancel:function(n){n||(this.formItem.task_id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)},changePage:function(n){this.tableShow.currentPage=n,this.getList()},changeSize:function(n){this.tableShow.pageSize=n,this.getList()},changeSubmitPage:function(n){this.SubmitShow.currentPage=n,this.getSubmitList()},changeSubmitSize:function(n){this.submitShow.pageSize=n,this.getSubmitList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var n=this;this.loading=!0,(0,l.getDataList)(this.tableShow,this.searchConf).then(function(t){n.tableData=t.data.data.list,n.tableShow.listCount=t.data.data.count,n.loading=!1})},getSubmitList:function(){var n=this;this.submitLoading=!0,(0,l.getSubmitDataList)(this.submitShow,this.searchConfSubmit).then(function(t){n.submitData=t.data.data.list,n.submitShow.listCount=t.data.data.count,n.submitLoading=!1})}},mounted:function(){this.uploadListShow=this.$refs.uploadShow.fileList,this.uploadListSubmit=this.$refs.uploadSubmit.fileList}}},902:function(n,t,e){var a=e(903);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(15).default;i("399405b6",a,!1,{})},903:function(n,t,e){t=n.exports=e(14)(!1),t.push([n.i,"\n.demo-upload-list[data-v-40a27eae]{\n    display: inline-block;\n    width: 60px;\n    height: 60px;\n    text-align: center;\n    line-height: 60px;\n    border: 1px solid transparent;\n    border-radius: 4px;\n    overflow: hidden;\n    background: #fff;\n    position: relative;\n    box-shadow: 0 1px 1px rgba(0,0,0,.2);\n    margin-right: 4px;\n}\n.demo-upload-list img[data-v-40a27eae]{\n    width: 100%;\n    height: 100%;\n}\n.demo-upload-list-cover[data-v-40a27eae]{\n    display: none;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0,0,0,.6);\n}\n.demo-upload-list:hover .demo-upload-list-cover[data-v-40a27eae]{\n    display: block;\n}\n.demo-upload-list-cover i[data-v-40a27eae]{\n    color: #fff;\n    font-size: 20px;\n    cursor: pointer;\n    margin: 0 2px;\n}\n",""])},904:function(n,t,e){var a=e(905);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(15).default;i("a27346d0",a,!1,{})},905:function(n,t,e){t=n.exports=e(14)(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},906:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.saveUserTaskData=t.getSubmitDataList=t.deleteData=t.change=t.saveData=t.getDataList=void 0;var a=e(33),i=function(n){return n&&n.__esModule?n:{default:n}}(a);t.getDataList=function(n,t){return i.default.get("Task/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:t}})},t.saveData=function(n){return i.default.post("Task/save",n)},t.change=function(n){return i.default.post("Task/change",n)},t.deleteData=function(n){return i.default.post("Task/delete",n)},t.getSubmitDataList=function(n,t){return i.default.get("UserTask/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:t}})},t.saveUserTaskData=function(n){return i.default.post("UserTask/save",n)}},907:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",{staticStyle:{"margin-bottom":"10px"}},[e("Form",{attrs:{inline:""}},[e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"任务类型"},model:{value:n.searchConf.task_type_id,callback:function(t){n.$set(n.searchConf,"task_type_id",t)},expression:"searchConf.task_type_id"}},n._l(n.taskTypeList,function(t,a){return e("Option",{key:a,attrs:{value:t.id}},[n._v(n._s(t.name))])}),1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Input",{attrs:{clearable:"",placeholder:"任务标题"},model:{value:n.searchConf.title,callback:function(t){n.$set(n.searchConf,"title",t)},expression:"searchConf.title"}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"是否重复"},model:{value:n.searchConf.is_repeat,callback:function(t){n.$set(n.searchConf,"is_repeat",t)},expression:"searchConf.is_repeat"}},[e("Option",{attrs:{value:"0"}},[n._v("不重复")]),n._v(" "),e("Option",{attrs:{value:"1"}},[n._v("重复")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Cascader",{attrs:{data:n.AreaList,trigger:"hover",placeholder:"请选择地区"},model:{value:n.searchConf.area,callback:function(t){n.$set(n.searchConf,"area",t)},expression:"searchConf.area"}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"设备类型"},model:{value:n.searchConf.device,callback:function(t){n.$set(n.searchConf,"device",t)},expression:"searchConf.device"}},[e("Option",{attrs:{value:"0"}},[n._v("不限")]),n._v(" "),e("Option",{attrs:{value:"1"}},[n._v("安卓")]),n._v(" "),e("Option",{attrs:{value:"2"}},[n._v("IOS")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"提交方式"},model:{value:n.searchConf.submit_way,callback:function(t){n.$set(n.searchConf,"submit_way",t)},expression:"searchConf.submit_way"}},[e("Option",{attrs:{value:"1"}},[n._v("文本")]),n._v(" "),e("Option",{attrs:{value:"2"}},[n._v("文本+截图")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"任务状态"},model:{value:n.searchConf.status,callback:function(t){n.$set(n.searchConf,"status",t)},expression:"searchConf.status"}},[e("Option",{attrs:{value:"0"}},[n._v("关闭")]),n._v(" "),e("Option",{attrs:{value:"1"}},[n._v("开启")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placeholder:"发布日期范围"},on:{"on-change":function(t){n.searchConf.gmt_create=t}}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:n.search}},[n._v("查询/刷新")])],1)],1)],1)],1)],1),n._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",[e("p",{staticStyle:{height:"40px"},attrs:{slot:"title"},slot:"title"},[e("Button",{attrs:{type:"primary",icon:"md-add"},on:{click:n.alertAdd}},[n._v("新增")])],1),n._v(" "),e("div",[e("Table",{attrs:{loading:n.loading,columns:n.columnsList,data:n.tableData,border:"","disabled-hover":""}})],1),n._v(" "),e("div",{staticStyle:{"text-align":"center","margin-top":"15px"}},[e("Page",{attrs:{total:n.tableShow.listCount,current:n.tableShow.currentPage,"page-size":n.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changePage,"on-page-size-change":n.changeSize}})],1)])],1)],1),n._v(" "),e("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSetting.show,callback:function(t){n.$set(n.modalSetting,"show",t)},expression:"modalSetting.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v("新增")])],1),n._v(" "),e("Form",{ref:"myForm",attrs:{rules:n.ruleValidate,model:n.formItem,"label-width":100}},[e("FormItem",{attrs:{label:"任务类型",prop:"task_type_id"}},[e("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择任务类型"},model:{value:n.formItem.task_type_id,callback:function(t){n.$set(n.formItem,"task_type_id",t)},expression:"formItem.task_type_id"}},n._l(n.taskTypeList,function(t,a){return e("Option",{key:a,attrs:{value:t.id}},[n._v(n._s(t.name))])}),1)],1),n._v(" "),e("FormItem",{attrs:{label:"任务标题",prop:"title"}},[e("Input",{attrs:{placeholder:"任务标题"},model:{value:n.formItem.title,callback:function(t){n.$set(n.formItem,"title",t)},expression:"formItem.title"}})],1),n._v(" "),e("FormItem",{attrs:{label:"任务金额",prop:"money"}},[e("Input",{attrs:{placeholder:"任务金额"},model:{value:n.formItem.money,callback:function(t){n.$set(n.formItem,"money",t)},expression:"formItem.money"}})],1),n._v(" "),e("FormItem",{attrs:{label:"任务数量",prop:"number"}},[e("Input",{attrs:{placeholder:"任务数量"},model:{value:n.formItem.number,callback:function(t){n.$set(n.formItem,"number",t)},expression:"formItem.number"}})],1),n._v(" "),e("FormItem",{attrs:{label:"截止日期",prop:"end_date"}},[e("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"任务截止日期",format:"yyyy-MM-dd"},model:{value:n.formItem.end_date,callback:function(t){n.$set(n.formItem,"end_date",t)},expression:"formItem.end_date"}})],1),n._v(" "),e("FormItem",{attrs:{label:"验收时长",prop:"check_duration"}},[e("Input",{attrs:{placeholder:"验收时长"},model:{value:n.formItem.check_duration,callback:function(t){n.$set(n.formItem,"check_duration",t)},expression:"formItem.check_duration"}})],1),n._v(" "),e("FormItem",{attrs:{label:"完成时长",prop:"finish_duration"}},[e("Select",{staticStyle:{width:"200px"},model:{value:n.formItem.finish_duration,callback:function(t){n.$set(n.formItem,"finish_duration",t)},expression:"formItem.finish_duration"}},[e("Option",{attrs:{value:"30"}},[n._v("0.5小时")]),n._v(" "),e("Option",{attrs:{value:"1"}},[n._v("1小时")]),n._v(" "),e("Option",{attrs:{value:"2"}},[n._v("2小时")]),n._v(" "),e("Option",{attrs:{value:"12"}},[n._v("12小时")]),n._v(" "),e("Option",{attrs:{value:"24"}},[n._v("24小时")])],1)],1),n._v(" "),e("FormItem",{attrs:{label:"是否重复",prop:"is_repeat"}},[e("RadioGroup",{model:{value:n.formItem.is_repeat,callback:function(t){n.$set(n.formItem,"is_repeat",t)},expression:"formItem.is_repeat"}},[e("Radio",{attrs:{label:"0"}},[n._v("不重复")]),n._v(" "),e("Radio",{attrs:{label:"1"}},[n._v("重复")])],1)],1),n._v(" "),e("FormItem",{attrs:{label:"地区"}},[e("Cascader",{attrs:{data:n.AreaList,trigger:"hover",placeholder:"请选择地区,不选则为全国"},model:{value:n.formItem.area,callback:function(t){n.$set(n.formItem,"area",t)},expression:"formItem.area"}})],1),n._v(" "),e("FormItem",{attrs:{label:"任务步骤",prop:"step"}},[n._l(n.formItem.step,function(t,a){return e("Row",{key:a,staticStyle:{"margin-bottom":"10px"}},[e("Col",{attrs:{span:"22"}},[e("Input",{attrs:{placeholder:"任务步骤"+(a-0+1)},model:{value:n.formItem.step[a],callback:function(t){n.$set(n.formItem.step,a,t)},expression:"formItem.step[index]"}})],1),n._v(" "),a>2?e("Col",{attrs:{span:"1",offset:"1"}},[e("Icon",{attrs:{type:"md-close-circle",size:"20",color:"#ed4014"},on:{click:function(t){return n.delStep(a)}}})],1):n._e()],1)}),n._v(" "),e("Row",[e("Col",{attrs:{span:"4"}},[e("Button",{attrs:{type:"primary",ghost:"",icon:"md-add"},on:{click:n.addStep}},[n._v("添加步骤")])],1)],1)],2),n._v(" "),e("FormItem",{attrs:{label:"任务链接",prop:"link"}},[e("Input",{attrs:{placeholder:"任务链接"},model:{value:n.formItem.link,callback:function(t){n.$set(n.formItem,"link",t)},expression:"formItem.link"}})],1),n._v(" "),e("FormItem",{attrs:{label:"图片展示"}},[n._l(n.uploadListShow,function(t){return e("div",{staticClass:"demo-upload-list"},["finished"===t.status?[e("img",{attrs:{src:t.url}}),n._v(" "),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(e){return n.handleView(t.url)}}}),n._v(" "),e("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(e){return n.handleRemoveShow(t)}}})],1)]:[t.showProgress?e("Progress",{attrs:{percent:t.percentage,"hide-info":""}}):n._e()]],2)}),n._v(" "),e("Upload",{ref:"uploadShow",staticStyle:{display:"inline-block",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":n.formItem.show_img,"on-success":n.handleSuccess,format:["jpg","jpeg","png"],"max-size":5120,"on-format-error":n.handleFormatError,"on-exceeded-size":n.handleMaxSize,multiple:"",type:"drag",action:n.uploadUrl,headers:n.uploadHeader}},[e("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[e("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),n._v(" "),e("Modal",{attrs:{title:"View Image"},model:{value:n.visible,callback:function(t){n.visible=t},expression:"visible"}},[n.visible?e("img",{staticStyle:{width:"100%"},attrs:{src:n.showImgUrl}}):n._e()])],2),n._v(" "),e("FormItem",{attrs:{label:"注意事项",prop:"take_care"}},[e("Input",{attrs:{type:"textarea",rows:4,placeholder:"注意事项"},model:{value:n.formItem.take_care,callback:function(t){n.$set(n.formItem,"take_care",t)},expression:"formItem.take_care"}})],1),n._v(" "),e("FormItem",{attrs:{label:"设备类型",prop:"device"}},[e("RadioGroup",{model:{value:n.formItem.device,callback:function(t){n.$set(n.formItem,"device",t)},expression:"formItem.device"}},[e("Radio",{attrs:{label:"0"}},[n._v("不限")]),n._v(" "),e("Radio",{attrs:{label:"1"}},[n._v("安卓")]),n._v(" "),e("Radio",{attrs:{label:"2"}},[n._v("IOS")])],1)],1),n._v(" "),e("FormItem",{attrs:{label:"提交方式",prop:"submit_way"}},[e("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"提交方式"},model:{value:n.formItem.submit_way,callback:function(t){n.$set(n.formItem,"submit_way",t)},expression:"formItem.submit_way"}},[e("Option",{attrs:{value:"1"}},[n._v("文本")]),n._v(" "),e("Option",{attrs:{value:"2"}},[n._v("文本+截图")])],1)],1),n._v(" "),e("FormItem",{attrs:{label:"提交说明",prop:"submit_notice"}},[e("Input",{attrs:{type:"textarea",rows:4,placeholder:"提交说明"},model:{value:n.formItem.submit_notice,callback:function(t){n.$set(n.formItem,"submit_notice",t)},expression:"formItem.submit_notice"}})],1),n._v(" "),e("FormItem",{directives:[{name:"show",rawName:"v-show",value:2==n.formItem.submit_way,expression:"formItem.submit_way == 2"}],attrs:{label:"提交图片",prop:"submit_img"}},[n._l(n.uploadListSubmit,function(t){return e("div",{staticClass:"demo-upload-list"},["finished"===t.status?[e("img",{attrs:{src:t.url}}),n._v(" "),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(e){return n.handleView(t.url)}}}),n._v(" "),e("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(e){return n.handleRemoveSubmit(t)}}})],1)]:[t.showProgress?e("Progress",{attrs:{percent:t.percentage,"hide-info":""}}):n._e()]],2)}),n._v(" "),e("Upload",{ref:"uploadSubmit",staticStyle:{display:"inline-block",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":n.formItem.submit_img,"on-success":n.handleSuccessSubmit,format:["jpg","jpeg","png"],"max-size":5120,"on-format-error":n.handleFormatErrorSubmit,"on-exceeded-size":n.handleMaxSizeSubmit,multiple:"",type:"drag",action:n.uploadUrl,headers:n.uploadHeader}},[e("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[e("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),n._v(" "),e("Modal",{attrs:{title:"View Image"},model:{value:n.visible,callback:function(t){n.visible=t},expression:"visible"}},[n.visible?e("img",{staticStyle:{width:"100%"},attrs:{src:n.showImgUrl}}):n._e()])],2)],1),n._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancel}},[n._v("取消")]),n._v(" "),e("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submit}},[n._v("确定")])],1)],1),n._v(" "),e("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalEditting.show,callback:function(t){n.$set(n.modalEditting,"show",t)},expression:"modalEditting.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v("编辑")])],1),n._v(" "),e("Form",{ref:"myFormEdit",attrs:{rules:n.ruleValidateEdit,model:n.formItemEdit,"label-width":100}},[e("FormItem",{attrs:{label:"任务标题",prop:"title"}},[e("Input",{attrs:{disabled:"",placeholder:"任务标题"},model:{value:n.formItemEdit.title,callback:function(t){n.$set(n.formItemEdit,"title",t)},expression:"formItemEdit.title"}})],1),n._v(" "),e("FormItem",{attrs:{label:"增加数量",prop:"number"}},[e("Input",{attrs:{placeholder:"增加数量"},model:{value:n.formItemEdit.number,callback:function(t){n.$set(n.formItemEdit,"number",t)},expression:"formItemEdit.number"}})],1),n._v(" "),e("FormItem",{attrs:{label:"截止日期",prop:"end_date"}},[e("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"任务截止日期",format:"yyyy-MM-dd"},model:{value:n.formItemEdit.end_date,callback:function(t){n.$set(n.formItemEdit,"end_date",t)},expression:"formItemEdit.end_date"}})],1)],1),n._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancelEdit}},[n._v("取消")]),n._v(" "),e("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submitEdit}},[n._v("确定")])],1)],1),n._v(" "),e("Modal",{attrs:{width:"998",styles:{top:"30px"}},model:{value:n.modalSeeingSubmit.show,callback:function(t){n.$set(n.modalSeeingSubmit,"show",t)},expression:"modalSeeingSubmit.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v(n._s(n.modalSeeingSubmit.title)+" > 提交列表("+n._s(n.modalSeeingSubmit.status)+")")])],1),n._v(" "),e("div",[e("Table",{attrs:{loading:n.submitLoading,columns:n.submitColumns,data:n.submitData,border:"","disabled-hover":""}})],1),n._v(" "),e("div",{staticClass:"margin-top-15",staticStyle:{"text-align":"center"}},[e("Page",{attrs:{total:n.submitShow.listCount,current:n.submitShow.currentPage,"page-size":n.submitShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changeSubmitPage,"on-page-size-change":n.changeSubmitSize}})],1),n._v(" "),e("p",{attrs:{slot:"footer"},slot:"footer"})]),n._v(" "),e("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSubmit.show,callback:function(t){n.$set(n.modalSubmit,"show",t)},expression:"modalSubmit.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v(n._s(n.modalSubmit.nickname)+" > 提交内容")])],1),n._v(" "),e("Form",{ref:"myFormSubmit",attrs:{model:n.formItemSubmit,"label-width":100}},[e("FormItem",{attrs:{label:"提交图片"}},n._l(n.modalSubmit.submit_img,function(t){return e("div",{staticClass:"demo-upload-list"},[[e("img",{attrs:{src:t}}),n._v(" "),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(e){return n.handleView(t)}}})],1)]],2)}),0),n._v(" "),e("FormItem",{attrs:{label:"提交文本"}},[e("Input",{attrs:{type:"textarea",rows:4,disabled:"",placeholder:"提交文本"},model:{value:n.modalSubmit.submit_text,callback:function(t){n.$set(n.modalSubmit,"submit_text",t)},expression:"modalSubmit.submit_text"}})],1)],1),n._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancelSubmit}},[n._v("取消")]),n._v(" "),1==n.modalSubmit.status?e("Button",{attrs:{type:"primary",loading:n.modalSubmit.loading},on:{click:n.passSubmit}},[n._v("通过")]):n._e()],1)],1),n._v(" "),e("Modal",{attrs:{"class-name":"fl-image-modal"},on:{"on-visible-change":n.doCancel},model:{value:n.modalSeeingImg.show,callback:function(t){n.$set(n.modalSeeingImg,"show",t)},expression:"modalSeeingImg.show"}},[n.modalSeeingImg.show?e("img",{staticStyle:{width:"100%"},attrs:{src:n.modalSeeingImg.img}}):n._e()])],1)},i=[];a._withStripped=!0,t.render=a,t.staticRenderFns=i}});