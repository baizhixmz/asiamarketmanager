<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.jeecgframework.web.system.pojo.base.TSUser" %>
<%@include file="/context/mytags.jsp"%>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
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
		<script src="plug-in/webapp/js/lib/zepto.min.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/common/lib/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/smart-menu/jquery-smartMenu.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/common/js/sccl.js"></script>
		<script type="text/javascript" src="plug-in/themes/fineui/common/js/sccl-util.js"></script>
		<script src="plug-in/jquery-plugs/storage/jquery.storageapi.min.js"></script>
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
				
				/* margin-left: 10px; */
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
				<a href="javascript:window.location.reload();">
					<img src="plug-in/login/images/sp3_3.png" alt="">
				</a>
				
			</div>
			<div class="title">店铺订单</div>
			
			<% TSUser u = (TSUser) session.getAttribute("LOCAL_CLINET_USER"); System.out.println(u.getUserName()+";id="+u.getId()+";"+u.getCurrentDepart().getId());%> 
			
			<script type="text/javascript"> 
				
				$(function(){
					setInterval(showNum,1000);
				});
				
				function showNum(){
					 $.ajax({
			             type: "POST",
			             url: "sproductController.do?getCount",
			             data: {id:"<%=u.getId() %>"},
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
				     var borswer = window.navigator.userAgent.toLowerCase();
				     if ( borswer.indexOf( "ie" ) >= 0 ){
				       //IE内核浏览器
				       var strEmbed = '<embed name="embedPlay" src="http://www.gongqinglin.com/accessory/ding.wav" autostart="true" hidden="true" loop="false"></embed>';
				       if ( $( "body" ).find( "embed" ).length <= 0 )
				         $( "body" ).append( strEmbed );
				       var embed = document.embedPlay;

				       //浏览器不支持 audion，则使用 embed 播放
				       embed.volume = 100;
				     } else{
				       //非IE内核浏览器 
				       var strAudio = "<audio id='audioPlay' hidden='true'><source src='plug-in/audio/Order_Hint.mp3' type='audio/mpeg'></audio>";
				       if ( $( "body" ).find( "audio" ).length <= 0 )
				         $( "body" ).append( strAudio );
				       var audio = document.getElementById( "audioPlay" );

				       //浏览器支持 audion
				       audio.play();
				     }
				}
				
				function getOrder(url){
					$("#ow").attr("src",url);
					//document.getElementById('ow').contentWindow.location.reload(true);
				}
				
			</script>
			
			<div class="right" style="margin-right: 30px;">
				<li class="dropdown hidden-xs">
					<a href="javascript:getOrder('sorderController.do?webapplist')">                             	
				    	<i class="fa fa-bell" style="color:#EE6B6B"></i> 待办(<span id="view">0</span>)
					</a> 
				</li> 
			</div>
		</header>	
		 <iframe id="ow" src="sorderController.do?list" width="1200px" style="margin-top: 20px;"></iframe>
	</body>
</html>