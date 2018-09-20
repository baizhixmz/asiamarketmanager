<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="org.jeecgframework.core.util.SysThemesUtil,org.jeecgframework.core.enums.SysThemesEnum"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<%
    String lang = org.jeecgframework.core.util.BrowserUtils.getBrowserLanguage(request);
    String langurl = "plug-in/mutiLang/" + lang +".js";
    SysThemesEnum sysTheme = SysThemesUtil.getSysTheme(request);
    String lhgdialogTheme = SysThemesUtil.getLhgdialogTheme(sysTheme);
%>

<html>
<head>
	<title>Shop-Manager</title>
    <link rel="shortcut icon" href="resources/fc/images/icon/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/plug-in/teemlink/css/login.css" 	type="text/css" />
    <script src=<%=langurl%> type="text/javascript"></script>
    <script type="text/javascript" src="plug-in/jQueryYdtc/js/jquery-2.2.1.min.js"></script>
	<script type="text/javascript">
	
		$(function(){
			
			var f = IsPC();
			if(f){
				console.log("isPC:"+f)
				var user = '${sessionScope.LOCAL_CLINET_USER}';
				console.log(user == "");
				if(user == "" ){
					var username = $.cookie("ADMINUSERNAME");
					var password = $.cookie("ADMINPASSWORD");
					
					if(username != null && password !=null){
						$.ajax({
							 type: "POST",
				             url: "loginController.do?cookieLogin",
				             data: {username:username,password:password},
				             dataType: "json",
				             success: function(data){
				            	 
				            	 if(data == "success"){
				            		 window.location.reload();
				            	 }
				             }
						});
					}
				}
			}
			
			
			
		})
		
		function IsPC() {
			var flag = true;
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				//跳转移动端页面
				flag = true;
			} else {
				//跳转pc端页面
				flag = false;
			}
			return flag;
		}
			
	
	</script>    
</head>
<body >

<form action="loginController.do?login" check="loginController.do?checkuser" method="post">
<div align="center" class="container loginBg">
	<div class="language">
    	<span>Language：</span>
        <t:dictSelect id="langCode" field="langCode" typeGroupCode="lang" hasLabel="false" defaultVal="zh-cn"></t:dictSelect>
    </div>


    <div class="login">
    	<ul class="titleName">
        	<li class="english">Shop|Manager</li>
            <li class="chinese">管理系统</li>
        </ul>
        <ul class="loginInfo">
            <li>
	            <span>用户名：</span>
	            <input type="text"  class="userName"  name="userName" id="userName"/>
            </li>
            <li>
            	<span>密 &nbsp;码：</span>
            	<input type="password" name="password" class="password"  name="password"  id="password"/>
            </li>
			<li>
            	<span>验证码：</span>

                <div style="width:50px;float:left">
                    <input  name="randCode"  style="width: 90px;height: 26px;" type="text" id="randCode" title="" value="" nullmsg="" />

                </div>
                <div style="float: right; height: 26px;">
                    <img id="randCodeImage" src="randCodeImage"  />
                </div>
            </li>
           	
			<li >
                <div id="alertMessage"></div>
                <div id="successLogin"></div>
			</li>
			
            <li class="keepInfo"><input type="checkbox" id="on_off"  name="remember" value="yes"/>记住用户名</li>
            <li class="tipsArea"><div id="tipsArea">&nbsp;</div></li>           
            <li class="btnOk"><input type="button"  id="but_login" value="<t:mutiLang langKey="common.login"/>" class="loginBtn loginBg"  /></li>
        </ul>
    </div>

    <div class="copyright ">
    	<span>&copy; MainRiverSoft 版权所有 <span class="tip"><a href="#" title=SHOP-MANAGER>MainRiverSoft</a> (推荐使用IE8+,谷歌浏览器) </span></span>
    </div>       
</div>
</form>



<!-- Link JScript-->
<script type="text/javascript" src="plug-in/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="plug-in/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="plug-in/login/js/jquery-jrumble.js"></script>
<script type="text/javascript" src="plug-in/login/js/jquery.tipsy.js"></script>
<script type="text/javascript" src="plug-in/login/js/iphone.check.js"></script>
<script type="text/javascript" src="plug-in/login/js/login.js"></script>
<script type="text/javascript">


</script>
<!--    <script type="text/javascript" src="plug-in/lhgDialog/lhgdialog.min.js"></script> -->
<%=lhgdialogTheme %>

</body>
</html>

