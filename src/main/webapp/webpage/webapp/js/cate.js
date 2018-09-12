loadRemoteData = function(adminId,adminName) {

    // 初始化检查购物车是否为空，否则恢复用户数据

    // 获取对应分类商品
    var categoryId = $(this).attr('data-cateId');
    var condition = "";
    if(adminName == "SuperAdmin"){
        condition = "where flag = 'Y'";
        getCateGoods(adminId,1, condition);
    }else{
        condition = "where admin_id='"+adminId+"'";
        getCateGoods(adminId,1, condition);
    }

    // 获取当前店铺下所有分类
    getAllCateName(adminId);
    // 获取购物车已选商品
    getShoppingCarList();


    // 点击分类切换对应商品
    $(".categary-left").on("touchend", "li", function () {
        if ($(this).index() != 0 && $(this).index() != 1) {
            $(this).addClass('active').siblings('li').removeClass('active');
            // 获取对应分类商品
            var categoryId = $(this).attr('data-cateId');
            if(adminName == "SuperAdmin"){
                condition = "where flag = 'Y' and category_id ='"+categoryId+"'";
                getCateGoods(adminId,1, condition);
            }else{
                condition = "where admin_id='"+adminId+"' and category_id ='"+categoryId+"'";
                getCateGoods(adminId,1, condition);
            }
        }
        else if ($(this).index() == 1) {
            $(this).addClass('active').siblings('li').removeClass('active');
            // 获取对应分类商品
            var categoryId = $(this).attr('data-cateId');
            if(adminName == "SuperAdmin"){
                condition = "where flag = 'Y'";
                getCateGoods(adminId,1,condition);
            }else{
                condition = "where admin_id='"+adminId+"'";
                getCateGoods(adminId,1,condition);
            }
        }
    })

    //添加购物车中的某件商品
    $("#product-info").on("touchend", " .addOne", function () {
        var $count = $(this).siblings('#num').html();
        $count++;
        $(this).siblings().show().siblings('#num').html($count);

        $("#minGoodsList").css("display", "flex");

        $.ajax({
            url: getHostName()+'/cartCar/appendCount.do',
            type: 'POST',
            dataType: 'JSON',
            timeout: 10000,
            data: {
                id: $(this).parent().parent("li").attr("data-goodsId"),
                count: $count
            },
            success: function () {
                // 获取购物车列表
                getShoppingCarList();
            }
        })
    })

    // 删除购物车中的某件商品
    var num = null;
    $("#product-info").on("touchend", ".minusOne", function () {
        var $count = $(this).siblings('#num').html();
        if ($count != 1) {
            $count--;
            $(this).siblings('#num').html($count).show();
            // 获取商品ID
            var goodsId = $(this).parent(".right-num").parent("li").attr('data-goodsid');
            // 修改商品数量，-1
            updateGoodsNum(goodsId, $count);
            // 获取购物车列表
            getShoppingCarList()
        }
        else {
            $("#mask").show();
            $("#maskBody").show();
            return num = $(this);
        }

        $("#close").on("touchend", function () {
            $("#mask").hide();
            $("#maskBody").hide();
        })

        $("#btnCancel").on("touchend", function () {
            $("#mask").hide();
            $("#maskBody").hide();
        })

        $("#btnSure").on("touchend", function () {
            $("#mask").hide();
            num.hide().siblings('#num').hide().html("0");
            $("#maskBody").hide();
            var goodsId = num.parent(".right-num").parent("li").attr('data-goodsid')
            // 删除即可
            delGoods(goodsId);
            // 获取购物车列表
            getShoppingCarList();
            $("#minGoodsList").hide();
            $("#maxShoppingList").hide();
        })
    })


    // 显示购物车列表
    $("#minGoodsList").on("touchend", function () {
        $("#maxGoodsList").toggle();
        // 获取购物车列表
        getShoppingCarList();
    })


    /**
     * 获取当前店铺下所有分类名
     * @param  {[string]} adminId [当前店铺店长的id]
     * @return {[type]}         [description]
     */
    function getAllCateName(adminId) {
        $.ajax({
            url: getHostName()+"/category/findCategorys?adminId=" + adminId,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                $.each(JSON.parse(data), function (index, obj) {
                	
                    console.log(index, obj);
                    
                    var arr = obj.name.split("/");
                    console.log(arr[0]+"========"+arr[1]);
                    
                    if (index === 0) {
                        $("#categary-left ul").append($('<li id="search"><span class="iconfont  icon-search"></span></li><li id="allCate" class="active"><a href="javascript:void(0)">所有分类</a></li><li data-cateId=' + obj.id + '><a href="javascript:void(0)">' + arr[0] + '</a></li>'));
                    } else {
                        $("#categary-left ul").append($('<li data-cateId=' + obj.id + '><a href="javascript:void(0)">' + arr[0] + '</a></li>'));
                    }
                })
            }
        })
    }

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
                                            <img src="http://mainriversoft.com/asiamarketmanager/${el.imgsrc}" alt="">
                                        </a>
                                    </div>
                                    <div class="middle-info">
                                        <div class="product-name">${el.name}</div>
                                        <div class="product-name">单位：${el.chinaUnit}</div>
                                        <div class="product-price">
                                            价格：€${el.price}
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
                                            <img src="http://mainriversoft.com/asiamarketmanager/${el.imgsrc}" alt="">
                                        </a>
                                    </div>
                                    <div class="middle-info">
                                        <div class="product-name">${el.name}
                                        </div>
                                        <div class="product-name">单位：${el.chinaUnit}</div>
                                        <div class="product-price">
                                            价格：€${el.price}
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

    /**
     * 删除购物车中的商品
     * @param  {[number]} goodsId [商品ID]
     * @return {[type]}         [description]
     */
    function delGoods(goodsId) {
        $.ajax({
            url: getHostName()+'/cartCar/dropCartGood',
            type: 'POST',
            dataType: 'JSON',
            data: {id: goodsId},
        })
    }




    // 搜索部分
    $("#categary-left").on("touchend", "#search", function () {
        $(".searchTop").toggle();
    })

    // 搜索
    $("#btnSearch").on("touchend", function () {
        console.log($("#iptGoodsName").val());
        if(adminName == "SuperAdmin"){
            condition = "where flag='Y' and name like '%" + $("#iptGoodsName").val() + "%'";
        }else {
            condition = "where admin_id='" + adminId + "' and name like '%" + $("#iptGoodsName").val() + "%'";
        }
        $.ajax({
            url: getHostName()+'/product/findProductsByDsql.do',
            type: 'POST',
            dataType: 'JSON',
            data: {
                condition: condition,
                index: 1,
            },
            timeout: 1000,
            success: function (data) {
                if (data != "[]") {
                    $("#product-info").empty();
                    $.each(JSON.parse(data), function (index, el) {
                        var str = `<li data-goodsId=${el.id}>
                                        <div class="left-img">
                                            <a href="#">
                                                <img src="http://mainriversoft.com/asiamarketmanager/${el.imgsrc} alt="">
                                            </a>
                                        </div>
                                        <div class="middle-info">
                                            <div class="product-name">${el.name}
                                            </div>
                                            <div class="product-name">单位：${el.chinaUnit}</div>
                                            <div class="product-price">
                                                价格：€${el.price}
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
                else {
                    $("#product-info").empty();
                    $("#product-info").html("未能查询到此商品");
                }
            }
        })
    })
}








