<?php
	header("Content-type:text/html;charset=utf-8");


	//接收数据
	$phoneId=$_POST["phoneId"];
	$password=$_POST["password"];


	//连接数据库
	$conn=mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("midea",$conn);

	//插入数据
	$str = "insert into user(phoneId,password)
				values('$phoneId','$password')";
	mysql_query($str,$conn);

	//关闭数据库
	mysql_close($conn);
	echo "1";

?>