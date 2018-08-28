/*
 * Web Scanner Manager @Copyright 2018 KTS Cheny
 * 
 * Description : Web scanner support QRcode and Datamatrix Code, that adopt two different method decode.
 * 				Apps Contains copyright Google Zxing core libraries and Lazar Soft.
 * 
 * Support : mimi2008yu@163.com
 * 
 * Usage : [Not supported OS browser]
 * 		a. Implement JavaScript lib
 * 			1. jquery-1.12.4.js
 * 			2. jquery-ui-datepicker.js
 * 			3. llqrcode.js
 * 			4. webqr.js
 * 			5. webscannermanager.js
 * 		b. Build controller[Dmdecoder: Data Matrix processor need ZXING libraries support] on your web server
 * 		c. Defined input filed and set class='scan-field' on your HTML
 * 
 * 
 * Decode Process: 
 * 			Click scan filed 
 * 				--> Open scanner dialog 								|																					|
 * 					--> Get camera permission 							|a. Try decode data matrix code 													|
 * 																		|			--> Build image base64 data and upload to web server controller by Ajax |
 * 							--> Caputure 2D code picture from canvas -->|				--> Controller get request data and decode by zxing java lib.		| --> Anyone success decode will close camera and return data to filed
 * 																		|																					|
 * 																		|b. Try decode QR decode --> JavaScript decode in browser							|
 * 																		|																					|
 * 
 * 
 *
 * */

var audio = document.createElement("audio");
var canvas = document.createElement("canvas");
var video = document.createElement("video");
var outdiv = document.createElement("div");
var scandialog = document.createElement("div");
var activeScanFiled = null;

$(function(){	
	audio.id = "sud";
	audio.src = "jswebscanner/shake.mp3";
	
	canvas.id = "qr-canvas";
	canvas.style.display = "none";
	
	video.id = "v";
	video.autoplay = true;

	video.style.cssText = "width: 100%;height: 200%; overflow: hidden; display:flex; justify-content: center; align-items:center;";
	
	outdiv.id = "outdiv";
	outdiv.title = "2D Code Scanner KTS";
	outdiv.style.cssText = "width: 100%;height: 100%; overflow: hidden; display:flex; justify-content: center; align-items:center;";
	
	scandialog.id = "scan-dialog";
	
	outdiv.appendChild(video);
	scandialog.appendChild(outdiv);
	scandialog.appendChild(canvas);
	scandialog.appendChild(audio);	
	document.body.appendChild(scandialog);
	
	var dialog = $( outdiv ).dialog({
		autoOpen: false,
		height: 300,
		width: 300,
		modal: true,
		resizable: false,
		buttons: {"取消": function(){dialog.dialog("close");}},
		//title: activeScanFiled.attr("placeholder"),
		open: function(){
			dialog.dialog("option","title",activeScanFiled.attr("placeholder"));
			load();
			activeScanFiled.css("backgroundColor", "#FFFACD");
		},
		close: function() {
			activeScanFiled.css("backgroundColor", "transparent");
			scannerDestroy();
		}
	});
	
	$(".scan-field").click(function(){
		activeScanFiled = $(this);
		dialog.dialog("open");
	});
});


var dataMatrix={};
dataMatrix.decode = function(){
		if(canvas!=null){
			var imageData = canvas.toDataURL('image/png');
			$.ajax({
				async: true,
				cache: false,
				type: "POST",
				data: {imageData: imageData},
				dataType: "json",
				timeout: 5000,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				url: "Dmdecoder",
				success: function(data){
					decodeSuccessWarning();
					activeScanFiled.val(data.result);
					console.log("ajax Success: " + data.result);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					console.log("ajax Err: " + XMLHttpRequest.status + " " + textStatus + " " + errorThrown);
				}
			});	
		}
};

function decodeSuccessWarning(){
	//Alert Scanner succeed by sound and vibrate
    document.getElementById("sud").play();
    if (navigator.vibrate) {
        //vibrate 1 second
        navigator.vibrate(1000);
    } else if (navigator.webkitVibrate) {
        navigator.webkitVibrate(1000);
    }
    scannerDestroy();
}
