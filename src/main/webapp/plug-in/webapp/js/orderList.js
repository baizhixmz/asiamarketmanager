$(function(){
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
	var username = getCookie("JSESSIONID");
	// document.cookie="JSESSIONID="+username;

	if(true) {
			$.ajax({
				url: 'sorderController.do?webapplist',
				type: 'POST',
				dataType: 'JSON',
				success:function(data){
					console.log(data);
					if(data!=""){
						$.each(JSON.parse(data),function(index,ele){
							var totalNum = 0;
									var orderListheaderStr = `<div class="orderDetail">
											<div class="orderListHeader">
									        	<div class="orderNumber" >订单编号:${ele.sorderEntity.orderNum}</div>
									        	<div class="orderStatus">订单状态：<span style="color:#d8505c ">${ele.sorderEntity.orderStatus}</span></div>
									        </div>
										</div>`;
								$("#cart-shop").append(orderListheaderStr);
								var goodsInfo = JSON.parse(data)[index].cartCarVO;

								$.each(goodsInfo,function(GoodsIndex,GoodsEle){
									totalNum+=GoodsEle.count;
									// console.log(GoodsEle);
									var orderListContentrStr = `<div class="item"><div class="cart-shop-content">
											            <div class="cart-shop-content-right">
											                <a href="#" class="product-img">
											                    <img src="http://lu-food.com/net_shop_manager/${GoodsEle.sproductEntity.imgsrc}" alt=""/>
											                </a>
											                <div class="product-info">
											                    <a href="#" class="info-txt"></a>
											                    <div class="option">
											                        <div class="pull-left">
											                    		<p class="price">商品单价：€ <b>${GoodsEle.sproductEntity.price}</b></p>
											                            <span class="num">购买数量：<b>${GoodsEle.count}</b></span>
											                        </div>
											                    </div>
											                </div>
											            </div>
											        </div>
										        </div>`;
									$(".orderListHeader").last().after(orderListContentrStr);
								});

								var orderListFooterStr = `<div class="orderListFooter">
												        	<div>共<span class="totalNum">${totalNum}</span>件商品 合计： <span class="totalPrice" style="color:#d8505c">€ ${ele.sorderEntity.orderSalary}</span></div>
												        </div>`;

					        	$(".item .cart-shop-content").last().after(orderListFooterStr);

						})
					}
					else{
						$("#cart-shop").empty().html("您的订单为空");
					}
				}
			})
		}else {
			window.location.href="../webApp-shop/login.jsp";
		}
})