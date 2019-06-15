webpackJsonp([14],{230:function(n,t,e){"use strict";function a(n){c||(e(842),e(844))}Object.defineProperty(t,"__esModule",{value:!0});var i=e(462),o=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,function(){return i[n]})}(s);var r=e(847),l=(e.n(r),e(4)),c=!1,m=a,d=Object(l.a)(o.a,r.render,r.staticRenderFns,!1,m,"data-v-19ecf265",null);d.options.__file="src/views/index/link/link_list.vue",t.default=d.exports},462:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(55),i=function(n){return n&&n.__esModule?n:{default:n}}(a),o=e(846),s=function(n,t,e,a){return t("Button",{props:{type:"primary"},style:{margin:"0 5px"},on:{click:function(){n.formItem.id=e.id,n.formItem.name=e.name,n.formItem.img=e.img,n.formItem.url=e.url,n.formItem.sort=e.sort,n.modalSetting.show=!0,n.modalSetting.index=a}}},"编辑")};t.default={name:"link_list",components:{},data:function(){return{columnsList:[{title:"链接id",key:"id",align:"center",width:80},{title:"链接名称",key:"name",align:"center"},{title:"链接图片",key:"img",align:"center"},{title:"链接跳转地址",key:"url",align:"center"},{title:"排序",key:"sort",align:"center",width:100},{title:"状态",key:"status",align:"center",width:100},{title:"操作",key:"handle",align:"center",handle:["edit","delete"],width:180}],tableData:[],tableShow:{currentPage:1,pageSize:10,listCount:0},searchConf:{status:""},modalSetting:{show:!1,loading:!1,index:0},modalSeeingImg:{img:"",show:!1},visible:!1,uploadUrl:"",uploadHeader:{},formItem:{id:"",name:"",img:"",url:"",sort:""},ruleValidate:{name:[{required:!0,message:"请输入链接名称名称",trigger:"blur"}],img:[{required:!0,message:"请上传图片",trigger:"blur"}],url:[{required:!0,message:"请输入跳转地址",trigger:"blur"}]},loading:!0}},created:function(){this.init(),this.getList(),this.uploadUrl=i.default.baseUrl+"Index/upload",this.uploadHeader={ApiAuth:sessionStorage.getItem("apiAuth")}},methods:{init:function(){var n=this;this.columnsList.forEach(function(t){"handle"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("div",[s(n,t,a,e.index)])}),"img"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return a.img?t("img",{style:{width:"40px",height:"40px",cursor:"pointer",margin:"5px 0"},attrs:{src:a.img,shape:"square",size:"large"},on:{click:function(t){n.modalSeeingImg.img=a.img,n.modalSeeingImg.show=!0}}}):t("Tag",{},"暂无图片")}),"status"===t.key&&(t.render=function(t,e){var a=n.tableData[e.index];return t("i-switch",{attrs:{size:"large"},props:{"true-value":1,"false-value":0,value:a.status},on:{"on-change":function(t){(0,o.change)({id:a.id,status:t}).then(function(t){n.$Message.success(t.data.msg),n.cancel()},function(t){n.$Message.error(res.data.msg),n.cancel()})}}},[t("span",{slot:"open"},"开启"),t("span",{slot:"close"},"关闭")])})})},alertAdd:function(){this.formItem.id=0,this.modalSetting.show=!0},handleView:function(){this.visible=!0},handleImgRemove:function(){this.formItem.img=""},handleImgFormatError:function(n){this.$Notice.warning({title:"文件类型不合法",desc:n.name+"的文件类型不正确，请上传jpg或者png图片。"})},handleImgMaxSize:function(n){this.$Notice.warning({title:"文件大小不合法",desc:n.name+"太大啦请上传小于5M的文件。"})},handleImgSuccess:function(n){1===n.code?(this.$Message.success(n.msg),this.formItem.img=n.data.fileUrl):this.$Message.error(n.msg)},submit:function(){var n=this;this.$refs.myForm.validate(function(t){t&&(n.modalSetting.loading=!0,(0,o.saveData)(n.formItem).then(function(t){1===t.data.code?(n.$Message.success(t.data.msg),n.getList(),n.cancel()):n.$Message.error(t.data.msg)}))})},cancel:function(){this.modalSetting.show=!1},doCancel:function(n){n||(this.formItem.id=0,this.$refs.myForm.resetFields(),this.modalSetting.loading=!1,this.modalSetting.index=0)},changePage:function(n){this.tableShow.currentPage=n,this.getList()},changeSize:function(n){this.tableShow.pageSize=n,this.getList()},search:function(){this.tableShow.currentPage=1,this.getList()},getList:function(){var n=this;this.loading=!0,(0,o.getDataList)(this.tableShow,this.searchConf).then(function(t){n.tableData=t.data.data.list,n.tableShow.listCount=t.data.data.count,n.loading=!1})}}}},842:function(n,t,e){var a=e(843);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(15).default;i("e03221f8",a,!1,{})},843:function(n,t,e){t=n.exports=e(14)(!1),t.push([n.i,"\n.demo-upload-list[data-v-19ecf265] {\n    display: inline-block;\n    width: 60px;\n    height: 60px;\n    text-align: center;\n    line-height: 60px;\n    border: 1px solid transparent;\n    border-radius: 4px;\n    overflow: hidden;\n    background: #fff;\n    position: relative;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);\n    margin-right: 4px;\n}\n.demo-upload-list img[data-v-19ecf265] {\n    width: 100%;\n    height: 100%;\n}\n.demo-upload-list-cover[data-v-19ecf265] {\n    display: none;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, .6);\n}\n.demo-upload-list:hover .demo-upload-list-cover[data-v-19ecf265] {\n    display: block;\n}\n.demo-upload-list-cover i[data-v-19ecf265] {\n    color: #fff;\n    font-size: 20px;\n    cursor: pointer;\n    margin: 0 2px;\n}\n",""])},844:function(n,t,e){var a=e(845);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e(15).default;i("240364f0",a,!1,{})},845:function(n,t,e){t=n.exports=e(14)(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},846:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteData=t.change=t.saveData=t.getDataList=void 0;var a=e(33),i=function(n){return n&&n.__esModule?n:{default:n}}(a);t.getDataList=function(n,t){return i.default.get("Link/getList",{params:{page:n.currentPage,size:n.pageSize,searchConf:t}})},t.saveData=function(n){return i.default.post("Link/save",n)},t.change=function(n){return i.default.post("Link/change",n)},t.deleteData=function(n){return i.default.post("Link/delete",n)}},847:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",{staticStyle:{"margin-bottom":"10px"}},[e("Form",{attrs:{inline:""}},[e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"请选择状态"},model:{value:n.searchConf.status,callback:function(t){n.$set(n.searchConf,"status",t)},expression:"searchConf.status"}},[e("Option",{attrs:{value:"0"}},[n._v("关闭")]),n._v(" "),e("Option",{attrs:{value:"1"}},[n._v("开启")])],1)],1),n._v(" "),e("FormItem",{staticStyle:{"margin-bottom":"0"}},[e("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:n.search}},[n._v("查询/刷新")])],1)],1)],1)],1)],1),n._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",[e("p",{staticStyle:{height:"40px"},attrs:{slot:"title"},slot:"title"}),n._v(" "),e("div",[e("Table",{attrs:{loading:n.loading,columns:n.columnsList,data:n.tableData,border:"","disabled-hover":""}})],1),n._v(" "),e("div",{staticStyle:{"text-align":"center","margin-top":"15px"}},[e("Page",{attrs:{total:n.tableShow.listCount,current:n.tableShow.currentPage,"page-size":n.tableShow.pageSize,"show-elevator":"","show-sizer":"","show-total":""},on:{"on-change":n.changePage,"on-page-size-change":n.changeSize}})],1)])],1)],1),n._v(" "),e("Modal",{attrs:{width:"700",styles:{top:"30px"}},on:{"on-visible-change":n.doCancel},model:{value:n.modalSetting.show,callback:function(t){n.$set(n.modalSetting,"show",t)},expression:"modalSetting.show"}},[e("p",{staticStyle:{color:"#2d8cf0"},attrs:{slot:"header"},slot:"header"},[e("Icon",{attrs:{type:"md-information-circle"}}),n._v(" "),e("span",[n._v(n._s(n.formItem.id?"编辑":"新增"))])],1),n._v(" "),e("Form",{ref:"myForm",attrs:{rules:n.ruleValidate,model:n.formItem,"label-width":100}},[e("FormItem",{attrs:{label:"链接名称",prop:"name"}},[e("Input",{attrs:{placeholder:"链接名称"},model:{value:n.formItem.name,callback:function(t){n.$set(n.formItem,"name",t)},expression:"formItem.name"}})],1),n._v(" "),e("FormItem",{attrs:{label:"链接图片",prop:"img"}},[n.formItem.img?e("div",{staticClass:"demo-upload-list"},[e("img",{attrs:{src:n.formItem.img}}),n._v(" "),e("div",{staticClass:"demo-upload-list-cover"},[e("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(t){return n.handleView()}}}),n._v(" "),e("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(t){return n.handleImgRemove()}}})],1)]):n._e(),n._v(" "),n.formItem.img?e("input",{directives:[{name:"model",rawName:"v-model",value:n.formItem.img,expression:"formItem.img"}],attrs:{type:"hidden",name:"image"},domProps:{value:n.formItem.img},on:{input:function(t){t.target.composing||n.$set(n.formItem,"img",t.target.value)}}}):n._e(),n._v(" "),n.formItem.img?n._e():e("Upload",{staticStyle:{display:"inline-block",width:"58px"},attrs:{type:"drag",action:n.uploadUrl,headers:n.uploadHeader,format:["jpg","jpeg","png"],"max-size":5120,"on-success":n.handleImgSuccess,"on-format-error":n.handleImgFormatError,"on-exceeded-size":n.handleImgMaxSize}},[e("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[e("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),n._v(" "),e("Modal",{attrs:{title:"View Image"},model:{value:n.visible,callback:function(t){n.visible=t},expression:"visible"}},[n.visible?e("img",{staticStyle:{width:"100%"},attrs:{src:n.formItem.img}}):n._e()])],1),n._v(" "),e("FormItem",{attrs:{label:"链接跳转地址",prop:"url"}},[e("Input",{attrs:{placeholder:"链接跳转地址"},model:{value:n.formItem.url,callback:function(t){n.$set(n.formItem,"url",t)},expression:"formItem.url"}})],1),n._v(" "),e("FormItem",{attrs:{label:"排序",prop:"sort"}},[e("Input",{attrs:{placeholder:"排序"},model:{value:n.formItem.sort,callback:function(t){n.$set(n.formItem,"sort",t)},expression:"formItem.sort"}})],1)],1),n._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{"margin-right":"8px"},attrs:{type:"text"},on:{click:n.cancel}},[n._v("取消")]),n._v(" "),e("Button",{attrs:{type:"primary",loading:n.modalSetting.loading},on:{click:n.submit}},[n._v("确定")])],1)],1),n._v(" "),e("Modal",{attrs:{"class-name":"fl-image-modal"},on:{"on-visible-change":n.doCancel},model:{value:n.modalSeeingImg.show,callback:function(t){n.$set(n.modalSeeingImg,"show",t)},expression:"modalSeeingImg.show"}},[n.modalSeeingImg.show?e("img",{staticStyle:{width:"100%"},attrs:{src:n.modalSeeingImg.img}}):n._e()])],1)},i=[];a._withStripped=!0,t.render=a,t.staticRenderFns=i}});