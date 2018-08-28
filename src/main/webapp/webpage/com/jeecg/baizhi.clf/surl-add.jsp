<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
 <head>
  <title>店铺地址</title>
  <t:base type="jquery,easyui,tools,DatePicker"></t:base>
  <script type="text/javascript">
  //编写自定义JS代码
  </script>
 </head>
 <body>
  <t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="surlController.do?doAdd" >
					<input id="id" name="id" type="hidden" value="${surlPage.id }"/>
		<table style="width: 600px;" cellpadding="0" cellspacing="1" class="formtable">
				<tr>
					<td align="right">
						<label class="Validform_label">
							店铺地址:
						</label>
					</td>
					<td class="value">
					     	 <input id="url" name="url" type="text" style="width: 150px" class="inputxt"  datatype="*"  ignore="checked" />
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">店铺地址</label>
						</td>
				</tr>
				<tr>
					<td align="right">
						<label class="Validform_label">
							店铺状态:
						</label>
					</td>
					<td class="value">
							<select id="status" name="status" >
								<!-- <option value="未激活">未激活</option>
								<option value="激活">激活</option> -->
							</select>
							<%-- <t:dictSelect field="status" type="list"  datatype="*"  typeGroupCode=""  defaultVal="${surlPage.status}" hasLabel="false"  title="店铺状态" >
								<option value="未激活">未激活</option>
								<option value="激活">激活</option>
							</t:dictSelect>    --%>  
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">店铺状态</label>
						</td>
				</tr>
				<tr>
					<td align="right">
						<label class="Validform_label">
							店长外键:
						</label>
					</td>
					<td class="value">
							  <t:dictSelect field="adminId" type="list"  datatype="*"  dictTable="t_s_base_user" dictField="id" dictText="username"  defaultVal="${surlPage.adminId}" hasLabel="false"  title="店长外键" ></t:dictSelect>     
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">店长外键</label>
						</td>
				</tr>
				<tr>
					<td align="right">
						<label class="Validform_label">
							中文店名:
						</label>
					</td>
					<td class="value">
					     	 <input id="name1" name="name1" type="text" style="width: 150px" class="inputxt"  datatype="*"  ignore="checked" />
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">中文店名</label>
						</td>
				</tr>
				<tr>
					<td align="right">
						<label class="Validform_label">
							德文店名:
						</label>
					</td>
					<td class="value">
					     	 <input id="name2" name="name2" type="text" style="width: 150px" class="inputxt"  datatype="*"  ignore="checked" />
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">德文店名</label>
						</td>
				</tr>
				<tr>
					<td align="right">
						<label class="Validform_label">
							最低包邮价格:
						</label>
					</td>
					<td class="value">
					     	 <input id="minPrice" name="minPrice" type="text" style="width: 150px" class="inputxt"  datatype="/^(-?\d+)(\.\d+)?$/"  ignore="checked" />
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">最低包邮价格</label>
						</td>
				</tr>
				
				
			</table>
		</t:formvalid>
 </body>
  <script src = "webpage/com/jeecg/baizhi.clf/surl.js"></script>		
