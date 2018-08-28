<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta name="description" content="Web 2D Scanner">
	<meta name="keywords" content="decode,qr code,scanner,dmcode,data matrix,javascript">
	<meta name="language" content="English">
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css">
	<script src="jquery-ui-1.12.1/jquery-1.12.4.js"></script>
	<script src="jquery-ui-1.12.1/jquery-ui-datepicker.js"></script>
	<script type="text/javascript" src="jsqrdeocdeserver/llqrcode.js"></script>
	<script type="text/javascript" src="jsqrdeocdeserver/webqr.js"></script>
	<script type="text/javascript" src="jsqrdeocdeserver/webscannermanager.js"></script>
	<title>Web 2D Code Scanner</title>
	<style type="text/css">
		.scan-div {white-space: pre-wrap;}
		.scan-field {margin: 2px; width: 99%; font-size: 1em; font-weight: bolder; color: #0000CD}
		
		#project {font-weight: bolder; font-size: 2em; text-align: center;}
		.paragraphs {font-weight: bolder;font-size: 1em;}
		pre {font-family: inherit;}
		p, pre, hr, h4 {margin: 3px;}
	</style>
</head>
<body>

<div class="project-description">
	<p id="project">Web 2D Code Scanner</p>
	<p class="paragraphs">Description : </p>
	<pre>
		.Web Scanner Manager @Copyright 2018 KTS Cheny
		.Web scanner support QRcode and Datamatrix Code, that adopt two different method decode.
		.Apps Contains copyright Google Zxing core libraries and Lazar Soft.
	</pre>
	<p class="paragraphs">Usage : </p>
	<pre>
		a. Implement JavaScript lib
			1. jquery-1.12.4.js
			2. jquery-ui-datepicker.js
			3. llqrcode.js
			4. webqr.js
			5. webscannermanager.js
		b. Build controller[Dmdecoder: Data Matrix processor need ZXING libraries support] on your web server
		c. Defined input filed and set class='scan-field' on your HTML
	</pre>
	 
	<p class="paragraphs">Decode Process: </p>
	<img alt="Flow Chart" src="jsqrdeocdeserver/webscanner_process.png"> 
	<p class="paragraphs">Support:</p>
	<pre>      <a href="mailto:mimi2008yu@163.com">mimi2008yu@163.com</a></pre>
</div>
<hr>
<h4>Demo</h4>
<div class="scan-div">
	<input id="rlt" type="text" placeholder="Click Scan 2D Code 1" class="scan-field">
	<input id="rlt" type="text" placeholder="Click Scan 2D Code 2" class="scan-field">
	<input id="rlt" type="text" placeholder="Click Scan 2D Code 3" class="scan-field">
</div>


</body>
</html>