$(function () {
    //获取Cookie
   let vipName = getDate();
    //导航栏效果
    $(".searchBox").hover(
        function () {
            $(".search").animate({
                opacity: 1
            }, 1000)
        },
        function () {
            $(".searchBox").css({"background-color": "#0092d8"})
        })
    $(".phoneBox").hover(
        function () {
            $(".phoneBox").css({"background-color": "#0185c5"})
            $(".phone_img").css({"display": "block"})
        },
        function () {
            $(".phone_img").css({"display": "none"})
            $(".phoneBox").css({"background-color": "#0092d8"})

        })
    $(".carBox").hover(
        function () {
            $(".carBox").css({"background-color": "#0185c5"})
            $(".lookCar").css({"display": "block"})
        },
        function () {
            $(".carBox").css({"background-color": "#0092d8"})
            $(".lookCar").css({"display": "none"})

        })
    $(".loginBox").hover(
        function () {
            $(".loginBox").css({"background-color": "#0185c5"})
        },
        function () {
            $(".loginBox").css({"background-color": "#0092d8"})
        })

    //购物车
    $.get("getShoppingCart.php",{vipName:vipName},function (str) {
        let data = JSON.parse(str);
        let dom = "";
        for(i in data){
            let price = parseInt(data[i].goodsPrice);
            //console.log(price);
            let num = parseInt(data[i].goodsCount);
            let sum = price*num;
            dom+=`
                <div class="item_sub">
            <input class="check" type="checkbox">
            <div class="imgbox">
                <img src="${data[i].goodsImg}" alt="">
            </div>
            <div class="item_a">
                <a href="#">${data[i].goodsDesc} </a>
            </div>
            <div class="item_sku">
                ${data[i].beiyong1}
            </div>
            <div class="item_price">
                <span class="y_price">${data[i].beiyong2}</span>
                <span class="x_price">${data[i].goodsPrice}</span>
                <div class="hu">会员特惠日</div>
            </div>
            <div class="item_num">
            <i class="goodsid" style="display: none">${data[i].goodsId}</i>
                <span class="jia">+</span><span>${data[i].goodsCount}</span><span class="jian">-</span>
            </div>
            <div class="item_sum">
                ${sum}
            </div>
            <div class="item_opteration">
                <span>添加收藏夹</span>
                <span class="delete">删除</span>
            </div>
        </div>
            `
        }
        $(".cart_list").html(dom);
        $(".jia").each(function () {
            $(this).click(function () {
                let price = $(this).parent().prev().children()[1].innerHTML;
                let num = $(this).next().text();
                num++;
                let goodsid = $(this).prev().text();
                //console.log(goodsid);
              $.get("updateGoodsCount.php",{vipName:vipName,goodsId:goodsid,goodsCount:num}, (str)=> {
                  if(str==1){
                      console.log("修改成功！");
                      $(this).next().text(num);
                      let sum = parseInt(price)*num;
                      $(this).parent().next().text(sum);
                  }
              })
            })
        })//数字加法结束

        $(".jian").each(function () {
            $(this).click(function () {
                let num = $(this).prev().text();
                let price = $(this).parent().prev().children()[1].innerHTML;
                num--;
                let goodsid = $(this).prev().prev().prev().text();
                //console.log(goodsid);
                $.get("updateGoodsCount.php",{vipName:vipName,goodsId:goodsid,goodsCount:num}, (str)=> {
                    if(str==1){
                        console.log("修改成功！");
                        $(this).prev().text(num);
                        let sum = parseInt(price)*num;
                        $(this).parent().next().text(sum);

                    }
                })
            })
        })//数字减法结束

        //删除
        $(".delete").each(function () {
            $(this).click(function () {

                let goodsid = $(this).parent().prev().prev().children()[0].innerHTML;
                $.get("deleteGoods.php",{vipName:vipName,goodsId:goodsid},(str)=> {
                    if(str==1){
                        console.log("删除成功");
                        $(this).parent().parent().remove();
                    }
                })
            })
        })

        //全选
       $(".check").each(function () {
           console.log($(this).attr("checked"));
           $(this).click(function () {
               if($(this).prop("checked")==true){
                   let sum = parseInt($(this).siblings(".item_sum").text());
                   let count=parseInt($(this).siblings(".item_num").children().eq(2).text());
                   console.log(count);
                   let sum_count=parseInt($(".bottom_num .span_num").text());
                   sum_count+=count;
                   $(".bottom_num .span_num").text(sum_count);
                   let gosum = parseInt($(".sumgo").text())
                   gosum+=sum;
                   $(".sumgo").text(gosum);
               }
               if($(this).prop("checked")==false){
                   let sum = parseInt($(this).siblings(".item_sum").text());
                   console.log(sum);
                   let gosum = parseInt($(".sumgo").text())
                   gosum-=sum;
                   $(".sumgo").text(gosum);
                   let count=parseInt($(this).siblings(".item_num").children().eq(2).text());
                   console.log(count);
                   let sum_count=parseInt($(".bottom_num .span_num").text());
                   sum_count-=count;
                   $(".bottom_num .span_num").text(sum_count);
               }
           })
           })


    })//get的回调函数

})//勿动最后一个


jQuery.fn.extend({
    checkboxBind:function($subCheckbox){
        this.click(function(){
            //this是事件源，dom对象
            $subCheckbox.checkAll(this.checked);
        });

        $subCheckbox.click(()=>{
            //this:事件源，所点击的复选框
            this.changeCheck($subCheckbox);
        });
    },

    checkAll:function(isChecked){
        // this//jQuery对象
        this.each(function(){
            // this//jQuery对象中的每一个DOM元素
            this.checked = isChecked;
        });
    },
    unCheck:function($checkboxAll){
        this.each(function(){
            this.checked = !this.checked;
        });
        $checkboxAll.changeCheck(this);
    },
    //子控制父
    changeCheck:function($obj){
        // this
        //假定是全部选中
        let isAllCheck = true;
        for(let i=0;i<$obj.length;i++){
            if(!$obj[i].checked){
                //推翻了
                isAllCheck = false;
                break;
            }
        }
        this.attr({"checked":isAllCheck});
    }
});

//取cookie
function getDate(){
    var str1 = getCookie("p");
    var arr1 = JSON.parse(str1);
    console.log(arr1[0].phoneId);
    let dom="";
    dom=`
			<span style="display: inline-block; width:120px;color: white;font-size: 12px;">欢迎${arr1[0].phoneId}</span><a href="login.html" class="chong">重新登录</a>
			`;
    $(".loginBox").html(dom);
    $(".lookCar").html(' <a href="shoppingcar.html">点击查看购物车\"</a> ');
    $(".chong").click(function () {
        removeCookie("p");
    })
    return arr1[0].phoneId;

}