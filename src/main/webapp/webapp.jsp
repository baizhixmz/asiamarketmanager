<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.jeecgframework.web.system.pojo.base.TSUser" %>
<%@include file="/context/mytags.jsp"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="format-detection" content="telephone=yes"/>
		<meta name="viewport"
			content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<title>订单页面</title>
		<link href="plug-in-ui/hplus/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
		<link rel="stylesheet" href="plug-in/themes/fineui/common/css/sccl.css">
		<link rel="stylesheet" type="text/css" href="plug-in/themes/fineui/common/skin/qingxin/skin.css" id="layout-skin"/>
		<link rel="stylesheet" href="plug-in/themes/fineui/common/iconfont/iconfont.css">
		<link rel="stylesheet" href="plug-in/themes/fineui/smart-menu/smartMenu.css">
		<link rel="stylesheet" href="plug-in/webapp/css/reset.css">
		<link rel="stylesheet" href="plug-in/webapp/css/iconfont.css">
		<link rel="stylesheet" href="plug-in/webapp/css/header.css">
		<link rel="stylesheet" href="plug-in/webapp/css/cate.css">
		<link rel="stylesheet" href="plug-in/audio/hint.css">
		<link rel="stylesheet" href="plug-in/webapp/css/orderList.css">
		<link rel="stylesheet" href="plug-in/webapp/js/layui/css/layui.css">
		<link rel="stylesheet" href="plug-in/jQueryYdtc/css/global.css">
		<script type="text/javascript" src="plug-in/themes/fineui/common/lib/jquery-1.9.0.min.js"></script>
		<script src="plug-in/webapp/js/lib/zepto.min.js"></script>
		<script src="plug-in/webapp/js/orderList.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/smart-menu/jquery-smartMenu.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/common/js/sccl.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/common/js/sccl-util.js"></script>
		<script src="plug-in/jquery-plugs/storage/jquery.storageapi.min.js"></script>
		<script src="plug-in/jQueryYdtc/js/windowOpen.js"></script>
		
		<style>
			.addOne {
				display: inline-block;
				width: 20px;
				height: 20px;
				background-color: #e8401f;
				line-height: 20px;
				text-align: center;
				border-radius: 10px;
				color: #fff;
				font-weight: bold;
			}
			
			.minusOne {
				width: 20px;
				height: 20px;
				border-radius: 10px;
				color: #e8401f;
				font-weight: bold;
				line-height: 19px;
				text-align: center;
				border: 1px solid #e8401f;
			}
			
			#language {
				font-size: 14px;
				background: #f7f7f7;
				border: 1px solid #dcdcdc;
				padding: 8px 12px 8px 12px;
				margin: 0 6px;
				border-radius: 5px;
				color: #8d8d8d;
				cursor: pointer;
				background-repeat: no-repeat;
			}
			
			.pad_right {
				padding-right: 2em;
			}
			
			#scroll_div {
				height: 26px;
				overflow-y: hidden;
				white-space: nowrap;
				width: 270px;
			}
			
			#scroll_begin,#scroll_end {
				width: 270px;
				display: inline;
			}
		</style>
		
	</head>
	<body>
		<!-- 头部 -->
		<header>
			<div class="left">
				<span id="name1"></span><br/>
				<span id="name2"></span>
			</div>
			<div class="title">店铺订单</div>
			
			
			<script type="text/javascript"> 
				
				$(function(){
					var user = '${sessionScope.LOCAL_CLINET_USER}';
					console.log(user == "");
					if(user == "" ){
						
						var username = getCookie("ADMINUSERNAME");
						console.log(username);
						var password = getCookie("ADMINPASSWORD");
						console.log(password)
						
						if(username != null && password !=null){
							$.ajax({
								 type: "POST",
					             url: "loginController.do?cookieLogin",
					             data: {username:username,password:password},
					             dataType: "json",
					             success: function(data){
					            	 
					            	 console.log(data);
					            	 
					            	 if(data == "success"){
					            		 
					            		 window.location.reload();
					            	 }
					            	 else
					            		window.location.href = "loginController.do?login";
					             }
							});
						}
					}else{
						setInterval(showNum,1000);
						$.ajax({
				             type: "POST",
				             url: "surlController.do?findById",
				             data: {adminId:'${sessionScope.LOCAL_CLINET_USER.id}'},
				             dataType: "json",
				             success: function(data){
				             	$("#name1").html(data.name1);
				             	$("#name2").html(data.name2);
				             }
				         });
					}	
				});
				
				function showNum(){
					 $.ajax({
			             type: "POST",
			             url: "sproductController.do?getCount",
			             data: {id:'${sessionScope.LOCAL_CLINET_USER.id}'},
			             dataType: "json",
			             success: function(data){
			             	
			             	if(data > $("#view").text()){
			             		playSound();
			             		document.getElementById("view").innerHTML=data;
			             	}else{
			             		document.getElementById("view").innerHTML=data;			             		
			             	}
			             	
			             }
			         });
				}
				
				
				function playSound(){
					
				
					
					var audio = new Audio("plug-in/audio/Order_Hint.mp3");
					audio.play();
					
				     
				}
				
				function getOrder(url){
					$("#ow").attr("src",url);
				}
				
				//通过name获取cookie
				function getCookie(Name) {
					var search = Name + "="//查询检索的值
					var returnvalue = "";//返回值
					if (document.cookie.length > 0) {
						sd = document.cookie.indexOf(search);
						if (sd!= -1) {
							sd += search.length;
							end = document.cookie.indexOf(";", sd);
							if (end == -1)
								end = document.cookie.length;
					        //unescape() 函数可对通过 escape() 编码的字符串进行解码。
							returnvalue = unescape(document.cookie.substring(sd, end))
						}
					} 
					return returnvalue;
				}
				
			</script>
			
			<div class="right" style="margin-right: 30px;">
				<li class="dropdown hidden-xs">
				    <i class="fa fa-bell" style="color:#EE6B6B;"></i> 待办(<span id="view">0</span>)&nbsp;
				    <!-- <a href="#" style="color:#EE6B6B;font-size: 10px;">注销</a> -->
				</li> 
			</div>
			
		</header>	
		
		<div id="cart-shop" class="cart-shop">
		
    	</div>
		
	</body>
</html>