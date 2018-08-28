<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
  <div region="center" style="padding:0px;border:0px">
  <t:datagrid name="suserList" checkbox="true" pagination="true" fitColumns="true" title="用户信息" actionUrl="suserController.do?datagrid" idField="id" fit="true" queryMode="group">
   <t:dgCol title="主键"  field="id"  hidden="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="cookieID"  field="cookieid"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="手机号"  field="phone"  query="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="收货地址"  field="address"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="收货人"  field="name"  query="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="取货时间"  field="qtime"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="操作" field="opt" width="100"></t:dgCol>
   <t:dgDelOpt title="删除" url="suserController.do?doDel&id={id}" urlclass="ace_button"  urlfont="fa-trash-o"/>
   <t:dgToolBar title="录入" icon="icon-add" url="suserController.do?goAdd" funname="add"></t:dgToolBar>
   <t:dgToolBar title="编辑" icon="icon-edit" url="suserController.do?goUpdate" funname="update"></t:dgToolBar>
   <t:dgToolBar title="批量删除"  icon="icon-remove" url="suserController.do?doBatchDel" funname="deleteALLSelect"></t:dgToolBar>
   <t:dgToolBar title="查看" icon="icon-search" url="suserController.do?goUpdate" funname="detail"></t:dgToolBar>
   <t:dgToolBar title="导入" icon="icon-put" funname="ImportXls"></t:dgToolBar>
   <t:dgToolBar title="导出" icon="icon-putout" funname="ExportXls"></t:dgToolBar>
   <t:dgToolBar title="模板下载" icon="icon-putout" funname="ExportXlsByT"></t:dgToolBar>
  </t:datagrid>
  </div>
 </div>
 <script src = "webpage/com/jeecg/baizhi.clf/suserList.js"></script>		
 <script type="text/javascript">
 $(document).ready(function(){
 });
 
   
 
//导入
function ImportXls() {
	openuploadwin('Excel导入', 'suserController.do?upload', "suserList");
}

//导出
function ExportXls() {
	JeecgExcelExport("suserController.do?exportXls","suserList");
}

//模板下载
function ExportXlsByT() {
	JeecgExcelExport("suserController.do?exportXlsByT","suserList");
}

 </script>