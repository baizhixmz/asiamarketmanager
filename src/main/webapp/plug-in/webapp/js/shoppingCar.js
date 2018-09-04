$(function(){

	// 获取购物车列表
	getShoppingCarList()


	// 商品数量加一
    $("#cart-shop").on("touchend","#addOne",function(){
        var $count = $(this).siblings('input').val();
        $count++;
        $(this).siblings('input').val($count);

        $.ajax({
            url: getHostName()+'/cartCar/appendCount.do',
            type: 'POST',
            dataType: 'JSON',
            timeout:10000,
            data:
                {
                    id: $(this).parent().parent(".option").attr("data-goodsId"),
                    count: $count
                },
            success:function(){
                // 获取购物车列表
                getShoppingCarList();
            }
        })
    })

	// 商品数量减一
    var num = null;
    $("#cart-shop").on("touchend","#minusOne",function(){
        var $count = $(this).siblings('input').val();
        if($count!=1){
            $count--;
            $(this).siblings('input').val($count);
            // 获取商品ID
            var goodsId = $(this).parent().parent(".option").attr("data-goodsId");
            // 修改商品数量，-1
            updateGoodsNum(goodsId,$count);
            // 获取购物车列表
            getShoppingCarList();
        }
        else{
            $("#mask").show();
            $("#maskBody").show();
            return num = $(this);
        }
    })


    $("#close").on("touchend",function(){
        $("#mask").hide();
        $("#maskBody").hide();
    })

    $("#btnCancel").on("touchend",function(){
        $("#mask").hide();
        $("#maskBody").hide();
    })

    $("#btnSure").on("touchend",function(){
    	console.log("======================");
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
    $("#cart-shop").on("touchend","#delGoods",function(){
        //
    	var goodsId = $(this).parent().parent(".option").attr("data-goodsId");
        // 删除即可
    	delGoods(goodsId);
        // 获取购物车列表
    	getShoppingCarList();
    })

    // 修改数量
    $("#cart-shop").on("blur",".pull-left input",function(){
        var goodsId = $(this).parent().parent(".option").attr("data-goodsId");
        var count = $(this).val();
        updateGoodsNum(goodsId,count);
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
	                $("#cart-shop").empty();
	                $.each(JSON.parse(data),function(index, el) {
                        totalPrice += el.count*el.sproductEntity.price;
	                    var str = `<div id="cart-shop-content" class="cart-shop-content">
							            <div class="cart-shop-content-right">
							                <a href="#" class="product-img">
							                    <img src="${getHostName2()}/net_shop_manager/${el.sproductEntity.imgsrc}" alt=""/>
							                </a>
							                <div class="product-info">
							                    <a href="#" class="info-txt">${el.sproductEntity.name}</a>
							                    <p class="price">€${el.sproductEntity.price}</p>
							                    <div class="option" data-goodsId="${el.sproductEntity.id}">
							                        <div class="pull-left">
							                            <span id="minusOne">-</span>
							                            <input type="text" value="${el.count}"/>
							                            <span id="addOne">+</span>
							                        </div>
							                        <div class="pull-right">
							                            <span id="delGoods" class="iconfont icon-delete"></span>
							                        </div>
							                    </div>
							                </div>
							            </div>
							        </div>`;
	                    $("#cart-shop").append(str);
                        $("#createList").css("display","flex");
                        $("#btnPrice").html("€ "+totalPrice.toFixed(2));
	                });
	            }
                else {
                    $("#cart-shop").empty();
                    var str = `<div id="shopping-car" class="shopping-car">
                                <div class="ico-shoppingCar">
                                    <span class="iconfont icon-cart"></span>
                                </div>
                                <div class="txt">购物车是空的</div>
                                <div>
                                    <div class="btn btnSure m0"><a href="home.jsp">再去逛逛</a></div>
                                </div>
                            </div>`;
                        $("#cart-shop").append(str);
                        $("#btnPrice").html("€ 0.00");
                        $("#createList").hide();
                }
	        }
	    })
    }
    /**
     * 修改购物车商品数量
     * @param  {[number]} goodsId [商品ID]
     * @param  {[number]} count   [需要设置的商品数量]
     * @return {[type]}         [description]
     */
    function updateGoodsNum(goodsId,count){
        $.ajax({
                url: getHostName()+'/cartCar/changeCount',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id: goodsId,
                    count: count
                },
                success:function(data){
                    console.log("删除成功");
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


})