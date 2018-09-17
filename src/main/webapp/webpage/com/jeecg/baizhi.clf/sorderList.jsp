 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/context/mytags.jsp" %>
<%@ page import="java.sql.*" %>
<%@page import="org.jeecgframework.web.system.pojo.base.TSUser" %>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
    <div region="center" style="padding:0px;border:0px">
        <t:datagrid name="sorderList" fitColumns="false" title="订单表" actionUrl="sorderController.do?datagrid" idField="id" queryMode="group" fit="true">
            <t:dgCol title="编号" field="id" hidden="true"></t:dgCol>
            <t:dgCol title="编号" field="userId" hidden="true"></t:dgCol>
            <t:dgCol title="编号" field="adminId" hidden="true"></t:dgCol>
            <t:dgCol title="订单编号/Bestellnummer" field="orderNum" width="180" query="true"></t:dgCol>
            <t:dgCol title="订单状态/Bestellstatus" field="orderStatus" width="140"></t:dgCol>
            <t:dgCol title="创建日期/Erstellungsdatum"  field="time" formatter="yyyy-MM-dd" query="true" queryMode="group" editor="datebox" width="180"></t:dgCol>
            <t:dgCol title="订单总价/Gesamtbestellpreis" field="orderSalary" width="180"></t:dgCol>
            <t:dgCol title="收(取)件人/Empfänger" field="userMsg" width="140"></t:dgCol>
            <t:dgCol title="联系电话/Kontaktnummer" field="phone" width="160"></t:dgCol>
            <t:dgCol title="收货地址/Empfangsadresse" field="orderAddress" width="180"></t:dgCol>
            <t:dgCol title="取货时间/Abholzeit" field="qTime" width="140"></t:dgCol>
            <t:dgCol title="操作/Bedienung" field="opt" width="280"></t:dgCol>
            <t:dgDelOpt title="删除/Löschen" url="sorderController.do?del&id={id}" urlclass="ace_button" urlfont="fa-trash-o"/>
            <t:dgFunOpt title="更改状态" funname="changeStatus" urlclass="ace_button"  urlfont="fa-check"></t:dgFunOpt>
            <t:dgFunOpt title="取消订单" funname="changeStatus1" urlclass="ace_button"  urlfont="fa-check"></t:dgFunOpt>
            <t:dgToolBar title="查看订单详情" icon="icon-search" url="sorderController.do?openOrderItem"
                         funname="openOrderItem" width="700" height="400"></t:dgToolBar>
            <t:dgToolBar title="导出订单详情" icon="icon-putout" funname="ExportXls" operationCode="exportXls"></t:dgToolBar>
            <t:dgToolBar title="导出采购信息" icon="icon-putout" funname="ExportXls2"></t:dgToolBar>
        </t:datagrid>
    </div>
</div>
<% TSUser u = (TSUser) session.getAttribute("LOCAL_CLINET_USER"); System.out.println(u.getUserName()+";id="+u.getId()+";"+u.getCurrentDepart().getId());%> 
<script src = "webpage/com/jeecg/baizhi.clf/sorder.js"></script>
<script>

    function changeStatus(data,data2,data3,data4) {
        var row = $('#sorderList').datagrid('getSelected');
        if(row == null) {
            alert("请先选中行！");
            return ;
        }

        if(row.orderStatus == "已取消"){
        	alert("订单已取消！");
        }else{
        	
	        $.ajax({
	            url:"${pageContext.request.contextPath}/sorderController.do?changeStatus",
	            data:row,
	            success:function(){
	                $("#sorderList").datagrid("reload");
	            }
	        });
        
        }

        
    }
    
    function changeStatus1(data,data2,data3,data4) {
        var row = $('#sorderList').datagrid('getSelected');
        if(row == null) {
            alert("请先选中行！");
            return ;
        }
        
        if(row.orderStatus == "已处理"){
        	alert("订单已处理，无法取消！");
        }else{
        	$.ajax({
                url:"${pageContext.request.contextPath}/sorderController.do?changeStatus1",
                data:row,
                success:function(){
                    $("#sorderList").datagrid("reload");
            	}
        	})
        }

        /* $.ajax({
            url:"${pageContext.request.contextPath}/sorderController.do?changeStatus1",
            data:row,
            success:function(){
                $("#sorderList").datagrid("reload");
            }
        }); */
        
    }
    
    
</script>
<script type="text/javascript">
    var iframe = "";
    function openOrderItem(title, addurl, thisPage, width, height) {
        var id = $('#sorderList').datagrid('getSelected').orderNum;
        addurl = addurl+"&id="+id;
        createwindow2(title, addurl, width, height);
    }


    function createwindow2(title, addurl, width, height) {
        width = width ? width : 700;
        height = height ? height : 400;
        if (width == "100%" || height == "100%") {
            width = window.top.document.body.offsetWidth;
            height = window.top.document.body.offsetHeight - 100;
        }
        //--author：JueYue---------date：20140427---------for：弹出bug修改,设置了zindex()函数
        if (typeof(windowapi) == 'undefined') {
            $.dialog({
                content: 'url:' + addurl,
                lock: true,
                zIndex: getzIndex(),
                width: width,
                height: height,
                title: title,
                opacity: 0.3,
                cache: false,
                ok: function () {
                    iframe = this.iframe.contentWindow;
                    closeOrderItem();
                    return false;
                },
                cancelVal: '关闭',
                cancel: true /*为true等价于function(){}*/
            });
        } else {

            /*W.*/
            $.dialog({//使用W，即为使用顶级页面作为openner，造成打开的次级窗口获取不到关联的主窗口
                content: 'url:' + addurl,
                lock: true,
                width: width,
                zIndex: getzIndex(),
                height: height,
                parent: windowapi,
                title: title,
                opacity: 0.3,
                cache: false,
                ok: function () {
                    iframe = this.iframe.contentWindow;
                    console.info("iframe:" + iframe);
                    addProduct();
                    return false;
                },
                cancelVal: '关闭',
                cancel: true /*为true等价于function(){}*/
            });

        }
        //--author：JueYue---------date：20140427---------for：弹出bug修改,设置了zindex()函数

    }
    function closeOrderItem() {

        //关闭dialog窗口
        iframe.document.$lutn.close();

    }
    //导出
    function ExportXls() {
        JeecgExcelExport("sorderController.do?exportXls","sorderList");
    }
    //导出
    function ExportXls2() {
        JeecgExcelExport("sorderController.do?exportXls2","sorderList");
    }
    
</script>