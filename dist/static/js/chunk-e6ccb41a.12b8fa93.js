(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e6ccb41a"],{"19e7":function(e,t,a){},"2bef":function(e,t,a){"use strict";a.d(t,"g",(function(){return s})),a.d(t,"i",(function(){return o})),a.d(t,"a",(function(){return c})),a.d(t,"m",(function(){return l})),a.d(t,"f",(function(){return u})),a.d(t,"b",(function(){return d})),a.d(t,"e",(function(){return m})),a.d(t,"n",(function(){return p})),a.d(t,"c",(function(){return h})),a.d(t,"k",(function(){return f})),a.d(t,"l",(function(){return b})),a.d(t,"j",(function(){return g})),a.d(t,"o",(function(){return v})),a.d(t,"d",(function(){return y})),a.d(t,"h",(function(){return w}));var n=a("b775"),i=(a("4328"),a("bc3a")),r=a.n(i);function s(e){return Object(n["a"])({url:"/bar/get_bar_list",method:"get",params:e})}function o(e){return Object(n["a"])({url:"/user/get_upload_token",method:"get",params:e})}function c(e){var t=e,a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM";r.a.defaults.headers.common["jwt"]=a,r.a.post("https://api.corgi.org.cn/bar/add_bar",t).then((function(e){console.log("res=>",e)}))}function l(e){var t=e,a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM";r.a.defaults.headers.common["jwt"]=a,r.a.post("https://api.corgi.org.cn/bar/update_bar",t).then((function(e){console.log("res=>",e)}))}function u(e){return Object(n["a"])({url:"/bar/get_bar_activity",method:"get",params:e})}function d(e){var t=e,a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM";r.a.defaults.headers.common["jwt"]=a,r.a.post("https://api.corgi.org.cn/bar/add_bar_activity",t).then((function(e){console.log("res=>",e)}))}function m(e){return Object(n["a"])({url:"/bar/get_bar",method:"get",params:e})}function p(e){var t=e,a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM";r.a.defaults.headers.common["jwt"]=a,r.a.post("https://api.corgi.org.cn/bar/update_bar_activity",t).then((function(e){console.log("res=>",e)}))}function h(e){return Object(n["a"])({url:"/activity/delete_activity",method:"get",params:e})}function f(e){return Object(n["a"])({url:"/bar/recommend",method:"get",params:e})}function b(e){return Object(n["a"])({url:"/bar/unrecommend",method:"get",params:e})}function g(e){return Object(n["a"])({url:"/hot/list_hot_activity",method:"get",params:e})}function v(e){var t=e,a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU0MjUwNDgsInVzZXJJZCI6Ii0xIiwidmVyc2lvbiI6IlYxLjAiLCJpYXQiOjE1ODgzMDIxNTV9.UcR_5JX0hIPBzySF9q4vh4oI8DyY7pXmHTzQqffiKkM";r.a.defaults.headers.common["jwt"]=a,r.a.post("http://139.224.63.240:7888/hot/update_hot_activity",t).then((function(e){console.log("res=>",e)}))}function y(e){return Object(n["a"])({url:"/hot/delete_hot_activity",method:"get",params:e})}function w(e){return Object(n["a"])({url:"/activity/get_detail",method:"get",params:e})}},"2c05":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-date-picker",{attrs:{type:e.type,align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,size:"small"},model:{value:e.pickTimeRange,callback:function(t){e.pickTimeRange=t},expression:"pickTimeRange"}})},i=[],r=a("37b6"),s={props:{type:{type:String,default:"daterange"},timeRange:{type:Array,default:function(){return[]}},defaultToday:{type:Boolean,default:!1}},data:function(){return{pickerOptions:r["l"],pickTimeRange:[]}},watch:{pickTimeRange:function(e){this.$emit("update:timeRange",e)}},created:function(){if(this.defaultToday){var e=this.$day(new Date).subtract(1,"day").toDate();this.pickTimeRange=[e,e]}else{var t=new Date;this.pickTimeRange=[this.$day(t).subtract(30,"day").toDate(),t]}}},o=s,c=a("2877"),l=Object(c["a"])(o,n,i,!1,null,null,null);t["a"]=l.exports},"3f04":function(e,t,a){},"4c02":function(e,t,a){"use strict";var n=a("768b"),i=(a("ffc1"),a("ac6a"),a("7346"));t["a"]={mixins:[i["c"]],watch:{$route:function(){this.reload()}},mounted:function(){var e=this;this.$nextTick((function(){return e.addTabelHeightListener("parent")})),this.reload()},methods:{sortUserId:function(e,t){return e.userId-t.userId},searchData:function(){this.resetPagination()},reload:function(){var e=this,t=this.$route.params,a=t.shouldChangeForm,i=t.rewriteForm;a&&Object.entries(i).forEach((function(t){var a=Object(n["a"])(t,2),i=a[0],r=a[1];return e.$set(e.searchForm,i,r)})),this.getData()}}}},"529f":function(e,t,a){"use strict";var n=a("e86b"),i=a.n(n);i.a},"64f6":function(e,t,a){"use strict";var n=a("3f04"),i=a.n(n);i.a},"7c9c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentMgr-avator"},[a("div",{staticClass:"flex search-bar"},[a("el-form",{ref:e.searchRef,staticClass:"flex-wrap filter",attrs:{model:e.searchForm,rules:e.formRules}},[a("div",{staticClass:"flex search-bar"},[a("div",{staticClass:"search-btnGroup flex"},[this.InbarId?a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleAddMember()}}},[e._v("新增活动")]):e._e()],1)]),e._v(" "),a("div",{staticClass:"flex search-bar"},[a("el-form",{ref:e.searchRef,staticClass:"filter flex-wrap",attrs:{model:e.searchForm,rules:e.formRules}},[a("el-form-item",{staticClass:"flex filter-item",attrs:{label:"商家ID/名称",prop:"userId"}},[a("el-input",{attrs:{type:"text",placeholder:"请输入商家ID或名称"},model:{value:e.InbarId,callback:function(t){e.InbarId=t},expression:"InbarId"}})],1)],1),e._v(" "),a("div",{staticClass:"search-btnGroup flex"},[a("el-button",{attrs:{type:"primary"},on:{click:e.get_bar_activity}},[e._v("搜索")])],1)],1)])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingMap.tableLoading,expression:"loadingMap.tableLoading"},{name:"viewer",rawName:"v-viewer",value:{movable:!0},expression:"{movable: true}"}],ref:e.refMap.table,staticClass:"main-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:!0,"header-cell-style":{textAlign:"center"}}},[a("el-table-column",{attrs:{sortable:"",label:"商户ID",align:"center",prop:"userId",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:"活动名称",align:"center",prop:"title",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"createTime",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{label:"活动简介",align:"center",prop:"content",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{label:"活动地址",align:"center",prop:"address",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{label:"活动开始时间",align:"center",prop:"startTime",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{label:"活动结束时间",align:"center",prop:"endTime",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{width:"120",height:"80",label:"活动图片",align:"center",prop:"logo"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.row.pics[0].picUrl,expression:"scope.row.pics[0].picUrl"}],staticClass:"avator-img",attrs:{width:"120",height:"80"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",prop:"state",formatter:e.formatColumn,width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){return e.handleAddMember(t.row)}}},[e._v("编辑")]),e._v(" "),"enable"==t.row.recommend?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.recommonActive(t.row,0)}}},[e._v("取消推荐")]):a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.recommonActive(t.row,1)}}},[e._v("推荐")]),e._v(" "),a("el-button",{attrs:{type:"success:hover",size:"mini"},on:{click:function(a){return e.addHot(t.row)}}},[e._v("添加热门")])]}}])})],1),e._v(" "),a("detail",{attrs:{"use-data":e.catchedData,visible:e.visibleMap.detailDiaVisible},on:{"update:visible":function(t){return e.$set(e.visibleMap,"detailDiaVisible",t)},emitFunc:e.acceptEmitFunc}}),e._v(" "),a("Status-dialog",{attrs:{"use-data":e.catchedData,visible:e.visibleMap.statusDialogVisible},on:{"update:visible":function(t){return e.$set(e.visibleMap,"statusDialogVisible",t)},emitFunc:e.acceptEmitFunc}})],1)},i=[],r=(a("96cf"),a("3b8d")),s=a("db72"),o=a("2bef"),c=a("aea5"),l=a("28b9"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dialog-report"},[a("el-dialog",{attrs:{title:"新增活动",top:"8vh",visible:e.show,width:"600px","close-on-click-modal":!1},on:{"update:visible":function(t){e.show=t}}},[a("div",{staticClass:"detail-dialog-wrap"},[a("vue-scroll",[a("el-form",{ref:"form",attrs:{model:e.useData,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"活动名称",prop:"id"}},[a("el-input",{staticStyle:{width:"57%"},attrs:{name:"title",tabindex:"1","auto-complete":"off"},model:{value:e.useData.title,callback:function(t){e.$set(e.useData,"title",t)},expression:"useData.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动描述",prop:"id"}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.useData.content,expression:"useData.content"}],staticStyle:{width:"57%"},attrs:{name:"content",tabindex:"1",rows:5,"auto-complete":"off"},domProps:{value:e.useData.content},on:{input:function(t){t.target.composing||e.$set(e.useData,"content",t.target.value)}}})]),e._v(" "),a("el-form-item",{attrs:{label:"商户地址",prop:"reportUserName"}},[a("el-input",{staticStyle:{width:"57%"},attrs:{name:"address",tabindex:"1","auto-complete":"off"},model:{value:e.useData.address,callback:function(t){e.$set(e.useData,"address",t)},expression:"useData.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动时间",prop:"accuseId"}},[e._v("\n        自：        \n    "),a("el-date-picker",{staticStyle:{width:"50%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm","value-format":"yyyy-MM-dd HH:mm",placeholder:"选择日期时间"},model:{value:e.useData.startTime,callback:function(t){e.$set(e.useData,"startTime",t)},expression:"useData.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"accuseType"}},[e._v("\n\n        \n                至：    "),a("el-date-picker",{staticStyle:{width:"50%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm","value-format":"yyyy-MM-dd HH:mm",placeholder:"选择日期时间"},model:{value:e.useData.endTime,callback:function(t){e.$set(e.useData,"endTime",t)},expression:"useData.endTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动图片",prop:"reportUserId"}},[a("el-button",{staticClass:"fileParent",staticStyle:{background:"#808080"},attrs:{type:"file",icon:"el-icon-plus"},on:{change:e.uploadFile}},[e.tempImg?a("img",{attrs:{src:e.tempImg,alt:""}}):e._e(),e._v(" "),e.useData.id&&!e.tempImg?a("img",{attrs:{src:e.useData.pics[0].picUrl,alt:""}}):e._e(),e._v(" "),a("input",{staticClass:"file",attrs:{type:"file",multiple:"multiple"},on:{change:e.uploadFile}})])],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"accuseName"}},[a("el-radio-group",{staticClass:"radio-group",attrs:{size:"mini"},on:{change:e.handleRadioChange},model:{value:e.chartRadio,callback:function(t){e.chartRadio=t},expression:"chartRadio"}},[a("el-radio-button",{attrs:{label:"启用"}}),e._v(" "),a("el-radio-button",{attrs:{label:"禁用"}})],1)],1)],1),e._v(" "),this.useData.id?a("el-button",{staticStyle:{width:"10%","margin-left":"50%","margin-top":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleAddMember()}}},[e._v("更新")]):a("el-button",{staticStyle:{width:"10%","margin-left":"50%","margin-top":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleAddMember()}}},[e._v("新增")])],1)],1)])],1)},d=[],m=a("97e8"),p=m["a"],h=(a("529f"),a("2877")),f=Object(h["a"])(p,u,d,!1,null,null,null),b=f.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dialog-report"},[a("el-dialog",{attrs:{title:"新增热门",top:"8vh",visible:e.show,width:"600px","close-on-click-modal":!1},on:{"update:visible":function(t){e.show=t}}},[a("div",{staticClass:"detail-dialog-wrap"},[a("vue-scroll",[a("el-form",{ref:"form",attrs:{model:e.useData,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"商户活动名称",prop:"reportUserName"}},[a("el-input",{staticStyle:{width:"50%"},attrs:{name:"title",tabindex:"1","auto-complete":"off"},model:{value:e.useData.title,callback:function(t){e.$set(e.useData,"title",t)},expression:"useData.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"投放地区",prop:"accuseName"}},[a("el-radio-group",{staticClass:"radio-group",attrs:{size:"mini"},on:{change:e.handleRadioChange},model:{value:e.useData.radio,callback:function(t){e.$set(e.useData,"radio",t)},expression:"useData.radio"}},[a("el-radio-button",{attrs:{label:"活动当地"}}),e._v(" "),a("el-radio-button",{attrs:{label:"全国"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"活动时间",prop:"accuseId"}},[e._v("\n      自：        \n  "),a("el-date-picker",{staticStyle:{width:"50%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm","value-format":"yyyy-MM-dd HH:mm",placeholder:"选择日期时间"},model:{value:e.useData.startTime,callback:function(t){e.$set(e.useData,"startTime",t)},expression:"useData.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"accuseType"}},[e._v("\n\n      \n              至：    "),a("el-date-picker",{staticStyle:{width:"50%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm","value-format":"yyyy-MM-dd HH:mm",placeholder:"选择日期时间"},model:{value:e.useData.endTime,callback:function(t){e.$set(e.useData,"endTime",t)},expression:"useData.endTime"}})],1)],1),e._v(" "),a("el-button",{staticStyle:{width:"10%","margin-left":"50%","margin-top":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleAddMember()}}},[e._v("新增")])],1)],1)])],1)},v=[],y=a("8357"),w=y["a"],I=(a("64f6"),Object(h["a"])(w,g,v,!1,null,null,null)),D=I.exports,x=a("e33a"),k=a("4c02"),_=a("7346"),R=a("37b6"),T=a("8477"),j={components:{Censorshipstatus:c["a"],StatusDialog:D,Detail:b,Userid:l["a"]},mixins:[x["a"],k["a"],_["a"]],data:function(){return Object(s["a"])({allCensorshipTypes:R["c"],InbarId:"",visibleMap:{censorDiaVisible:!1,detailDiaVisible:!1,statusDialogVisible:!1}},T["a"])},methods:{getData:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),get_bar_activity:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t=this.InbarId,a=1,n=100,e.next=6,Object(o["f"])({barId:t,page:a,pageSize:n});case 6:i=e.sent,console.log(i),this.tableData=i.data.map((function(e){return e.state="deleted"==e.status?"禁用":"启用",e})),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,this,[[0,11]])})));function t(){return e.apply(this,arguments)}return t}(),checkPicPass:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.row.dataId,n=this.censorType,i=-1,e.next=6,passPic({dataId:a,type:n,userId:i});case 6:this.$message({type:"success",message:"操作成功"}),this.getData(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}(),handleAddMember:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t),(void 0==t||t.length<=0)&&(a=this.InbarId,n={userId:a},t=n,console.log(t)),this.catchedData=t,this.visibleMap.detailDiaVisible=!0;case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),recommonActive:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,a){var n,i,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(t),(void 0==t||t.length<=0)&&(n=this.InbarId,i={userId:n},t=i,console.log(t)),r=t.id,1!=a){e.next=8;break}return e.next=6,Object(o["k"])({activityId:r});case 6:e.next=11;break;case 8:if(0!=a){e.next=11;break}return e.next=11,Object(o["l"])({activityId:r});case 11:this.$message({type:"success",message:"操作成功"}),this.get_bar_activity();case 13:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}(),addHot:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.catchedData=t,this.visibleMap.statusDialogVisible=!0;case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkPicRefuse:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$msgbox.confirm("确定删除吗","提醒",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0});case 3:return a=t.row.id,e.next=6,Object(o["c"])({activityId:a});case 6:this.$message({type:"success",message:"操作成功"}),this.get_bar_activity(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),"cancel"!==e.t0&&console.log(e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}()}},O=j,M=(a("aa63"),Object(h["a"])(O,n,i,!1,null,null,null));t["default"]=M.exports},8357:function(e,t,a){"use strict";(function(e){a("7f7f"),a("96cf");var n=a("3b8d"),i=a("13e7"),r=a("37b6"),s=a("27aa"),o=a("28b9"),c=a("69c0"),l=a("7346");t["a"]={components:{ReportStatus:s["a"],Userid:o["a"],Activityid:c["a"]},mixins:[l["d"]],props:{useData:{type:Object,default:function(){return{}}}},data:function(){return{tempImg:"",shopState:!0,allReportType:r["f"]}},methods:{getData:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(this.useData);case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleAddMember:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,a,n,r,s,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=this.useData.userId,a=this.useData.id,n=this.useData.startTime,r=this.useData.endTime,s=1,o="1",c="recommend",l="",e.t0=this.useData.radio,e.next="活动当地"===e.t0?11:"全国"===e.t0?13:15;break;case 11:return l=this.useData.city,e.abrupt("break",16);case 13:return l="全国",e.abrupt("break",16);case 15:throw new Error("Table Layout don't have event "+this.chartRadio+".");case 16:u={barId:t,activityId:a,startTime:n,endTime:r,order:s,status:o,type:c,city:l},console.log(u),Object(i["b"])(u),this.$emit("emitFunc",{function:"getData",arguments:[]}),this.handleDialogClose(),this.$emit("emitFunc",{function:"getData",arguments:[]});case 22:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),postimg:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var n,r,s,o,c,l,u,d,m,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["A"])({});case 2:return n=e.sent,r="oss-cn-beijing",s=n.data.accessKeyId,o=n.data.accessKeySecret,c=n.data.bucketName,l=a("9b15"),console.log(s),u=new l({region:r,accessKeyId:s,accessKeySecret:o,stsToken:n.data.securityToken,bucket:c}),console.log(u),d=Date.parse(new Date),m="".concat(d),m=Base64.encode(m),m="shop/"+m,console.log(m),e.prev=16,e.next=19,u.put(m,t);case 19:p=e.sent,console.log(p),this.tempImg=p.url,console.log(tempImg),e.next=28;break;case 25:e.prev=25,e.t0=e["catch"](16),console.log(e.t0);case 28:case"end":return e.stop()}}),e,this,[[16,25]])})));function t(t){return e.apply(this,arguments)}return t}(),uploadFile:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=this,n=t.target.files[0],i=n.name.lastIndexOf("."),r=n.name.substr(i),s=n.name.substr(0,i),o=Date.parse(new Date),s="".concat(s,"_").concat(o).concat(r),a.postimg(n);case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),compress:function(t,a){var n=document.createElement("canvas"),i=n.getContext("2d"),r=(t.src.length,t.width),s=t.height;n.width=r,n.height=s,i.fillStyle="#fff",i.fillRect(0,0,n.width,n.height),i.drawImage(t,0,0,r,s);var o=n.toDataURL("image/jpeg",a);console.log("*******压缩后的图片大小*******"),console.log(o.length/1024);var c=e.from(o,"base64");return console.log(c),c},handleRadioChange:function(e){this.shopState="启用"===this.chartRadio}}}}).call(this,a("b639").Buffer)},8477:function(e,t,a){"use strict";t["a"]={data:function(){return{baseTimeRange:[]}},searchForm:{status:""},formRules:{},censorType:"user"}},"97e8":function(e,t,a){"use strict";(function(e){a("7f7f"),a("96cf");var n=a("3b8d"),i=a("2bef"),r=a("37b6"),s=a("2c05"),o=a("27aa"),c=a("28b9"),l=a("69c0"),u=a("7346"),d=a("8477");t["a"]={components:{dateRangePicker:s["a"],ReportStatus:o["a"],Userid:c["a"],Activityid:l["a"]},mixins:[u["d"],d["a"]],props:{useData:{type:Object,default:function(){return{}}}},data:function(){return{timevalue1:"",timevalue2:"",tempImg:"",chartRadio:"启用",shopState:!0,allReportType:r["f"]}},methods:{getData:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(this.useData);case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleAddMember:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,a,n,r,s,o,c,l,u,d,m,p,h,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["e"])({barId:this.useData.userId});case 2:t=e.sent,console.log(t.data),a=this.useData.title,n=this.useData.content,r=this.useData.userId,s=this.useData.startTime,o=this.useData.endTime,c=t.data.lat,l=t.data.lng,u=t.data.city,d=this.useData.address,m="created",m="启用"===this.chartRadio?"created":"deleted",p=[{picUrl:this.tempImg}],console.log(t),this.useData.id?(this.tempImg&&(this.useData.pics=[{picUrl:this.tempImg}]),h={title:a,city:u,content:n,userId:r,startTime:s,endTime:o,lat:c,lng:l,address:d,status:m,pics:this.useData.pics,id:this.useData.id},console.log(h),Object(i["n"])(h),this.handleDialogClose(),this.$emit("emitFunc",{function:"get_bar_activity",arguments:[]})):(f={title:a,city:u,content:n,userId:r,startTime:s,endTime:o,lat:c,lng:l,address:d,status:m,pics:p},console.log(f),Object(i["b"])(f),this.handleDialogClose(),this.$emit("emitFunc",{function:"get_bar_activity",arguments:[]}));case 18:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),postimg:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var n,r,s,o,c,l,u,d,m,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["i"])({});case 2:return n=e.sent,r="oss-cn-beijing",s=n.data.accessKeyId,o=n.data.accessKeySecret,c=n.data.bucketName,l=a("9b15"),console.log(s),u=new l({region:r,accessKeyId:s,accessKeySecret:o,stsToken:n.data.securityToken,bucket:c}),console.log(u),d=Date.parse(new Date),m="".concat(d),m=Base64.encode(m),m="shop/"+m,console.log(m),e.prev=16,e.next=19,u.put(m,t);case 19:p=e.sent,console.log(p),this.tempImg=p.url,console.log(tempImg),e.next=28;break;case 25:e.prev=25,e.t0=e["catch"](16),console.log(e.t0);case 28:case"end":return e.stop()}}),e,this,[[16,25]])})));function t(t){return e.apply(this,arguments)}return t}(),uploadFile:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i,r,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=this,n=t.target.files[0],i=n.name.lastIndexOf("."),r=n.name.substr(i),s=n.name.substr(0,i),o=Date.parse(new Date),s="".concat(s,"_").concat(o).concat(r),a.postimg(n);case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),compress:function(t,a){var n=document.createElement("canvas"),i=n.getContext("2d"),r=(t.src.length,t.width),s=t.height;n.width=r,n.height=s,i.fillStyle="#fff",i.fillRect(0,0,n.width,n.height),i.drawImage(t,0,0,r,s);var o=n.toDataURL("image/jpeg",a);console.log("*******压缩后的图片大小*******"),console.log(o.length/1024);var c=e.from(o,"base64");return console.log(c),c},handleRadioChange:function(e){this.shopState="启用"===this.chartRadio}}}}).call(this,a("b639").Buffer)},aa63:function(e,t,a){"use strict";var n=a("19e7"),i=a.n(n);i.a},e33a:function(e,t,a){"use strict";a("f6b3"),a("ac6a"),a("456d");var n=a("9abb"),i={components:{Paginationtpl:n["a"]},data:function(){return{pagination:{page:1,pageSize:10},paginationTotal:0}},watch:{pagination:{handler:function(){this.getData()},deep:!0}},methods:{resetPagination:function(){this.pagination={page:1,pageSize:10}}}};t["a"]={mixins:[i],data:function(){return{refMap:{table:"mainTable"},tableData:[],catchedDataArr:[],catchedData:{},catchedRadio:null,tableSelected:!1,tableHeight:200,extraHeight:110,loadingMap:{tableLoading:!1},visibleMap:{tableVisible:!1},renderMap:{tableRender:!1},switchMap:{getDataOnRender:!0}}},computed:{isTableRadioSelected:function(){return Object.keys(this.catchedData).length},isTableCheckBoxSelected:function(){return this.catchedDataArr.length>0}},mounted:function(){Reflect.has(this,"getData")&&this.switchMap.getDataOnRender&&this.getData()},watch:{"loadingMap.tableLoading":function(e){var t=this;e||this.$nextTick((function(){var e=t.$refs[t.refMap.table];e&&e.doLayout()}))}},methods:{handleTableCheckBoxSelect:function(e){this.catchedDataArr=e,this.tableSelected=this.$refs[this.refMap.table].selection.length>0},handleTabelRadioClick:function(e){this.catchedRadio=e,this.catchedData=this.tableData[e]},handleTableItemClick:function(e){this.catchedData=e},setTableHeightBySelf:function(){var e=this.minTableHeight,t=void 0===e?0:e,a=this.$refs[this.searchRef],n=a&&a.$el.clientHeight||0,i=this.$el.clientHeight-this.extraHeight-n;this.tableHeight=i<t?t:i},setTableHeightByParent:function(){var e=this.minTableHeight,t=void 0===e?0:e,a=this.$refs[this.searchRef],n=a&&a.$el.clientHeight||0,i=this.$parent.$el.clientHeight-this.extraHeight-n;this.tableHeight=i<t?t:i},watchResizeFinish:function(e,t){var a=this;return clearTimeout(t),t=setTimeout((function(){return new Promise((function(t){a.renderMap.tableRender=!0,t(e()),a.$nextTick((function(){setTimeout((function(){a.renderMap.tableRender=!1}),100)}))}))}),100),t},addTabelHeightListener:function(){var e,t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"self",n="self"===a?this.$el:this.$parent.$el,i="self"===a?this.setTableHeightBySelf:this.setTableHeightByParent;this.$erd.listenTo(n,(function(a){t.renderMap.tableRender||(e=t.watchResizeFinish(i,e))}))},isTableSelected:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"请先选择需要修改的数据";return!(!this.isTableRadioSelected&&!this.isTableCheckBoxSelected)||(this.$message({type:"warning",message:e}),!1)},formatColumn:function(e,t,a,n){return null===a||""===a||void 0===a?"--":a}},beforeDestroy:function(){this.$erd.removeAllListeners(this.$el)}}},e86b:function(e,t,a){}}]);