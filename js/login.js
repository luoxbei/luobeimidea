$(function(){
	// $(".rec").each().click(function(){
	// 	$(".register").css({"disply":"block"})
	// 	$(".login").css({"display":"none"})
	// });
	$(".rec").each(function(){
		$(this).click(function(){
			$(".register").css({"display":"block"})
			$(".login").css({"display":"none"})
		})
	});

	$(".logingo").click(function(){
		$(".register").css({"display":"none"})
		$(".login").css({"display":"block"})
	});
	$(".duan").click(function(){
		$(".one").css({"display":"none"})
		$(".two").css({"display":"block"})
	});
	$(".zhang").click(function(){
		$(".two").css({"display":"none"})
		$(".one").css({"display":"block"})
	});

	$(".chack").click(chack);

//正则表达式
//手机号注册
	//手机号
	let phone = false;
	$("#phoneId").blur(function(){
		var r = /^1[1-9]\d{9}$/;
		$.ajax({
			type: "get",
			url: "phoneCheck.php",
			async :true,
			data: {phoneId:$("#phoneId").val()},
			success:(data)=>{
				if(r.test(this.value) && data==0){
					$(this).next().html("√");
					phone = true;
				}else{
					$(this).next().html("×");
					alert("手机号已被注册！或手机号格式有误");
					phone = false;
				}
			}
		});

	})
	//注册密码
	let pass = false;

	$("#mima").blur(function(){
		if(phone==true){
		let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
		let str1=$("#mima").val();
		if(re.test(str1)){
				$("#mima").next().html("√");
				pass = true;
			}else{
				$("#mima").next().html("×");
				alert("密码长度必须在8位以上，含大小写字母、数字、符号至少三种!");
				pass = false;
			}
		}
	})


	$("#mima2").blur(function () {
		if(pass == true){
		let str1=$("#mima").val();
		let str2 = $("#mima2").val();
		if(str1 == str2){
			$("#mima2").next().html("√");
			pass = true;
		}else{
			alert("俩次密码输入不一致");
			pass = false;
		}
		}
	})


	//注册按钮
	$("#register").click(function(){
		if(pass==true && phone==true){
			$.ajax({
				type: "post",
				url: "register.php",
				async :true,
				data: {phoneId:$("#phoneId").val(),
					password:$("#mima").val()},
				success:(data)=>{
					if(data==1){
						location.href="login.html";
					}else {
						alert("密码或账户号输入有误！");
					}
				}
			});
		}
	})
//登录
$("#d_phoneId").blur(function () {
	$.ajax({
		type: "get",
		url: "phoneCheck.php",
		async :true,
		data: {phoneId:$("#d_phoneId").val()},
		success:(data)=>{
			if(data==0){
				alert("账号不存在！");
			}
		}
	});
})
$("#d_login").click(function(){
	$.ajax({
		type: "post",
		url: "login.php",
		async :true,
		data: {phoneId:$("#d_phoneId").val(),
			password:$("#d_password").val()},
		success(data){
			if(data==1){
				saveDate();
				location.href="index.html";
			}else{
				alert("账号或密码不正确！");
			}
		}
	});

})


	
})//页面加载最后一个括号


//规则同意效果
let chack_count=1;
function chack(){

	if(chack_count==0){
			$(".chack i").css({
				"display":"none"
			})
			chack_count++;
		}else{
			$(".chack i").css({
				"display":"block",
				"background-color":"#0092d8",
				"background-image":"url(img/img-login/login.png)",
				"background-position": "-70px -152px",
   				 "height": "11px",
   				 "width": "11px"
			})
			chack_count=0;
		}
}

//cookie的存储
function saveDate(){
	//let btns= $("#register");
	let arr=[];
	for(let i=0;i<2;i++){
		var date = {
			"phoneId":$("#d_phoneId").val(),
			"password":$("#d_password").val()
		};
		arr.push(date);
	}
	var str = JSON.stringify(arr);
	addCookie("p",str,10);
	alert(str);
}
// function getDate(){
// 	var str1 = getCookie("p");
// 	var arr1 = JSON.parse(str1);
// 	let zong = 0;
// 	let btns = $(".btn");
// 	for(let i=0;i<arr1.length;i++){
// 		btns[i].firstElementChild.nextElementSibling.innerHTML=arr1[i].num;
// 		btns[i].nextElementSibling.firstElementChild.innerHTML=arr1[i].money;
// 		zong+=parseInt(arr1[i].num*arr1[i].money);
// 	}
// 	$("#zongmoney").innerHTML=zong;
// 	alert(zong);
// }
