(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40684458"],{1014:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentMgr-avator"},[a("div",{staticClass:"flex search-bar"},[a("el-form",{ref:e.searchRef,staticClass:"flex-wrap filter",attrs:{model:e.searchForm,rules:e.formRules}},[a("el-form-item",{staticClass:"flex filter-item",attrs:{label:"审核状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"请选择审核状态"},model:{value:e.searchForm.status,callback:function(t){e.$set(e.searchForm,"status",t)},expression:"searchForm.status"}},e._l(e.allCensorshipTypes,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),e._v(" "),a("div",{staticClass:"search-btnGroup flex"},[a("el-button",{attrs:{type:"primary"},on:{click:e.searchData}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.resetForm}},[e._v("重置")])],1)],1),e._v(" "),a("div",{staticClass:"page-desc"},[e._v(e._s(e.$route.meta.title)+"：仅头像照片自动审核未通过的将进入此板块集中处理")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingMap.tableLoading,expression:"loadingMap.tableLoading"},{name:"viewer",rawName:"v-viewer",value:{movable:!0},expression:"{movable: true}"}],ref:e.refMap.table,staticClass:"main-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:!0,"header-cell-style":{textAlign:"center"},height:e.tableHeight,"default-sort":{prop:"userId",order:"descending"}}},[a("el-table-column",{attrs:{sortable:"",label:"用户ID",align:"center",prop:"userId",width:"150"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("userid",{attrs:{id:e.row.userId}})]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",label:"照片",align:"center",prop:"image"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.row.picUrl,expression:"scope.row.picUrl"}],staticClass:"avator-img"})]}}])}),e._v(" "),a("el-table-column",{attrs:{sortable:"",label:"照片上传时间",align:"center",prop:"ctime",formatter:e.formatColumn}}),e._v(" "),a("el-table-column",{attrs:{sortable:"",label:"审核状态",align:"center",prop:"ctime",formatter:e.formatColumn,width:"150"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("censorshipstatus",{attrs:{status:e.row.status}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return["check"===t.row.status?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){return e.checkPicPass(t)}}},[e._v("通过")]):e._e(),e._v(" "),"failed"!==t.row.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.checkPicRefuse(t)}}},[e._v("不通过")]):e._e(),e._v(" "),"failed"===t.row.status?a("el-button",{attrs:{type:"info",disabled:"",size:"mini"}},[e._v("已删除")]):e._e()]}}])})],1),e._v(" "),a("paginationtpl",{attrs:{pagination:e.pagination,"pagination-total":e.paginationTotal}})],1)},r=[],i=(a("ac6a"),a("5df3"),a("96cf"),a("3b8d")),s=a("db72"),c=a("13e7"),o=a("aea5"),l=a("28b9"),u=a("e33a"),h=a("35a9"),d=a("37b6"),p={searchForm:{status:""},formRules:{},censorType:"user"},f={components:{Censorshipstatus:o["a"],Userid:l["a"]},mixins:[u["a"],h["a"]],data:function(){return Object(s["a"])({allCensorshipTypes:d["c"]},p)},methods:{getData:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingMap.tableLoading=!0,t=[this.getCheckPic(),this.getCheckPicCount()],e.next=5,Promise.all(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:return e.prev=10,this.loadingMap.tableLoading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}(),getCheckPic:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t=this.censorType,e.next=4,Object(c["v"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({},this.searchForm),this.pagination),{},{type:t}));case 4:a=e.sent,this.tableData=a.data.map((function(e){return e.ctime=e.ctime.slice(0,-2),e.uptime=e.uptime.slice(0,-2),e})),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}(),getCheckPicCount:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t=this.censorType,e.next=4,Object(c["l"])(Object(s["a"])(Object(s["a"])({},this.searchForm),{},{type:t}));case 4:a=e.sent,this.paginationTotal=a.data,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}(),checkPicPass:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t.row.dataId,n=this.censorType,r=-1,e.next=6,Object(c["D"])({dataId:a,type:n,userId:r});case 6:this.$message({type:"success",message:"操作成功"}),this.getData(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(t){return e.apply(this,arguments)}return t}(),sendmessage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,i,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a="很抱歉~您发送的照片审核失败咯，快调整下姿势重新来过吧",n=0,r="给"+t+"发的审核通知",i="created",s=[{ruleKey:"userId",ruleValue:t}],o={content:a,status:i,sentTime:n,title:r,rules:s},console.log(o),Object(c["c"])(o);case 8:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),checkPicRefuse:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$msgbox.confirm("确定不通过该图片","提醒",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0});case 3:return a=t.row.dataId,n=this.censorType,r=-1,e.next=8,Object(c["H"])({dataId:a,type:n,userId:r});case 8:this.sendmessage(t.row.userId),this.$message({type:"success",message:"操作成功"}),this.getData(),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](0),"cancel"!==e.t0&&console.log(e.t0);case 16:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}},g=f,b=(a("8759"),a("2877")),m=Object(b["a"])(g,n,r,!1,null,null,null);t["default"]=m.exports},"35a9":function(e,t,a){"use strict";var n=a("768b"),r=(a("ffc1"),a("ac6a"),a("7346"));t["a"]={mixins:[r["c"]],watch:{$route:function(){this.reload()}},mounted:function(){var e=this;this.$nextTick((function(){return e.addTabelHeightListener("parent")})),this.reload()},methods:{sortUserId:function(e,t){return e.userId-t.userId},searchData:function(){this.resetPagination()},reload:function(){var e=this,t=this.$route.params,a=t.shouldChangeForm,r=t.rewriteForm;a&&Object.entries(r).forEach((function(t){var a=Object(n["a"])(t,2),r=a[0],i=a[1];return e.$set(e.searchForm,r,i)})),this.getData()}}}},8759:function(e,t,a){"use strict";var n=a("a0a8"),r=a.n(n);r.a},a0a8:function(e,t,a){},e33a:function(e,t,a){"use strict";a("f6b3"),a("ac6a"),a("456d");var n=a("9abb"),r={components:{Paginationtpl:n["a"]},data:function(){return{pagination:{page:1,pageSize:10},paginationTotal:0}},watch:{pagination:{handler:function(){this.getData()},deep:!0}},methods:{resetPagination:function(){this.pagination={page:1,pageSize:10}}}};t["a"]={mixins:[r],data:function(){return{refMap:{table:"mainTable"},tableData:[],catchedDataArr:[],catchedData:{},catchedRadio:null,tableSelected:!1,tableHeight:200,extraHeight:110,loadingMap:{tableLoading:!1},visibleMap:{tableVisible:!1},renderMap:{tableRender:!1},switchMap:{getDataOnRender:!0}}},computed:{isTableRadioSelected:function(){return Object.keys(this.catchedData).length},isTableCheckBoxSelected:function(){return this.catchedDataArr.length>0}},mounted:function(){Reflect.has(this,"getData")&&this.switchMap.getDataOnRender&&this.getData()},watch:{"loadingMap.tableLoading":function(e){var t=this;e||this.$nextTick((function(){var e=t.$refs[t.refMap.table];e&&e.doLayout()}))}},methods:{handleTableCheckBoxSelect:function(e){this.catchedDataArr=e,this.tableSelected=this.$refs[this.refMap.table].selection.length>0},handleTabelRadioClick:function(e){this.catchedRadio=e,this.catchedData=this.tableData[e]},handleTableItemClick:function(e){this.catchedData=e},setTableHeightBySelf:function(){var e=this.minTableHeight,t=void 0===e?0:e,a=this.$refs[this.searchRef],n=a&&a.$el.clientHeight||0,r=this.$el.clientHeight-this.extraHeight-n;this.tableHeight=r<t?t:r},setTableHeightByParent:function(){var e=this.minTableHeight,t=void 0===e?0:e,a=this.$refs[this.searchRef],n=a&&a.$el.clientHeight||0,r=this.$parent.$el.clientHeight-this.extraHeight-n;this.tableHeight=r<t?t:r},watchResizeFinish:function(e,t){var a=this;return clearTimeout(t),t=setTimeout((function(){return new Promise((function(t){a.renderMap.tableRender=!0,t(e()),a.$nextTick((function(){setTimeout((function(){a.renderMap.tableRender=!1}),100)}))}))}),100),t},addTabelHeightListener:function(){var e,t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"self",n="self"===a?this.$el:this.$parent.$el,r="self"===a?this.setTableHeightBySelf:this.setTableHeightByParent;this.$erd.listenTo(n,(function(a){t.renderMap.tableRender||(e=t.watchResizeFinish(r,e))}))},isTableSelected:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"请先选择需要修改的数据";return!(!this.isTableRadioSelected&&!this.isTableCheckBoxSelected)||(this.$message({type:"warning",message:e}),!1)},formatColumn:function(e,t,a,n){return null===a||""===a||void 0===a?"--":a}},beforeDestroy:function(){this.$erd.removeAllListeners(this.$el)}}},f6b3:function(e,t,a){var n=a("5ca1");n(n.S,"Reflect",{has:function(e,t){return t in e}})}}]);