<?php
	header("Content-Type:text/html;charset=utf-8");

	$phoneId = $_GET["phoneId"];
	//连接数据库
	$conn = mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("midea",$conn);
	//执行SQL语句
	$str = "select * from user where phoneId='$phoneId'";
	$result=mysql_query($str,$conn);
	//关闭数据库
	mysql_close($conn);
	//行
	$rows = mysql_num_rows($result);
	if($rows==1){
		echo "1";
	}else{
		echo "0";
	}
?>