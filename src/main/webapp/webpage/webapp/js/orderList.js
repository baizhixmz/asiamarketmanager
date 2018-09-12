$(function(){
			$.ajax({
				url: getHostName()+'/sorderController.do?getAdminOrder',
				type: 'POST',
				dataType: 'JSON',
				success:function(data){
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
											                    <img src="http://mainriversoft.com/asiamarketmanager/${GoodsEle.sproductEntity.imgsrc}" alt=""/>
											                </a>
											                <div class="product-info">
											                    <a href="#" class="info-txt">${GoodsEle.sproductEntity.name}</a>
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
								var r;
								$.ajax({
												url: getHostName()+'/order/findOrderType',
												type: 'POST',
												dataType: 'JSON',
												async: false,
												data:{orderNum:ele.sorderEntity.orderNum},
												success:function(result){
													r = JSON.parse(result).qtime;
												}
											});
								
								var type = "";
								
								if(r == null){
									type = "邮寄";
								}else{
									type = "上门取货";
								}
								
								var orderListFooterStr = `<div class="orderListFooter">
															<div>配送方式：${type}</div>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
})