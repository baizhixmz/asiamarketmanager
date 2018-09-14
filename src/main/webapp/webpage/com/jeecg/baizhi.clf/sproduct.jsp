<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>商品表</title>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>


</head>
<body>
	<t:formvalid formid="formobj" dialog="true" usePlugin="password"
		layout="table" action="sproductController.do?save"
		beforeSubmit="formatterImg">
		<input id="id" name="id" type="hidden" value="${sproductPage.id }">
		<table style="width:600px;" cellpadding="0" cellspacing="1"
			class="formtable">

			<tr>
				<td align="right">
					<label class="Validform_label">商品标题/Waren der tarifnrn: </label>
				</td>
				<td class="value"><input class="inputxt" type="hidden"
					id="name" name="name" value='${sproductPage.name}' /> <input
					class="inputxt" id="name_c" datatype="*2-50" '/>:中文&nbsp;&nbsp; <input
					class="inputxt" id="name_g" />:Deutsch <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">

						商品编号/Ware Nr: </label></td>
				<td class="value"><input class="inputxt" id="productNum"
					name="productNum" datatype="*2-10"
					value='${sproductPage.productNum}' /> <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						商品描述/Beschreibung der ware: </label></td>
				<td class="value"><input class="inputxt" type="hidden"
					id="description" name="description" required="required"
					value="${sproductPage.description}" /> <input class="inputxt"
					id="description_c" datatype="*2-50" />:中文&nbsp;&nbsp; <input
					class="inputxt" id="description_g" />:Deutsch <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						商品价格/Die rohstoffpreise: </label></td>
				<td class="value"><input class="inputxt" id="price"
					errormsg="请输入最多两位小数的价格!" name="price"
					datatype="/^\d+(?:\.\d{1,2})?$/" value="${sproductPage.price}" />
					<span class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						中文单位/Chinesische einheiten: </label></td>
				<td class="value"><input class="inputxt" id="chinaUnit"
					name="chinaUnit" datatype="*2-10" required="required"
					value="${sproductPage.chinaUnit}" /> <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						德文单位/Die Deutsche Einheit: </label></td>
				<td class="value"><input class="inputxt" id="italyUnit"
					name="italyUnit" datatype="*2-10" required="required"
					value="${sproductPage.italyUnit}" /> <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						商品主图/Die im Bild: </label></td>
				<td class="value"><t:webUploader type="image" dataType="*"
						displayTxt="false" bizType="photosucai" name="imgsrc" auto="true"
						fileNumLimit="1" pathValues="${sproductPage.imgsrc}"></t:webUploader>
					<span class="Validform_checktip Validform_right"
					style="display: none;">图片已上传</span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						类别/Kategorie: </label></td>
				<td class="value"><t:dictSelect field="categoryId" datatype="*"
						type="select" typeGroupCode="sex" hasLabel="false"
						dictTable="s_category" dictField="s.id" title="店长"
						dictText="s.name"
						dictCondition="s inner join s_admin_category sa on s.id = sa.category_id where admin_id='${sessionScope.LOCAL_CLINET_USER.id}'"
						defaultVal="${sproductPage.categoryId}"></t:dictSelect> <span
					class="Validform_checktip"></span></td>
			</tr>
			<tr>
				<td align="right"><label class="Validform_label">
						商品内容/Produkt Inhalt: </label></td>
				<td class="value"><script type="text/javascript"
						charset="utf-8" src="plug-in/ueditor/ueditor.config.js"></script>
					<script type="text/javascript" charset="utf-8"
						src="plug-in/ueditor/ueditor.all.min.js"></script> <textarea
						name="content" datatype="*" id="content"
						style="width: 450px;height:300px">${sproductPage.content}</textarea>
					<script type="text/javascript">
                            var editor = UE.getEditor('content');
                        </script> <span class="Validform_checktip"></span> <label
					class="Validform_label" style="display: none;">商品内容</label>
			</tr>
		</table>
	</t:formvalid>
	<script type="text/javascript">
	
	$(function(){
		
		var name = "${sproductPage.name}";
		var desc = "${sproductPage.description}";
		var arr1 = name.split("/");
		var arr2 = desc.split("/");
		
		$("#name_c").attr("value",arr1[0]);
        $("#name_g").attr("value",arr1[1]);
        $("#description_c").attr("value",arr2[0]);
        $("#description_g").attr("value",arr2[1]);
		
	})
	

    function formatterImg() {
        var imgsrc = $("input[name='imgsrc']").val();
        var imgsrc2 = imgsrc.split(",")[0];
        if ($("input[name='imgsrc']")[1]){
            $("input[name='imgsrc']").val(imgsrc2);
            $("input[name='imgsrc']")[1].remove();
        }
       
        var name_c = $("#name_c").val();
        var name_g = $("#name_g").val();
        var desc_c = $("#description_c").val();
        var desc_g = $("#description_g").val();
        
        if(name_g != ''){
        	
	        $("#name").attr("value",name_c+"/"+name_g);
        }else{
	        $("#name").attr("value",name_c);
        	
        }
        
        if(desc_g != ''){
        	
	        $("#description").attr("value",desc_c+"/"+desc_g);
        }else{
        	
	        $("#description").attr("value",desc_c);
        }
    }
</script>
</body>