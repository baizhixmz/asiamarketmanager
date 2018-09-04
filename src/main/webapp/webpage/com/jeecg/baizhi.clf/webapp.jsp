<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<script src="${pageContext.request.contextPath}/webApp-shop/js/ContextPath.js"></script>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
			content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<title>亚超</title>
		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" href="css/iconfont.css">
		<link rel="stylesheet" href="css/header.css">
		<link rel="stylesheet" href="css/footer.css">
		<link rel="stylesheet" href="css/cate.css">
		<script src="js/lib/zepto.min.js"></script>
		<script src="js/cate.js"></script>
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
		<script>
			function ScrollImgLeft(){ 
				var speed=50;
				var MyMar = null;
				var scroll_begin = document.getElementById("scroll_begin"); 
				var scroll_end = document.getElementById("scroll_end"); 
				var scroll_div = document.getElementById("scroll_div"); 
				scroll_end.innerHTML=scroll_begin.innerHTML; 
				function Marquee(){ 
					if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0) 
						scroll_div.scrollLeft-=scroll_begin.offsetWidth; 
					else
						scroll_div.scrollLeft++; 
				} 
				MyMar=setInterval(Marquee,speed); 
				scroll_div.onmouseover = function(){
					clearInterval(MyMar);
				}
				scroll_div.onmouseout = function(){
					MyMar = setInterval(Marquee,speed); 　　　　
				}  
			}
					
			$(function(){		 
				ScrollImgLeft();
			})
		</script>
	</head>
	<body>
		<!-- 头部 -->
		<header>
			<div class="left">
				<img src="images/sp3_3.png" alt="">
			</div>
			<div class="title">${sessionScope.shopMsg.name1}</div>
			<div class="right" style="margin-right: 30px;">
				<input id="language" type="button" value="German"
					onclick="toItalyPage();">
			</div>
			<script>
				// 去德文界面
				function toItalyPage(){
					location.href = getHostName()+"/webApp-shop2/home.jsp";
				}
			</script>
			<!-- <div id="scroll_div" class="fl">
				<div id="scroll_begin" >
					<font size="2" color="red">
						这个网站为了更好的为你服务使用了cookie，您可以把它关闭，但是网站的功能会受到影响 <span class="pad_right"> </span> "This website uses cookies to ensure you get the best experience on our website，you can disable it but the website will not function properly"
					</font>
				</div>
				<div id="scroll_end"></div>
			</div> -->
		</header>
		<!-- <div style="float: left">--------------------</div> -->
		<div class="categary">
			<div class="searchTop">
				<div class="iptSearch">
					<input id="iptGoodsName" type="text" placeholder="请输入商品名称">
					<div id="btnSearch" class="btn btnSure m0">搜索</div>
				</div>
			</div>
			<div id="categary-left" class="categary-left">
				<ul>
					<!--
					<li class=""><a href="javascript:;">热门推荐</a></li>
	                <li class="active"><a href="javascript:;">潮流女装</a></li>
	                <li class=""><a href="javascript:;">品牌男装</a></li>
	                <li class=""><a href="javascript:;">内衣配饰</a></li>
	                <li class=""><a href="javascript:;">家用电器</a></li>
	                <li class=""><a href="javascript:;">电脑办公</a></li>
	            -->
				</ul>
			</div>
			<div class="categary-right">
				<div id="scroll_div" class="fl">
					<div id="scroll_begin" >
						<font size="2" color="red">
							这个网站为了更好的为你服务使用了cookie，您可以把它关闭，但是网站的功能会受到影响 <span
							class="pad_right"> </span> "This website uses cookies to ensure
							you get the best experience on our website，you can disable it but
							the website will not function properly"
						</font>
	
					</div>
					<div id="scroll_end"></div>
				</div>
				<div class="right-in">
					<ul id="product-info" class="product-info">
						<!-- <li>
							<div class="left-img">
								<a href="#">
									<img src="images/01.jpg" alt="">
								</a>
							</div>
							<div class="middle-info">
								<div class="product-name">菲律宾帝皇蕉菲律宾帝皇蕉菲律
								</div>
								<div class="product-price">
									€2.50/kg
								</div>
							</div>
							<div class="right-num">
								<span id="minusOne" class="iconfont  icon-jian minusOne"></span>
								<span id="num" class="num"> 0 </span>
								<span id="addOne" class="iconfont  icon-jia addOne"></span>
							</div>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
	
		<!-- 商品列表Max -->
		<div id="maxGoodsList" class="maxGoodsList">
			<div id="maxIn" class="maxIn">
				<div class="head">
					<span class="iconfont icon-cart"></span>
				</div>
				<ul id="maxShoppingList">
					<!-- 	    		<li>
		    			<div class="shopInfo">
			    			<div class="shopName">2153中国芹菜 China Celery</div>
			    			<div class="shopPrice">€3</div>
			    			<div class="shopNum">4kg</div>
		    			</div>
		    			<div class="btnDel">
		    				<span class="btnClear iconfont icon-cart"></span>
		    				<span class="btnAdd iconfont icon-cart"></span>
		    				<span class="btnMinus iconfont icon-cart"></span>
		    			</div>
		    		</li> -->
	
					<!-- 	    		<div id="btnClear" class="clear">
		    			<span class="iconfont icon-cart"></span>清空购物车
		    		</div> -->
				</ul>
			</div>
		</div>
	
		<!-- 商品列表Min -->
		<div id="minGoodsList" class="minGoodsList">
			<div class="sign">
				<div id="GoodsNum" class="GoodsNum">0</div>
				<span class="iconfont icon-cart"><span>
			</div>
			<div id="btnPrice" class="btnPrice">€ 0.00</div>
			<script>
				// 去结算
				function btnPay(user){
						location.href = getHostName()+"/webApp-shop/shoppingCar.jsp";
				}
			</script>
			<div id="btnPay" class="btnPay" onclick="btnPay()">去结算</div>
		</div>
		<!-- 模态框 -->
		<div id="mask" class="mask">
			<div class="close">
				<span id="close">X</span>
			</div>
			<p class="txt">确认要将此商品从购物车移除吗？</p>
			<div class="btn">
				<button id="btnSure" class="btnSure">确定</button>
				<button id="btnCancel" class="btnCancel">取消</button>
			</div>
		</div>
	
		<div id="maskBody" class="maskBody"></div>
		<!-- 底部 -->
		<footer>
			<ul>
				<a href="home.jsp">
					<li><i class="iconfont icon-category"></i> <span>选购</span></li>
				</a>
				<a href="shoppingCar.jsp">
					<li><i class="iconfont icon-cart"></i> <span>购物车</span></li>
				</a>
				<a href="orderList.jsp">
					<li><i class="iconfont icon-account"></i> <span>我的订单</span></li>
				</a>
			</ul>
		</footer>
	
		<script>
			$(function(){
				//alert();
				loadRemoteData("${sessionScope.adminMsg.id}","${sessionScope.adminMsg.username}");
			})
		</script>
	</body>
</html>