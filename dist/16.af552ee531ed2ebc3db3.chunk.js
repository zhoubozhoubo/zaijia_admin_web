webpackJsonp([16],{244:function(n,e,t){"use strict";function a(n){c||(t(896),t(898))}Object.defineProperty(e,"__esModule",{value:!0});var o=t(476),i=t.n(o);for(var s in o)"default"!==s&&function(n){t.d(e,n,function(){return o[n]})}(s);var l=t(901),r=(t.n(l),t(4)),c=!1,d=a,u=Object(r.a)(i.a,l.render,l.staticRenderFns,!1,d,"data-v-60adc494",null);u.options.__file="src/views/commission/commission_conf/commission_conf_list.vue",e.default=u.exports},476:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t(900),o=function(n,e,t,a){return e("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){n.formItem.id=t.id,n.formItem.level=t.level,n.formItem.value=t.value,n.modalSetting.show=!0,n.modalSetting.index=a}}},"编辑")};e.default={name:"commission_conf_list",components:{},data:function(){return{columnsList:[{title:"id",key:"id",align:"center",width:80},{title:"佣金等级",key:"level",align:"center"},{title:"佣金比例(%)",key:"value",align:"center"},{title:"操作",key:"handle",align:"center",handle:["edit"],width:150}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},searchConf:[],modalSetting:{show:!1,loading:!1,index:0},modalSeeingImg:{img:"",show:!1},formItem:{id:"",level:"",value:""},ruleValidate:{level:[{required:!0,message:"请输入佣金等级",trigger:"blur"}],value:[{required:!0,message:"请输入佣金比例"}]},loading:!0}},created:function(){this.init(),this.getList()},methods:{init:function(){var n=this;this.columnsList.forEach(function(e){"handle"===e.key&&(e.render=function(e,t){var a=n.tableData[t.index];return e("div",[o(n,e,a,t.index)])}),"level"===e.key&&(e.render=function(e,t){switch(n.tableData[t.index].level){case"1":return e("Tag",{attrs:{color:"blue"}},"一级佣金");case"2":return e("Tag",{attrs:{color:"blue"}},"二级佣金")}})})},alertAdd:function(){this.formItem.id=0,this.modalSetting.show=!0},submit:function(){var n=this;this.$refs.myForm.validate(function(e){e&&(n.modalSetting.loading=!0,(0,a.saveData)(n.formItem).then(function(e){1===e.data.code?(n.$Message.success(e.data.msg),n.getList(),n.cancel()):n.$Message.error(e.data.msg)}))})},cancel:function(){this.modalSetting.show=!1},doCancel:function(n){n||(this.formItem.id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)},changePage:function(n){this.tableShow.currentPage=n,this.getList()},changeSize:function(n){this.tableShow.pageSize=n,this.getList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var n=this;this.loading=!0,(0,a.getDataList)(this.tableShow,this.searchConf).then(function(e){n.tableData=e.data.data.list,n.tableShow.listCount=e.data.data.count,n.loading=!1})}}}},896:function(n,e,t){var a=t(897);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=t(15).default;o("59149b2d",a,!1,{})},897:function(n,e,t){e=n.exports=t(14)(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},898:function(n,e,t){var a=t(899);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=t(15).default;o("32162f41",a,!1,{})},899:function(n,e,t){e=n.exports=t(14)(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},900:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.deleteData=e.change=e.saveData=e.getDataList=void 0;var a=t(33),o=function(n){return n&&n.__esModule?n:{default:n}}(a);e.getDataList=function(n,e){return o.default.get("CommissionConf/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:e}})},e.saveData=function(n){return o.default.post("CommissionConf/save",n)},e.change=function(n){return o.default.post("CommissionConf/change",n)},e.deleteData=function(n){return o.default.post("CommissionConf/delete",n)}},901:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("Row",[t("Col",{attrs:{span:"24"}},[t("Card",{staticStyle:{"margin-bottom":"10px"}},[t("Form",{attrs:{inline:""}},[t("FormItem",{staticStyle:{"margin-bottom":"0"}},[t("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:n.search}},[n._v("查询/刷新")])],1)],1)],1)],1)],1),n._v(" "),t("Row",[t("Col",{attrs:{span:"24"}},[t("Card",[t("div",[t("Table",{attrs:{loading:n.loading,columns:n.columnsList,data:n.tableData,border:"","disabled-hover":""}})],1),n._v(" "),t("div",{staticStyle:{"text-align":"center","margin-top":"15px"}},[t("Page",{attrs:{total:n.tableShow.listCount,current:n.tableShow.currentPage,"page-size":n.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changePage,"on-page-size-change":n.changeSize}})],1)])],1)],1),n._v(" "),t("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSetting.show,callback:function(e){n.$set(n.modalSetting,"show",e)},expression:"modalSetting.show"}},[t("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[t("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),t("span",[n._v(n._s(n.formItem.id?"编辑":"新增"))])],1),n._v(" "),t("Form",{ref:"myForm",attrs:{rules:n.ruleValidate,model:n.formItem,"label-width":100}},[t("FormItem",{attrs:{label:"佣金等级",prop:"level"}},[t("Input",{attrs:{disabled:"",number:"",placeholder:"佣金等级"},model:{value:n.formItem.level,callback:function(e){n.$set(n.formItem,"level",e)},expression:"formItem.level"}})],1),n._v(" "),t("FormItem",{attrs:{label:"佣金比例(%)",prop:"value"}},[t("Input",{attrs:{number:"",placeholder:"佣金比例(%)"},model:{value:n.formItem.value,callback:function(e){n.$set(n.formItem,"value",e)},expression:"formItem.value"}})],1)],1),n._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancel}},[n._v("取消")]),n._v(" "),t("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submit}},[n._v("确定")])],1)],1),n._v(" "),t("Modal",{attrs:{"class-name":"fl-image-modal"},on:{"on-visible-change":n.doCancel},model:{value:n.modalSeeingImg.show,callback:function(e){n.$set(n.modalSeeingImg,"show",e)},expression:"modalSeeingImg.show"}},[n.modalSeeingImg.show?t("img",{staticStyle:{width:"100%"},attrs:{src:n.modalSeeingImg.img}}):n._e()])],1)},o=[];a._withStripped=!0,e.render=a,e.staticRenderFns=o}});