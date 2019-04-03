<?php
	header("Content-type:text/html;charset=utf-8");
	//接收数据
	$phoneId = $_POST["phoneId"];
	$password = $_POST["password"];
	//连接数据库
	$conn = mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("midea",$conn);
	//SQL语句
	$str = "select * from user where phoneId='$phoneId' and password='$password'";
	$result=mysql_query($str,$conn);
	//关闭
	mysql_close($conn);
	//行
	$rows = mysql_num_rows($result);
	if($rows==1){
		echo "1";
	}else{
		echo "0";
	}
?>