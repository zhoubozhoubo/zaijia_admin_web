webpackJsonp([16],{248:function(n,t,e){"use strict";function a(n){c||(e(927),e(929))}Object.defineProperty(t,"__esModule",{value:!0});var i=e(486),o=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,function(){return i[n]})}(s);var r=e(932),l=(e.n(r),e(4)),c=!1,m=a,d=Object(l.a)(o.a,r.render,r.staticRenderFns,!1,m,"data-v-2b360b48",null);d.options.__file="src/views/commission/commission/commission_list.vue",t.default=d.exports},486:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(931);t.default={name:"commission_list",components:{},data:function(){return{columnsList:[{title:"id",key:"id",align:"center",width:80},{title:"佣金类型",key:"type",align:"center",width:120},{title:"用户昵称",key:"nickname",align:"center"},{title:"金额",key:"money",align:"center"},{title:"佣金来源用户昵称",key:"from_user_nickname",align:"center"},{title:"任务标题",key:"title",align:"center"},{title:"创建时间",key:"gmt_create",align:"center"}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},searchConf:{type:"",nickname:"",from_user_nickname:"",title:"",gmt_create:""},modalSetting:{show:!1,loading:!1,index:0},modalSeeingImg:{img:"",show:!1},formItem:{},ruleValidate:{},loading:!0}},created:function(){this.init(),this.getList()},methods:{init:function(){var n=this;this.columnsList.forEach(function(t){"handle"===t.key&&(t.render=function(t,e){n.tableData[e.index]}),"type"===t.key&&(t.render=function(t,e){switch(n.tableData[e.index].type){case 1:return t("Tag",{attrs:{color:"green"}},"一级佣金");case 2:return t("Tag",{attrs:{color:"blue"}},"二级佣金")}})})},alertAdd:function(){this.formItem.id=0,this.modalSetting.show=!0},submit:function(){var n=this;this.$refs.myForm.validate(function(t){t&&(n.modalSetting.loading=!0,(0,a.saveData)(n.formItem).then(function(t){1===t.data.code?(n.$Message.success(t.data.msg),n.getList(),n.cancel()):n.$Message.error(t.data.msg)}))})},cancel:function(){this.modalSetting.show=!1},doCancel:function(n){n||(this.formItem.id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)},changePage:function(n){this.tableShow.currentPage=n,this.getList()},changeSize:function(n){this.tableShow.pageSize=n,this.getList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var n=this;this.loading=!0,(0,a.getDataList)(this.tableShow,this.searchConf).then(function(t){n.tableData=t.data.data.list,n.tableShow.listCount=t.data.data.count,n.loading=!1})}}}},927:function(n,t,e){var a=e(928);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(16).default;i("393b5c00",a,!1,{})},928:function(n,t,e){t=n.exports=e(15)(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},929:function(n,t,e){var a=e(930);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(16).default;i("68462d0c",a,!1,{})},930:function(n,t,e){t=n.exports=e(15)(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},931:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteData=t.change=t.saveData=t.getDataList=void 0;var a=e(34),i=function(n){return n&&n.__esModule?n:{default:n}}(a);t.getDataList=function(n,t){return i.default.get("Commission/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:t}})},t.saveData=function(n){return i.default.post("Commission/save",n)},t.change=function(n){return i.default.post("Commission/change",n)},t.deleteData=function(n){return i.default.post("Commission/delete",n)}},932:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",{staticStyle:{"margin-bottom":"10px"}},[e("Form",{attrs:{inline:""}},[e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"佣金类型"},model:{value:n.searchConf.type,callback:function(t){n.$set(n.searchConf,"type",t)},expression:"searchConf.type"}},[e("Option",{attrs:{value:"1"}},[n._v("一级佣金")]),n._v(" "),e("Option",{attrs:{value:"2"}},[n._v("二级佣金")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Input",{attrs:{clearable:"",placeholder:"用户昵称"},model:{value:n.searchConf.nickname,callback:function(t){n.$set(n.searchConf,"nickname",t)},expression:"searchConf.nickname"}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Input",{attrs:{clearable:"",placeholder:"佣金来源用户昵称"},model:{value:n.searchConf.from_user_nickname,callback:function(t){n.$set(n.searchConf,"from_user_nickname",t)},expression:"searchConf.from_user_nickname"}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Input",{attrs:{clearable:"",placeholder:"任务标题"},model:{value:n.searchConf.title,callback:function(t){n.$set(n.searchConf,"title",t)},expression:"searchConf.title"}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placeholder:"选择日期范围"},on:{"on-change":function(t){n.searchConf.gmt_create=t}}})],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:n.search}},[n._v("查询/刷新")])],1)],1)],1)],1)],1),n._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",[e("div",[e("Table",{attrs:{loading:n.loading,columns:n.columnsList,data:n.tableData,border:"","disabled-hover":""}})],1),n._v(" "),e("div",{staticStyle:{"text-align":"center","margin-top":"15px"}},[e("Page",{attrs:{total:n.tableShow.listCount,current:n.tableShow.currentPage,"page-size":n.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changePage,"on-page-size-change":n.changeSize}})],1)])],1)],1),n._v(" "),e("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSetting.show,callback:function(t){n.$set(n.modalSetting,"show",t)},expression:"modalSetting.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v(n._s(n.formItem.id?"编辑":"新增"))])],1),n._v(" "),e("Form",{ref:"myForm",attrs:{rules:n.ruleValidate,model:n.formItem,"label-width":100}}),n._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancel}},[n._v("取消")]),n._v(" "),e("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submit}},[n._v("确定")])],1)],1),n._v(" "),e("Modal",{attrs:{"class-name":"fl-image-modal"},on:{"on-visible-change":n.doCancel},model:{value:n.modalSeeingImg.show,callback:function(t){n.$set(n.modalSeeingImg,"show",t)},expression:"modalSeeingImg.show"}},[n.modalSeeingImg.show?e("img",{staticStyle:{width:"100%"},attrs:{src:n.modalSeeingImg.img}}):n._e()])],1)},i=[];a._withStripped=!0,t.render=a,t.staticRenderFns=i}});