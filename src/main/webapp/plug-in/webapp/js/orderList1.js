$(function(){
	var searchTool = `Bestellzeit：
					<div class="iDate date">
						<input id="date" type="text">
						<button type="button" class="addOn"></button>
					</div>
					<input id="language" type="button" value="search" onclick="search();"/>
					<hr/>`
	$("#cart-shop").append(searchTool);
			$.ajax({
				url: 'sorderController.do?getAdminOrders',
				type: 'POST',
				dataType: 'JSON',
				success:function(data){
					if(data!=""){
						$.each(data,function(index,ele){
							var status = ele.orderStatus;
							if(status == "待处理"){
								status = "Ausstehend";
							}else if(status == "已处理"){
								status = "Verarbeitet";
							}else{
								status = "Storniert";
							}

							var totalNum = 0;
									var orderListheaderStr = `<div class="orderDetail">
											<div class="orderListHeader">
									        	<div class="orderNumber" >Nummer:${ele.orderNum}</div>
									        	<div class="orderStatus">Staat：<span style="color:#d8505c ">${status}</span></div>
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
								var type;
								if(orderType.address == null){
									type = "Abholung";
								}else{
									type = "Mailing";
								}
								
								

								$.each(goodsInfo,function(GoodsIndex,GoodsEle){
									
									var name = GoodsEle.name;
				                	
				                	var nameArr = name.split("/");
				                	
				                	var pname;
				                	
				                	if(nameArr.length == 1){
				                		pname = nameArr[0];
				                	}else{
				                		pname = nameArr[1];
				                	}
									
									totalNum+=GoodsEle.count;
									// console.log(GoodsEle);
									var orderListContentrStr = `<div class="item"><div class="cart-shop-content">
											            <div class="cart-shop-content-right">
											                <a href="#" class="product-img">
											                    <img src="${GoodsEle.imgsrc}" alt=""/>
											                </a>
											                <div class="product-info">
											                <a href="#" class="info-txt">${pname}</a>
											                    <div class="option">
											                        <div class="pull-left">
											                    		<p class="price">Produkt Stückpreis：€ <b>${GoodsEle.price}</b></p>
											                            <span>Einkaufsmenge：<b>${GoodsEle.count}</b></span>
											                        </div>
											                    </div>
											                </div>
											            </div>
											        </div>
										        </div>`;
									$(".orderListHeader").last().after(orderListContentrStr);
								});
								
								var orderListFooterStr = `<div style="height:55px;">
												        	<div style="margin:5px;">
												        		Kontakt：<span class="totalNum">${orderType.name}</span>
												        		Handynummer：<a href="tel:${orderType.phone}" style="color:#668BB0;">${orderType.phone}</a>
												        	</div>
												        	<div style="margin-top:10px;margin-left:5px;">
												        		Bestellart：${type}&nbsp;&nbsp;&nbsp;
												        		<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="cancelOrder(this);">Abbrechen</a></button>
												        		<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="changeStatus(this);">Bestätigen Sie</a></button>
												        	</div>
												        </div>`;

					        	$(".item .cart-shop-content").last().after(orderListFooterStr);

						})
					}
					else{
						$("#cart-shop").empty().html("Die ausstehende Bestellung ist leer!");
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
	
		
	setTitle = 'Aufforderung';
	setContents = 'Sind Sie sicher, dass Sie die Bestellung stornieren möchten?';
	setButton = '["Abbrechen","Ermitteln"]';
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


function searchOrder(time){
	
	var searchTool = `Bestellzeit：
						<div class="iDate date">
							<input id="date" type="text">
							<button type="button" class="addOn"></button>
						</div>
						<input id="language" type="button" value="search" onclick="search();"/>
						<hr/>`
	$("#cart-shop").append(searchTool);
	
	$.ajax({
		url: 'sorderController.do?search',
		type: 'POST',
		dataType: 'JSON',
		data:{time:time},
		success:function(data){
			if(data!=""){
				$.each(data,function(index,ele){
					var status = ele.orderStatus;
					if(status == "待处理"){
						status = "Ausstehend";
					}else if(status == "已处理"){
						status = "Verarbeitet";
					}else{
						status = "Storniert";
					}

					var totalNum = 0;
							var orderListheaderStr = `<div class="orderDetail">
									<div class="orderListHeader">
										<div class="orderNumber" >Nummer:${ele.orderNum}</div>
										<div class="orderStatus">Staat：<span style="color:#d8505c ">${status}</span></div>
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
						var type;
						if(orderType.address == null){
							type = "Abholung";
						}else{
							type = "Mailing";
						}
						
						

						$.each(goodsInfo,function(GoodsIndex,GoodsEle){
							
							var name = GoodsEle.name;
		                	
		                	var nameArr = name.split("/");
		                	
		                	var pname;
		                	
		                	if(nameArr.length == 1){
		                		pname = nameArr[0];
		                	}else{
		                		pname = nameArr[1];
		                	}
							
							totalNum+=GoodsEle.count;
							// console.log(GoodsEle);
							var orderListContentrStr = `<div class="item"><div class="cart-shop-content">
												<div class="cart-shop-content-right">
													<a href="#" class="product-img">
														<img src="${GoodsEle.imgsrc}" alt=""/>
													</a>
													<div class="product-info">
													<a href="#" class="info-txt">${pname}</a>
														<div class="option">
															<div class="pull-left">
																<p class="price">Produkt Stückpreis：€ <b>${GoodsEle.price}</b></p>
																<span>Einkaufsmenge：<b>${GoodsEle.count}</b></span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>`;
							$(".orderListHeader").last().after(orderListContentrStr);
						});
						
						var orderListFooterStr = `<div style="height:55px;">
													<div style="margin:5px;">
														Kontakt：<span class="totalNum">${orderType.name}</span>
														Handynummer：<a href="tel:${orderType.phone}" style="color:#668BB0;">${orderType.phone}</a>
													</div>
													<div style="margin-top:10px;margin-left:5px;">
														Bestellart：${type}&nbsp;&nbsp;&nbsp;
														<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="cancelOrder(this);">Abbrechen</a></button>
														<button class="layui-btn layui-btn-radius layui-btn-primary layui-btn-xs"><a href="#" id="${ele.id}" onclick="changeStatus(this);">Best?tigen Sie</a></button>
													</div>
												</div>`;

						$(".item .cart-shop-content").last().after(orderListFooterStr);

				})
			}
			else{
				$("#cart-shop").empty()
				var searchTool = `Bestellzeit：
					<div class="iDate date">
						<input id="date" type="text">
						<button type="button" class="addOn"></button>
					</div>
					<input id="language" type="button" value="search" onclick="search();"/>
					<hr/>`
				$("#cart-shop").append(searchTool);
				dateTool();
				$("#cart-shop").append("Die ausstehende Bestellung ist leer!");
			}
		}
	})
	
	
}

