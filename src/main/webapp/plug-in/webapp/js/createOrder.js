$(function(){

	// 获取购物车列表
	getShoppingCarList();


    $("#close").on("touchend",function(){
        $("#mask").hide();
        $("#maskBody").hide();
    })

    $("#btnCancel").on("touchend",function(){
        $("#mask").hide();
        $("#maskBody").hide();
    })

    $("#btnSure").on("touchend",function(){
    	console.log("----------------------");
    	var goodsId = num.parent().parent(".option").attr("data-goodsId");
        $("#mask").hide();
        $(this).siblings('input').val("0");
        $("#maskBody").hide();
        // 删除即可
        delGoods(goodsId);
        // 获取购物车列表
        getShoppingCarList();
    })


    // 删除此商品
    $("#cart-shop").on("click","#delGoods",function(){
        //
    	var goodsId = $(this).parent().parent(".option").attr("data-goodsId");
        // 删除即可
    	delGoods(goodsId);
        // 获取购物车列表
    	getShoppingCarList();
    })


})



 /**
     * 获取购物车列表
     * @return {[type]} [description]
     */
    function getShoppingCarList(){
	    $.ajax({
	        url: getHostName()+'/cartCar/show',
	        type: 'POST',
	        dataType: 'JSON',
	        timeout: 10000,
	        success:function(data){
                var totalPrice = 0;
                if(data != "" && data!= "[]"){
	                $("#order_context").empty();
	                $.each(JSON.parse(data),function(index, el) {
                        totalPrice += el.count*el.sproductEntity.price;
	                    var str = `<div id="cart-shop-content" class="cart-shop-content">
							            <div class="cart-shop-content-right">
							                <a href="#" class="product-img">
							                    <img src="${getHostName2()}/net_shop_manager/${el.sproductEntity.imgsrc}" alt=""/>
							                </a>
							                <div class="product-info">
							                	<table style="width:100%;">
							                		<tr>
							                			<td style="width:70%;"><a href="#" class="info-txt">${el.sproductEntity.name}</a></td>
							                			<td style="width:30%;"><font color="red">€${el.sproductEntity.price}</font></td>
							                		</tr>
							                    </table>
							                 </div>
							            </div>
							        </div>`;
	                    $("#order_context").append(str);
                        $("#createList").css("display","flex");
                        //$("#btnPrice").html("€ "+totalPrice.toFixed(2)); 
                        $("#o_price").text(totalPrice.toFixed(2));
                        	
	                });
	            }
	        }
	    })
    }
 
    /**
     * 删除购物车中的商品
     * @param  {[number]} goodsId [商品ID]
     * @return {[type]}         [description]
     */
    function delGoods(goodsId){
        $.ajax({
            url: getHostName()+'/cartCar/dropCartGood',
            type: 'POST',
            dataType: 'JSON',
            data: {id: goodsId},
            success:function (data) {
                console.log(data);
            }
        })
    }
