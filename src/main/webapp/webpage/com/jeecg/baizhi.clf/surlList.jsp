<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
  <div region="center" style="padding:0px;border:0px">
  <t:datagrid name="surlList" checkbox="false" pagination="true" fitColumns="true" title="店铺地址" actionUrl="surlController.do?datagrid" idField="id" fit="true" queryMode="group">
   <t:dgCol title="主键"  field="id"  hidden="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="店铺地址"  field="url"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="店铺状态"  field="status"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="店长外键"  field="adminId"  query="true"  queryMode="single"  dictionary="t_s_base_user,id,username"  width="120"></t:dgCol>
   <t:dgCol title="中文店名"  field="name1"  query="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="德文店名"  field="name2"  query="true"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="最低包邮价格"  field="minPrice"  queryMode="single"  width="120"></t:dgCol>
   <t:dgCol title="操作" field="opt" width="100"></t:dgCol>
   <t:dgDelOpt title="删除" url="surlController.do?doDel&id={id}" urlclass="ace_button"  urlfont="fa-trash-o"/>
   <t:dgToolBar title="录入" icon="icon-add" url="surlController.do?goAdd" funname="add"></t:dgToolBar>
   <t:dgToolBar title="编辑" icon="icon-edit" url="surlController.do?goUpdate" funname="update"></t:dgToolBar>
   <t:dgToolBar title="批量删除"  icon="icon-remove" url="surlController.do?doBatchDel" funname="deleteALLSelect"></t:dgToolBar>
   <t:dgToolBar title="查看" icon="icon-search" url="surlController.do?goUpdate" funname="detail"></t:dgToolBar>
   <t:dgToolBar title="导入" icon="icon-put" funname="ImportXls"></t:dgToolBar>
   <t:dgToolBar title="导出" icon="icon-putout" funname="ExportXls"></t:dgToolBar>
   <t:dgToolBar title="模板下载" icon="icon-putout" funname="ExportXlsByT"></t:dgToolBar>
  </t:datagrid>
  </div>
 </div>
 <script src = "webpage/com/jeecg/baizhi.clf/surlList.js"></script>		
 <script type="text/javascript">
 $(document).ready(function(){
 });
 
   
 
//导入
function ImportXls() {
	openuploadwin('Excel导入', 'surlController.do?upload', "surlList");
}

//导出
function ExportXls() {
	JeecgExcelExport("surlController.do?exportXls","surlList");
}

//模板下载
function ExportXlsByT() {
	JeecgExcelExport("surlController.do?exportXlsByT","surlList");
}

 </script>