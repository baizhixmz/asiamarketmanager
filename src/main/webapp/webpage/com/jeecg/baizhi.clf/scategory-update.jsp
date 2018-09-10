<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
 <head>
  <title>类别表</title>
  <t:base type="jquery,easyui,tools,DatePicker"></t:base>
 </head>
 <body style="overflow-y: hidden" scroll="no">
  <t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="scategoryController.do?doUpdate" beforeSubmit="getVal">
			<input id="id" name="id" type="hidden" value="${scategoryPage.id }">
			<table style="width: 600px;" cellpadding="0" cellspacing="1" class="formtable">
				<tr>
					<td align="right">
						<label class="Validform_label">
							类别名字:
						</label>
					</td>
					<td class="value">
						<input class="inputxt" id="name" type="hidden" name="name"  value="${scategoryPage.name}" />
						<input class="inputxt" id="name_c"  datatype="*2-50" />:中文&nbsp;&nbsp;
                        <input class="inputxt" id="name_g"  />:德文
						<span class="Validform_checktip"></span>
					</td>
				</tr>
			</table>
		</t:formvalid>
		<script type="text/javascript">
			$(function(){
				var id = "${scategory.id}";
				var name = "${scategory.name}";
				var arr = name.split("/");
				$("#id").attr("value",id);
				$("#name_c").attr("value",arr[0]);
				$("#name_g").attr("value",arr[1]);
				
				
				
			})
		
		
		    function getVal() {
		       
		       
		        var name_c = $("#name_c").val();
		        var name_g = $("#name_g").val();
		       
		        if(name_g != ''){
		        	
			        $("#name").attr("value",name_c+"/"+name_g);
		        }else{
			        $("#name").attr("value",name_c);
		        	
		        }
		        
		    }
		</script>
 </body>