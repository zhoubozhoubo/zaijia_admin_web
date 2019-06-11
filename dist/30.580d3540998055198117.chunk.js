webpackJsonp([30],{235:function(t,e,a){"use strict";function o(t){c||a(864)}Object.defineProperty(e,"__esModule",{value:!0});var n=a(473),s=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);var i=a(866),l=(a.n(i),a(4)),c=!1,d=o,u=Object(l.a)(s.a,i.render,i.staticRenderFns,!1,d,"data-v-7f4affe7",null);u.options.__file="src/views/app/group.vue",e.default=u.exports},473:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(34),n=function(t){return t&&t.__esModule?t:{default:t}}(o),s=function(t,e,a,o){return e("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){t.formItem.id=a.id,t.formItem.name=a.name,t.formItem.hash=a.hash,t.formItem.description=a.description,t.modalSetting.show=!0,t.modalSetting.index=o}}},"编辑")},r=function(t,e,a,o){return e("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗? ",transfer:!0},on:{"on-ok":function(){n.default.get("AppGroup/del",{params:{hash:a.hash}}).then(function(e){a.loading=!1,1===e.data.code?(t.tableData.splice(o,1),t.$Message.success(e.data.msg)):t.$Message.error(e.data.msg)})}}},[e("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top",loading:a.isDeleting}},"删除")])};e.default={name:"interface_group",data:function(){return{columnsList:[{title:"序号",type:"index",width:65,align:"center"},{title:"应用组名称",align:"center",key:"name"},{title:"应用组描述",align:"center",key:"description"},{title:"应用组标识",align:"center",key:"hash",width:130},{title:"应用组状态",align:"center",key:"status",width:100},{title:"操作",align:"center",key:"handle",width:180,handle:["edit","delete"]}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},searchConf:{type:"",keywords:"",status:""},modalSetting:{show:!1,loading:!1,index:0},formItem:{description:"",name:"",hash:"",id:0},ruleValidate:{name:[{required:!0,message:"应用组名称不能为空",trigger:"blur"}]}}},created:function(){this.init(),this.getList()},methods:{init:function(){var t=this;this.columnsList.forEach(function(e){e.handle&&(e.render=function(e,a){var o=t.tableData[a.index];return e("div",[s(t,e,o,a.index),r(t,e,o,a.index)])}),"status"===e.key&&(e.render=function(e,a){var o=t.tableData[a.index];return e("i-switch",{attrs:{size:"large"},props:{"true-value":1,"false-value":0,value:o.status},on:{"on-change":function(e){n.default.get("AppGroup/changeStatus",{params:{status:e,id:o.id}}).then(function(e){var a=e.data;1===a.code?t.$Message.success(a.msg):-14===a.code?(t.$store.commit("logout",t),t.$router.push({name:"login"})):(t.$Message.error(a.msg),t.getList()),t.cancel()})}}},[e("span",{slot:"open"},"启用"),e("span",{slot:"close"},"禁用")])})})},alertAdd:function(){var t=this;n.default.get("InterfaceList/getHash").then(function(e){var a=e.data;1===a.code?t.formItem.hash=a.data.hash:-14===a.code?(t.$store.commit("logout",t),t.$router.push({name:"login"})):t.$Message.error(a.msg)}),this.modalSetting.show=!0},submit:function(){var t=this,e=this;this.$refs.myForm.validate(function(a){if(a){e.modalSetting.loading=!0;var o="";o=0===t.formItem.id?"AppGroup/add":"AppGroup/edit",n.default.post(o,e.formItem).then(function(t){1===t.data.code?e.$Message.success(t.data.msg):e.$Message.error(t.data.msg),e.getList(),e.cancel()})}})},cancel:function(){this.modalSetting.show=!1},changePage:function(t){this.tableShow.currentPage=t,this.getList()},changeSize:function(t){this.tableShow.pageSize=t,this.getList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var t=this;n.default.get("AppGroup/index",{params:{page:t.tableShow.currentPage,size:t.tableShow.pageSize,type:t.searchConf.type,keywords:t.searchConf.keywords,status:t.searchConf.status}}).then(function(e){var a=e.data;1===a.code?(t.tableData=a.data.list,t.tableShow.listCount=a.data.count):-14===a.code?(t.$store.commit("logout",t),t.$router.push({name:"login"})):t.$Message.error(a.msg)})},doCancel:function(t){t||(this.formItem.id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)}}}},864:function(t,e,a){var o=a(865);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=a(16).default;n("733933fb",o,!1,{})},865:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.api-box[data-v-7f4affe7] {\n  max-height: 300px;\n  overflow: auto;\n}\n.api-group[data-v-7f4affe7] {\n  margin-top: 10px;\n  border: 1px solid #dddee1;\n  border-radius: 5px;\n  padding: 10px;\n}\n",""])},866:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",[a("Col",{attrs:{span:"24"}},[a("Card",{staticStyle:{"margin-bottom":"10px"}},[a("Form",{attrs:{inline:""}},[a("FormItem",{staticStyle:{"margin-bottom":"0"}},[a("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"请选择状态"},model:{value:t.searchConf.status,callback:function(e){t.$set(t.searchConf,"status",e)},expression:"searchConf.status"}},[a("Option",{attrs:{value:1}},[t._v("启用")]),t._v(" "),a("Option",{attrs:{value:0}},[t._v("禁用")])],1)],1),t._v(" "),a("FormItem",{staticStyle:{"margin-bottom":"0"}},[a("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"请选择类别"},model:{value:t.searchConf.type,callback:function(e){t.$set(t.searchConf,"type",e)},expression:"searchConf.type"}},[a("Option",{attrs:{value:1}},[t._v("应用组标识")]),t._v(" "),a("Option",{attrs:{value:2}},[t._v("应用组名称")])],1)],1),t._v(" "),a("FormItem",{staticStyle:{"margin-bottom":"0"}},[a("Input",{attrs:{placeholder:""},model:{value:t.searchConf.keywords,callback:function(e){t.$set(t.searchConf,"keywords",e)},expression:"searchConf.keywords"}})],1),t._v(" "),a("FormItem",{staticStyle:{"margin-bottom":"0"}},[a("Button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询/刷新")])],1)],1)],1)],1)],1),t._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("Card",[a("p",{staticStyle:{height:"32px"},attrs:{slot:"title"},slot:"title"},[a("Button",{attrs:{type:"primary",icon:"md-add"},on:{click:t.alertAdd}},[t._v("新增")])],1),t._v(" "),a("div",[a("Table",{attrs:{columns:t.columnsList,data:t.tableData,border:"","disabled-hover":""}})],1),t._v(" "),a("div",{staticClass:"margin-top-15",staticStyle:{"text-align":"center"}},[a("Page",{attrs:{total:t.tableShow.listCount,current:t.tableShow.currentPage,"page-size":t.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":t.changePage,"on-page-size-change":t.changeSize}})],1)])],1)],1),t._v(" "),a("Modal",{attrs:{width:"668",styles:{top:"30px"}},on:{"on-visible-change":t.doCancel},model:{value:t.modalSetting.show,callback:function(e){t.$set(t.modalSetting,"show",e)},expression:"modalSetting.show"}},[a("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"md-information-circle"}}),t._v(" "),a("span",[t._v(t._s(t.formItem.id?"编辑":"新增")+"应用组")])],1),t._v(" "),a("Form",{ref:"myForm",attrs:{rules:t.ruleValidate,model:t.formItem,"label-width":80}},[a("FormItem",{attrs:{label:"组名称",prop:"name"}},[a("Input",{attrs:{placeholder:"请输入应用组名称"},model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"组标识",prop:"hash"}},[a("Input",{staticStyle:{width:"300px"},attrs:{disabled:""},model:{value:t.formItem.hash,callback:function(e){t.$set(t.formItem,"hash",e)},expression:"formItem.hash"}}),t._v(" "),a("Tag",{staticStyle:{"margin-left":"5px"},attrs:{color:"error"}},[t._v("系统自动生成，不允许修改")])],1),t._v(" "),a("FormItem",{attrs:{label:"组描述",prop:"description"}},[a("Input",{attrs:{autosize:{maxRows:10,minRows:4},type:"textarea",placeholder:"请输入应用组描述"},model:{value:t.formItem.description,callback:function(e){t.$set(t.formItem,"description",e)},expression:"formItem.description"}})],1)],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("Button",{attrs:{type:"primary",loading:t.modalSetting.loading},on:{click:t.submit}},[t._v("确定")])],1)],1)],1)},n=[];o._withStripped=!0,e.render=o,e.staticRenderFns=n}});