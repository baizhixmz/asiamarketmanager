<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'MyJsp1.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="https://cdn-hangzhou.goeasy.io/goeasy.js"></script>
	<script type="text/javascript">
		var goEasy = new GoEasy({
			appkey: "BC-57c75abca21540b89bf00e84e5d7c7f6"
		});
		//GoEasy-OTP可以对appkey进行有效保护，详情请参考​ ​7.GoEasy-OTP
		goEasy.subscribe({
			channel: "new_order",
			onMessage: function (message) {
				alert("Channel:" + message.channel + " content:" + message.content);
			}
		});
	</script>

  </head>

  <body>
    This is my JSP page. <br>
  </body>
</html>
