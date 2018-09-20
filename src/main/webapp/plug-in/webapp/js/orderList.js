$(function(){
			$.ajax({
				url: 'sorderController.do?getAdminOrders',
				type: 'POST',
				dataType: 'JSON',
				success:function(data){
					if(data!=""){
						$.each(data,function(index,ele){
							var totalNum = 0;
									var orderListheaderStr = `<div class="orderDetail">
											<div class="orderListHeader">
									        	<div class="orderNumber" >订单编号:${ele.orderNum}</div>
									        	<div class="orderStatus">订单状态：<span style="color:#d8505c ">${ele.orderStatus}</span></div>
									        </div>
										</div>`;
								$("#cart-shop").append(orderListheaderStr);
								
								var goodsInfo;
								
								$.ajax({
									url: 'sorderController.do?getOrderItems',
									type: 'POST',
									dataType: 'JSON',
									data:{orderNum:ele.orderNum},
									async: false,
									success:function(data){
										
										goodsInfo = data;
									}
								
								});
								
								var orderType;
								
								$.ajax({
									url: 'sorderTypeController.do?getOrderType',
									type: 'POST',
									dataType: 'JSON',
									data:{orderNum:ele.orderNum},
									async: false,
									success:function(data){
										
										orderType = data;
									}
								
								});
								

								$.each(goodsInfo,function(GoodsIndex,GoodsEle){
									totalNum+=GoodsEle.count;
									// console.log(GoodsEle);
									var orderListContentrStr = `<div class="item"><div class="cart-shop-content">
											            <div class="cart-shop-content-right">
											                <a href="#" class="product-img">
											                    <img src="${GoodsEle.imgsrc}" alt=""/>
											                </a>
											                <div class="product-info">
											                <a href="#" class="info-txt">${GoodsEle.name}</a>
											                    <div class="option">
											                        <div class="pull-left">
											                    		<p class="price">商品单价：€ <b>${GoodsEle.price}</b></p>
											                            <span>购买数量：<b>${GoodsEle.count}</b></span>
											                        </div>
											                    </div>
											                </div>
											            </div>
											        </div>
										        </div>`;
									$(".orderListHeader").last().after(orderListContentrStr);
								});
								
								var orderListFooterStr = `<div style="height:53px;">
												        	<div style="margin:5px;">
												        		收/取件人：<span class="totalNum">${orderType.name}</span>
												        		联系方式：<a href="tel:${orderType.phone}" style="color:#668BB0;">${orderType.phone}</a>
												        	</div>
												        	<div align="center" style="margin:5px;">
												        		<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="cancelOrder(this);">取消订单</a></button>
												        		<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="changeStatus(this);">确认订单</a></button>
												        	</div>
												        </div>`;

					        	$(".item .cart-shop-content").last().after(orderListFooterStr);

						})
					}
					else{
						$("#cart-shop").empty().html("您的订单为空");
					}
				}
			})
		
})

function changeStatus(obj){
	
	var thisObj = $(obj);
	
    var orderId = thisObj.attr("id");
	$.ajax({
		url: 'sorderController.do?updateOrder',
		type: 'POST',
		dataType: 'JSON',
		data:{id:orderId},
		async: false,
		success:function(data){
			
			location.reload();   
		}
	});
	
	
}
function cancelOrder(obj){
	
	
	var setTitle = '';
	var setContents = '';
	var setButton = '';
	
		
	setTitle = '提示';
	setContents = '您确定要取消该订单吗？';
	setButton = '["取消","确定"]';
	$(obj).openWindow(setTitle,setContents,setButton);
	
	var thisObj = $(obj);
	
	var orderId = thisObj.attr("id");
	
	$('.confirm-button').on('click',function(){
		$.ajax({
			url: 'sorderController.do?cancelOrderById',
			type: 'POST',
			dataType: 'JSON',
			data:{id:orderId},
			async: false,
			success:function(data){
				
				location.reload();   
			}
		});
	});
	
	
	
	
	
}

