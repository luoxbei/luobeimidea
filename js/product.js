$(function () {
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
    //倒计时
    clock();

    //
    let vipName=getDate()
    //获取商品详情
    let id = getUrlParam("goodsId");//获取商品id
    //alert(id);
    $.get("getGoodsInfo.php",{goodsId:id},function (str) {
        let data = JSON.parse(str);
        let dom =`
            <div class="product_show">
		<div class="showImg">
				<div class="imgBox" style="background-image: url(${data.goodsImg});background-size: 500px 500px;background-repeat: no-repeat" >
					<div class="mirror">
					</div>
					<div class="Big_img" style="background-image: url(${data.goodsImg});background-size: 1000px 1000px;background-repeat: no-repeat">
					</div>
				</div>
				<div class="share">
					<span class="first_">分享到</span>
					<a href="#"></a>
					<a href="#" class="wx"></a>
					<i></i><span>分享</span>
					<i></i><span>对比</span>
				</div>
		</div>
		<div class="showCost">
			<h1 title="${data.goodsDesc}">${data.goodsDesc}</h1>
			<a href="#" class="xtitle" title="【拒绝潮湿】底价钜惠，领券下单更优惠，乐享干爽舒适生活">【拒绝潮湿】底价钜惠，领券下单更优惠，乐享干爽舒适生活</a>
			<span class="look">查看详情</span>
			<div class="time">
				<span class="time_icon">
				</span>
				<span class="timego">距离活动结束还有</span>
			</div>
			<div class="price">
				<span class="fuhao">￥</span><b>${data.goodsPrice}</b><span class="old">￥${data.beiyong2}</span>
				<span>品质315</span>
			</div>
			<div class="reduc">
				<span class="smal">优惠</span>
				<span>送积分</span>
				<span>最高送999积分</span>
			</div>
			<div class="xcolor">
				<span class="smal">颜色</span>
				<span><img src="${data.goodsImg}">${data.beiyong1}</span>
			</div>
			<div class="xnum">
				<span class="smal">数量</span>
				<div class="num">
					<span class="jian"></span>
					<span>1</span>
					<span class="jia"></span>
				</div>
				<span class="kc">库存 470</span>
			</div>
			<div class="address">
				<span class="smal">配送</span>
				<div class="outer">
					<select name="province" id="province">
						<option value="请选择">请选择</option>
					</select>
					<select name="city" id="city">
						<option value="请选择">请选择</option>
					</select>
					<select name="town" id="town">
						<option value="请选择">请选择</option>
					</select>
				</div>

				<span class="huo">有货</span>
		</div>
			<div class="fenqi">
				<h3><span class="smal">花呗分期</span>该商品支持花呗</h3>
				<div class="fen">
					<h5>￥340.66*3期</h5>
					<h5>（含手续费）</h5>
				</div>
				<div class="fen">
					<h5>￥340.66*3期</h5>
					<h5>（含手续费）</h5>
				</div>
				<div class="fen">
					<h5>￥340.66*3期</h5>
					<h5>（含手续费）</h5>
				</div>
			</div>
			<div class="gonghuo">
				<span class="smal">供货商</span>
				<span>美的授权•中央空调授权店</span>
			</div>
			<div class="butt">
				<button class="but_add">加入购物车</button>
				<button>立即购买</button>
			</div>
			<div class="tb_icon">
                <i></i><span>美的唯一官方商城</span>
                <i></i><span>全国联保</span>
                <i></i><span>全场包邮</span>
			</div>
	</div>
    </div>
        `;
        $(".showBox").html(dom);

        $(".jia").click(function () {
            let num = $(this).prev().text();
           // console.log(num);
            num++;
            $(this).prev().text(num);
        })
        $(".jian").click(function () {
            let num = $(this).next().text();
            // console.log(num);
            num--;
            if(num<1){
                num=1;
            }
            $(this).next().text(num);
        })
        $(".but_add").click(function () {
            let num = $(".jian").next().text();
            $.get("addShoppingCart.php",{vipName:vipName,goodsId: id,goodsCount:num},function (res) {
                if(res==1){
                    alert("添加成功！");
                }
            })
        })



        //放大镜
        $(".imgBox").mousemove(function (e) {
            //一、数据处理
            //1、改变数据（放大镜子的left和top）
            let left1 = e.pageX - $(this).offset().left - $(".mirror").width() / 2;//
            let top1 = e.pageY - $(this).offset().top - $(".mirror").height() / 2;//
            //2、边界处理
            if (left1 < 0) {
                left1 = 0;
            } else if (left1 > this.offsetWidth - $(".mirror").width()) {
                left1 = this.offsetWidth - $(".mirror").width();
            }

            if (top1 < 0) {
                top1 = 0;
            } else if (top1 > this.offsetHeight - $(".mirror").height()) {
                top1 = this.offsetHeight - $(".mirror").height();
            }

            //二、外观呈现
            $(".mirror").css({
                "left": left1 + "px",
                "top": top1 + "px"
            });
            $(".Big_img").css({
                "background-position": -1 * 2 * left1 + "px" + " " + -1 * 2 * top1 + "px",
                "display": "block"
            });
        })
        $(".imgBox").mouseleave(function () {
            $(".Big_img").css({"display":"none"});
        })


    })//动态回调函数的最后一个括号


//点击产品详情导航
$(".tabs_ul li").each(function () {
    $(this).click(function () {
        $(".tabs_ul li").css({
            "border-bottom":"none",
            "color":"#999999"
        })
        $(this).css({
            "border-bottom": "2px solid #0078cf",
            "color":"#333333"
        })
    })
})
//悬浮
   let top = 1300;
    $(window).scroll(function () {
        let scrTop=document.documentElement.scrollTop || document.body.scrollTop;
        if(scrTop>=top){
            $(".cang").css({
                "display":"block",
                "position":"fixed",
                "top":0
            })
        }else{
            $(".cang").css({
                "display":"none",
                "position":"static"
            })
        }
    })


})//最后一个括号，勿动

//倒计时
function clock() {
    var today = new Date();//当前时间
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    var stopTime = new Date("Jul 20 2019 00:00:00");//结束时间
    let stopH = stopTime.getHours();
    let stopM = stopTime.getMinutes();
    let stopS = stopTime.getSeconds();
    var shenyu = stopTime.getTime() - today.getTime();//倒计时毫秒数
    let shengyuD = parseInt(shenyu / (60 * 60 * 24 * 1000));//转换为天
    let D = parseInt(shenyu) - parseInt(shengyuD * 60 * 60 * 24 * 1000);//除去天的毫秒数
    let shengyuH = parseInt(D / (60 * 60 * 1000));//除去天的毫秒数转换成小时
    let H = D - shengyuH * 60 * 60 * 1000;//除去天、小时的毫秒数
    let shengyuM = parseInt(H / (60 * 1000));//除去天的毫秒数转换成分钟
    let M = H - shengyuM * 60 * 1000;//除去天、小时、分的毫秒数
    let S = parseInt((shenyu - shengyuD * 60 * 60 * 24 * 1000 - shengyuH * 60 * 60 * 1000 - shengyuM * 60 * 1000) / 1000);//除去天、小时、分的毫秒数转化为秒
    $(".timego")[0].innerHTML = ("距离活动结束还有：" + shengyuD + "天" + shengyuH + "小时" + shengyuM + "分" + S + "秒" + "<br>");
    // setTimeout("clock()",500);
    setTimeout(clock, 500);
}

//获取地址栏信息
function getUrlParam(name){
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}


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

