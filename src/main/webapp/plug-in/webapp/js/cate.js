loadRemoteData = function(adminId,adminName) {


    // 点击分类切换对应商品
  
  

  

    /**
     * [获取对应分类商品]
     * @param  {[string]} admin_id    [当前店铺店长的id]
     * @param  {[string]} data_cateId [商品分类ID]
     * @return {[type]}             [description]
     */
    function getCateGoods(admin_id,index, condition) {
        $.ajax({
            url: getHostName()+"/product/findProductsByDsql.do?index="+index+"&condition="+condition,
            type: 'GET',
            dataType: 'JSON',
            timeout: 10000,
            success: function (data) {
                $("#product-info").empty();
                $.each(JSON.parse(data), function (index, el) {
                    var str = `<li data-goodsId=${el.id}>
                                    <div class="left-img">
                                        <a href="#">
                                            <img src="http://localhost:8080/net_shop_manager/${el.imgsrc}" alt="">
                                        </a>
                                    </div>
                                    <div class="middle-info">
                                        <div class="product-name">${el.name}
                                        </div>
                                        <div class="product-price">
                                            €${el.price}
                                        </div>
                                    </div>
                                    <div class="right-num">
                                        <span id="minusOne" class="iconfont  icon-subtract minusOne"></span>
                                        <span id="num" class="num"> 0 </span>
                                        <span id="addOne" class="iconfont  icon-add addOne"></span>
                                    </div>
                                </li>`;
                    $("#product-info").append(str);
                });
            }
        })
    }

    /**
     * 获取所有分类的商品
     * @param  {[string]} admin_id    [当前店铺店长的id]
     * @return {[type]}             [description]
     */
    function getAllCateGoods(admin_id) {
        $.ajax({
            url: getHostName()+"/product/findProductsByDsql.do?index=1&condition=where admin_id='" + admin_id + "'",
            type: 'GET',
            dataType: 'JSON',
            timeout: 10000,
            success: function (data) {
                $("#product-info").empty();
                $.each(JSON.parse(data), function (index, el) {
                    var str = `<li data-goodsId=${el.id}>
                                    <div class="left-img">
                                        <a href="#">
                                            <img src=http://lu-food.com/net_shop_manager/${el.imgsrc} alt="">
                                        </a>
                                    </div>
                                    <div class="middle-info">
                                        <div class="product-name">${el.name}
                                        </div>
                                        <div class="product-price">
                                            €${el.price}
                                        </div>
                                    </div>
                                    <div class="right-num">
                                        <span id="minusOne" class="iconfont  icon-subtract minusOne"></span>
                                        <span id="num" class="num"> 0 </span>
                                        <span id="addOne" class="iconfont  icon-add addOne"></span>
                                    </div>
                                </li>`;
                    $("#product-info").append(str);
                });
            }
        })
    }


    /**
     * 获取购物车列表
     * @return {[type]} [description]
     */
    function getShoppingCarList() {
        var totalNum = 0;
        var totalPrice = 0;
        $.ajax({
            url: getHostName()+'/cartCar/show',
            type: 'GET',
            dataType: 'JSON',
            timeout: 10000,
            success: function (data) {
                if (data != "") {
                    $("#maxShoppingList").empty();
                    $.each(JSON.parse(data), function (index, el) {
                        totalNum += el.count;
                        totalPrice += el.count * el.sproductEntity.price;
                        // if(el.sproductEntity.id == $())

                        // var str = `<li>
                        //                 <div class="shopInfo">
                        //                     <div class="shopName">${el.sproductEntity.name}</div>
                        //                     <div class="shopPrice">€${el.sproductEntity.price}</div>
                        //                     <div class="shopNum">${el.count}</div>
                        //                 </div>
                        //                 <div class="btnDel">
                        //                     <span class="btnClear iconfont icon-cart"></span>
                        //                     <span class="btnMinus iconfont icon-jian"></span>
                        //                     <span class="btnAdd iconfont  icon-jia"></span>
                        //                 </div>
                        //             </li>`;
                        var str = `<li>
                                        <div class="shopInfo">
                                            <div class="shopName">${el.sproductEntity.name}</div>
                                            <div class="shopPrice">€${el.sproductEntity.price}</div>
                                            <div class="shopNum">${el.count}</div>
                                        </div>
                                    </li>`;
                        $("#maxShoppingList").append(str);
                    });
                    $("#GoodsNum").html(totalNum);
                    $("#btnPrice").html(" € " + totalPrice.toFixed(2));
                }
                else {
                    $("#minGoodsList").hide();
                    $("#maxGoodsList").hide();
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
    function updateGoodsNum(goodsId, count) {
        $.ajax({
            url: getHostName()+'/cartCar/changeCount',
            type: 'POST',
            dataType: 'JSON',
            data: {
                id: goodsId,
                count: count
            },
            success: function (data) {
                console.log("删除成功");
            }
        })
    }

    

}








