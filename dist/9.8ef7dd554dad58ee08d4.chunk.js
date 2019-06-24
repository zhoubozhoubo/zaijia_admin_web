webpackJsonp([9],{239:function(n,e,t){"use strict";function a(n){c||(t(865),t(867))}Object.defineProperty(e,"__esModule",{value:!0});var i=t(475),o=t.n(i);for(var r in i)"default"!==r&&function(n){t.d(e,n,function(){return i[n]})}(r);var s=t(870),l=(t.n(s),t(4)),c=!1,m=a,d=Object(l.a)(o.a,s.render,s.staticRenderFns,!1,m,"data-v-3754e2e8",null);d.options.__file="src/views/user/user/user_list.vue",e.default=d.exports},475:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t(869),i=function(n,e,t,a){return e("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){n.modalSetting.show=!0,n.modalSetting.index=a}}},"编辑")},o=function(n,e,t,a){return e("Button",{props:{type:"success"},style:{margin:"0 5px"},on:{click:function(){n.modalSeeingTeam.show=!0,n.modalSeeingTeam.nickname=t.nickname,n.teamConf.level=1,n.teamConf.user_id=t.user_id,n.getTeamList()}}},"一级成员")},r=function(n,e,t,a){return e("Button",{props:{type:"info"},style:{margin:"0 5px"},on:{click:function(){n.modalSeeingTeam.show=!0,n.modalSeeingTeam.nickname=t.nickname,n.teamConf.level=2,n.teamConf.user_id=t.user_id,n.getTeamList()}}},"二级成员")};e.default={name:"user_list",components:{},data:function(){return{columnsList:[{type:"selection",width:50,align:"center",key:"user_id"},{title:"用户id",key:"user_id",align:"center",width:80},{title:"用户头像",key:"avatarurl",align:"center"},{title:"用户昵称",key:"nickname",align:"center"},{title:"上级用户昵称",key:"superior_user_nickname",align:"center"},{title:"用户二维码(头像)",key:"qrCode",align:"center"},{title:"创建时间",key:"gmt_create",align:"center"},{title:"一级团队",align:"center",key:"one_team",width:130},{title:"二级团队",align:"center",key:"two_team",width:130}],teamColumns:[{title:"序号",type:"index",width:65,align:"center"},{title:"用户头像",align:"center",key:"avatarurl"},{title:"用户昵称",align:"center",key:"nickname"},{title:"用户二维码(头像)",align:"center",key:"qrCode"},{title:"创建时间",align:"center",key:"gmt_create"}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},teamLoading:!1,teamData:[],teamShow:{currentPage:1,pageSize:10,listCount:0},searchConf:{nickname:"",phone:"",gmt_create:""},teamConf:{user_id:"",level:""},modalSetting:{show:!1,loading:!1,index:0},modalSeeingTeam:{show:!1,loading:!1,index:0},modalSeeingImg:{img:"",show:!1},formItem:{user_id:0,title:"",content:""},ruleValidate:{title:[{required:!0,message:"请输入消息标题",trigger:"blur"}],content:[{required:!0,message:"请输入消息内容",trigger:"blur"}]},loading:!0}},created:function(){this.init(),this.teaminit(),this.getList()},methods:{init:function(){var n=this;this.columnsList.forEach(function(e){"handle"===e.key&&(e.render=function(e,t){n.tableData[t.index];return e("div",[i(n,e,0,t.index)])}),"avatarurl"===e.key&&(e.render=function(e,t){var a=n.tableData[t.index];return a.avatarurl?e("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.avatarurl,shape:"square",size:"large"},on:{click:function(e){n.modalSeeingImg.img=a.avatarurl,n.modalSeeingImg.show=!0}}}):e("Tag",{},"暂无图片")}),"qrCode"===e.key&&(e.render=function(e,t){var a=n.tableData[t.index];return a.qrCode?e("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.qrCode,shape:"square",size:"large"},on:{click:function(e){n.modalSeeingImg.img=a.qrCode,n.modalSeeingImg.show=!0}}}):e("Tag",{},"暂无图片")}),"one_team"===e.key&&(e.render=function(e,t){var a=n.tableData[t.index];return e("div",[o(n,e,a,t.index)])}),"two_team"===e.key&&(e.render=function(e,t){var a=n.tableData[t.index];return e("div",[r(n,e,a,t.index)])})})},teaminit:function(){var n=this;this.teamColumns.forEach(function(e){"avatarurl"===e.key&&(e.render=function(e,t){var a=n.teamData[t.index];return a.avatarurl?e("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.avatarurl,shape:"square",size:"large"},on:{click:function(e){n.modalSeeingImg.img=a.avatarurl,n.modalSeeingImg.show=!0}}}):e("Tag",{},"暂无图片")}),"qrCode"===e.key&&(e.render=function(e,t){var a=n.teamData[t.index];return a.qrCode?e("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.qrCode,shape:"square",size:"large"},on:{click:function(e){n.modalSeeingImg.img=a.qrCode,n.modalSeeingImg.show=!0}}}):e("Tag",{},"暂无图片")})})},alertAdd:function(){if(0===this.formItem.user_id)return void this.$Message.warning("请选择需要发送消息的用户");this.modalSetting.show=!0},alertAddAll:function(){this.modalSetting.show=!0},submit:function(){var n=this;this.$refs.myForm.validate(function(e){e&&(n.modalSetting.loading=!0,(0,a.sendNotice)(n.formItem).then(function(e){1===e.data.code?(n.$Message.success(e.data.msg),n.getList(),n.cancel()):n.$Message.error(e.data.msg)}))})},cancel:function(){this.modalSetting.show=!1},doCancel:function(n){n||(this.formItem.user_id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)},changePage:function(n){this.tableShow.currentPage=n,this.getList()},changeSize:function(n){this.tableShow.pageSize=n,this.getList()},changeTeamPage:function(n){this.teamShow.currentPage=n,this.getTeamList()},changeTeamSize:function(n){this.teamShow.pageSize=n,this.getTeamList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var n=this;this.loading=!0,(0,a.getDataList)(this.tableShow,this.searchConf).then(function(e){n.tableData=e.data.data.list,n.tableShow.listCount=e.data.data.count,n.loading=!1})},getTeamList:function(){var n=this;this.teamLoading=!0,(0,a.getDataList)(this.teamShow,this.teamConf).then(function(e){n.teamData=e.data.data.list,n.teamShow.listCount=e.data.data.count,n.teamLoading=!1})},handleRowChange:function(n){for(var e=0;e<n.length;e++)this.formItem.user_id+=n[e].user_id+",";this.formItem.user_id=this.formItem.user_id.substr(0,this.formItem.user_id.length-1)}}}},865:function(n,e,t){var a=t(866);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=t(15).default;i("3b5fe466",a,!1,{})},866:function(n,e,t){e=n.exports=t(14)(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},867:function(n,e,t){var a=t(868);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=t(15).default;i("55f6374c",a,!1,{})},868:function(n,e,t){e=n.exports=t(14)(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},869:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sendNotice=e.getDataList=void 0;var a=t(33),i=function(n){return n&&n.__esModule?n:{default:n}}(a);e.getDataList=function(n,e){return i.default.get("UserCon/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:e}})},e.sendNotice=function(n){return i.default.post("UserNotice/save",n)}},870:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("Row",[t("Col",{attrs:{span:"24"}},[t("Card",{staticStyle:{"margin-bottom":"10px"}},[t("Form",{attrs:{inline:""}},[t("FormItem",{staticStyle:{"margin-bottom":"0"}},[t("Input",{attrs:{clearable:"",placeholder:"用户昵称"},model:{value:n.searchConf.nickname,callback:function(e){n.$set(n.searchConf,"nickname",e)},expression:"searchConf.nickname"}})],1),n._v(" "),t("FormItem",{staticStyle:{"margin-bottom":"0"}},[t("Input",{attrs:{clearable:"",placeholder:"用户手机号"},model:{value:n.searchConf.phone,callback:function(e){n.$set(n.searchConf,"phone",e)},expression:"searchConf.phone"}})],1),n._v(" "),t("FormItem",{staticStyle:{"margin-bottom":"0"}},[t("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placeholder:"创建日期"},on:{"on-change":function(e){n.searchConf.gmt_create=e}}})],1),n._v(" "),t("FormItem",{staticStyle:{"margin-bottom":"0"}},[t("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:n.search}},[n._v("查询/刷新")])],1)],1)],1)],1)],1),n._v(" "),t("Row",[t("Col",{attrs:{span:"24"}},[t("Card",[t("p",{staticStyle:{height:"40px"},attrs:{slot:"title"},slot:"title"},[t("Button",{attrs:{type:"primary",icon:"ios-send-outline"},on:{click:n.alertAdd}},[n._v("发送消息")]),n._v(" "),t("Button",{attrs:{type:"primary",icon:"ios-send"},on:{click:n.alertAddAll}},[n._v("发送消息给所有用户")])],1),n._v(" "),t("div",[t("Table",{ref:"selection",attrs:{loading:n.loading,columns:n.columnsList,data:n.tableData,border:"","disabled-hover":""},on:{"on-selection-change":n.handleRowChange}})],1),n._v(" "),t("div",{staticStyle:{"text-align":"center","margin-top":"15px"}},[t("Page",{attrs:{total:n.tableShow.listCount,current:n.tableShow.currentPage,"page-size":n.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changePage,"on-page-size-change":n.changeSize}})],1)])],1)],1),n._v(" "),t("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSetting.show,callback:function(e){n.$set(n.modalSetting,"show",e)},expression:"modalSetting.show"}},[t("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[t("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),t("span",[n._v("发送消息")])],1),n._v(" "),t("Form",{ref:"myForm",attrs:{rules:n.ruleValidate,model:n.formItem,"label-width":100}},[t("FormItem",{attrs:{label:"标题",prop:"title"}},[t("Input",{attrs:{placeholder:"请输入标题"},model:{value:n.formItem.title,callback:function(e){n.$set(n.formItem,"title",e)},expression:"formItem.title"}})],1),n._v(" "),t("FormItem",{attrs:{label:"内容",prop:"content"}},[t("Input",{attrs:{placeholder:"请输入内容"},model:{value:n.formItem.content,callback:function(e){n.$set(n.formItem,"content",e)},expression:"formItem.content"}})],1)],1),n._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancel}},[n._v("取消")]),n._v(" "),t("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submit}},[n._v("确定")])],1)],1),n._v(" "),t("Modal",{attrs:{width:"998",styles:{top:"30px"}},model:{value:n.modalSeeingTeam.show,callback:function(e){n.$set(n.modalSeeingTeam,"show",e)},expression:"modalSeeingTeam.show"}},[t("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[t("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),t("span",[n._v(n._s(n.modalSeeingTeam.nickname)+" > "+n._s(1===n.teamConf.level?"一级队员":"二级队员"))])],1),n._v(" "),t("div",[t("Table",{attrs:{loading:n.teamLoading,columns:n.teamColumns,data:n.teamData,border:"","disabled-hover":""}})],1),n._v(" "),t("div",{staticClass:"margin-top-15",staticStyle:{"text-align":"center"}},[t("Page",{attrs:{total:n.teamShow.listCount,current:n.teamShow.currentPage,"page-size":n.teamShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changeTeamPage,"on-page-size-change":n.changeTeamSize}})],1),n._v(" "),t("p",{attrs:{slot:"footer"},slot:"footer"})]),n._v(" "),t("Modal",{attrs:{"class-name":"fl-image-modal"},on:{"on-visible-change":n.doCancel},model:{value:n.modalSeeingImg.show,callback:function(e){n.$set(n.modalSeeingImg,"show",e)},expression:"modalSeeingImg.show"}},[n.modalSeeingImg.show?t("img",{staticStyle:{width:"100%"},attrs:{src:n.modalSeeingImg.img}}):n._e()])],1)},i=[];a._withStripped=!0,e.render=a,e.staticRenderFns=i}});