
$(function () {
    //导航栏效果
    $(".searchBox").hover(
        function(){
            $(".search").animate({
                opacity: 1
            },1000)
        },
        function(){
            $(".searchBox").css({"background-color":"#0092d8"})
        })
    $(".phoneBox").hover(
        function(){
            $(".phoneBox").css({"background-color":"#0185c5"})
            $(".phone_img").css({"display":"block"})
        },
        function(){
            $(".phone_img").css({"display":"none"})
            $(".phoneBox").css({"background-color":"#0092d8"})

        })
    $(".carBox").hover(
        function(){
            $(".carBox").css({"background-color":"#0185c5"})
            $(".lookCar").css({"display":"block"})
        },
        function(){
            $(".carBox").css({"background-color":"#0092d8"})
            $(".lookCar").css({"display":"none"})

        })
    $(".loginBox").hover(
        function(){
            $(".loginBox").css({"background-color":"#0185c5"})
        },
        function(){
            $(".loginBox").css({"background-color":"#0092d8"})
        })


    let vipName=getDate();
   // debugger;
    //动态添加商品
    $.get("getGoodsList.php",function (str) {
        let data = JSON.parse(str);
        let uldom="";
        // console.log(data);
        // console.log(datas)
        for(i in data){
            if(data[i].goodsType=="空调"){
            uldom +=`
			<li class="hproduct">
                    <a href="product.html?goodsId=${data[i].goodsId}" target="_blank" class="hpa">
                        <img src="${data[i].goodsImg}" alt="">
                    </a>
                    <div class="lf_massage">
                        <div class="price_new">
                           ￥ <span>${data[i].goodsPrice}</span>
                        </div>
                    </div>
                    <a href="#" class="fn">
                        ${data[i].goodsDesc}
                    </a>
                    <div class="comper">
                        <i class="car" style="color: transparent">${data[i].goodsId}</i><span>购物车</span>
                    </div>
                </li>
		`}

        }
        $(".search_list").html(uldom);
        $(".car").each(function () {
            $(this).click(function () {
                $.get("addShoppingCart.php",{vipName:vipName,goodsId:$(this).text(),goodsCount:1})
            })
        })
    });



})//最后一个

function getDate(){
    var str1 = getCookie("p");
    var arr1 = JSON.parse(str1);
    console.log(arr1[0].phoneId);
    let dom="";
    dom=`
			<span style="display: inline-block; width:120px;color: white;font-size: 12px;">欢迎${arr1[0].phoneId}</span><a href="login.html" class="chong">重新登录</a> 
			`;
    $(".loginBox").html(dom);
    $(".lookCar").html(' <a href="shoppingcar.html">点击查看购物车\"</a> ')
    $(".chong").click(function () {
        removeCookie("p");
    })
    return arr1[0].phoneId;

}
