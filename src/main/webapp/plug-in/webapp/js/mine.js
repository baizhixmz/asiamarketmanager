$(function(){

	var username = getCookie("JSESSIONID");
		if(username != ""){
			$("#btnLogin").hide();
		}
		else {
			$("#btnLogin").show();
		}

	// 登录
	$("#btnLogin").on("touchend",function(){
		window.location.href = "../webApp-shop/login.jsp";
	})

	// 我的订单
	$("#myOrder").on("touchend",function(){
		window.location.href = "../orderList.jsp";
	})

	// 判断登录
	function getCookie(cookieName) {
	    var strCookie = document.cookie;
	    var arrCookie = strCookie.split("; ");
	    for(var i = 0; i < arrCookie.length; i++){
	        var arr = arrCookie[i].split("=");
	        if(cookieName == arr[0]){
	            return arr[1];
	        }
	    }
	    return "";
	}
})