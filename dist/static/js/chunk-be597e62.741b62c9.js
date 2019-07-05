(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-be597e62"],{"584e":function(t,e,a){},"8fc4":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("my-header",{attrs:{title:t.title}}),t._v(" "),a("el-form",{staticClass:"filter",attrs:{model:t.filter,inline:!0}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.addMessage}},[t._v("添加消息")])],1)],1),t._v(" "),a("my-table",{attrs:{tableData:t.data,columns:t.columns,loading:t.loading_}}),t._v(" "),a("Pagination",{attrs:{pagesize:t.pagesize,current_page:t.current_page,pageSizes:t.pageSizes,total:t.total},on:{changeCurrentPage:t.changeCurrentPage,changeSizePage:t.changeSizePage}}),t._v(" "),a("div",{staticClass:"form"},[a("el-form",[a("el-dialog",{attrs:{title:t.formTitle,visible:t.addFormShow},on:{"update:visible":function(e){t.addFormShow=e}}},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.form_loading,expression:"form_loading"}],attrs:{"label-position":"left","label-width":"80px",model:t.form}},[a("el-form-item",{attrs:{label:"消息标题"}},[a("el-input",{attrs:{type:"text"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("my-select",{attrs:{select:t.form.type,label:"通知类型",prop:t.select,options:t.options},on:{"update:select":function(e){return t.$set(t.form,"type",e)}}}),t._v(" "),a("el-form-item",{attrs:{label:"发送时间"}},[a("my-date",{attrs:{date:t.form.send_time,placeholder:t.placeholder},on:{"update:date":function(e){return t.$set(t.form,"send_time",e)}}})],1),t._v(" "),a("el-form-item",{attrs:{label:"消息内容"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateOrCreate(null)}}},[t._v("新建")]),t._v(" "),a("el-button",{on:{click:function(e){t.addFormShow=!t.addFormShow}}},[t._v("取消")])],1)],1)],1)],1)],1)],1)},i=[],n=a("cd4a"),o={name:"index",mixins:[n["m"]],components:{myHeader:n["l"],MyTable:n["f"],Button:n["b"],Pagination:n["i"],MySelect:n["e"],MyDate:n["c"]},data:function(){var t=this;return{title:"消息管理",data:[],loading_:!1,select:"系统",filter:{},placeholder:"请选择发送时间",formTitle:"创建消息",form:{type:"系统通知"},form_loading:!0,addFormShow:!1,columns:[{prop:"id",label:"ID"},{prop:"content",label:"消息内容"},{prop:"title",label:"消息标题"},{prop:"type",label:"消息类型",render:function(t,e){return t(n["g"],{props:{effect:"dark",text:e.row.type_}})}},{prop:"create_time",label:"创建时间"},{prop:"send_time",label:"发送时间"},{prop:"status_",label:"发送状态",render:function(t,e){return t(n["g"],{props:{effect:"dark",text:e.row.status_}})}},{prop:"",label:"操作",fixed:"right",width:"200",render:function(e,a){var s=[];return 0==parseInt(a.row.status)?s=[{func:"send",id:a.row.id,text:"立即发送",size:"small"},{func:"with_draw",id:a.row.id,text:"撤回发送",size:"small"},{func:"deleted",id:a.row.id,text:"删除消息",size:"small"}]:1==parseInt(a.row.status)?s=[{func:"deleted",id:a.row.id,text:"删除消息",size:"small"}]:2==parseInt(a.row.status)&&(s=[{func:"send",id:a.row.id,text:"重新发送",size:"small"},{func:"deleted",id:a.row.id,text:"删除消息",size:"small"}]),e(n["b"],{props:{buttons:s},on:{send:t.send,with_draw:t.with_draw,deleted:t.deleted}})}}],options:[{label:"紧急通知",value:"紧急通知"},{label:"系统通知",value:"系统通知"}]}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.loading=!0,this.$get("/api/message",{page:this.current_page,pagesize:this.pagesize}).then(function(e){200==e.code&&(t.setData(e.data.list),t.setPage(e.data))})},setData:function(t){var e=this;this.data=t.map(function(t,a){return t.status_=e.getStatus_(t.status),t.type_=e.getType_(t.type),t}),this.loading=!1},send:function(t){var e=this;this.loading=!0,this.$post("/api/message/send/"+t).then(function(t){200==t.code?(e.$success_(t.msg),e.getList()):e.$error_(t.msg),e.loading=!1})},deleted:function(t){var e=this;this.loading=!0,this.$deletes("/api/message/"+t).then(function(a){200==a.code?(e.$success_(a.msg),e.getList()):e.$error_(a.msg),e.data=jsonRemove(e.data,"id",t),e.loading=!1})},with_draw:function(t){var e=this;this.$post("/api/message/with_draw/"+t).then(function(t){200==t.code?(e.$success_(t.msg),e.getList()):e.$error_(t.msg)})},getStatus_:function(t){switch(parseInt(t)){case 0:return"等待发送";case 1:return"发送成功";case 2:return"已撤回"}},getType_:function(t){switch(parseInt(t)){case 0:return"紧急通知";case 1:return"系统通知";case 2:return"用户通知"}},addMessage:function(){this.addFormShow=!0,this.form_loading=!1},updateOrCreate:function(){this.form_loading=!1,this.addFormShow=!0,this.postData(),console.log(this.form)},postData:function(){var t=this;this.form.type="紧急通知"==this.form.type?1:2,this.loading_=!0,this.$post("/api/message",this.form).then(function(e){return t.msg(e)}).catch(function(t){})},msg:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"创建成功";200==t.code?(this.$success_(e),this.getList(),this.loading_=!1,this.form={},this.addFormShow=!1):this.$error_(t.msg)}}},r=o,l=(a("ef48"),a("0c7c")),d=Object(l["a"])(r,s,i,!1,null,null,null);e["default"]=d.exports},ef48:function(t,e,a){"use strict";var s=a("584e"),i=a.n(s);i.a}}]);