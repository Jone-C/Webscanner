// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;
var mediaTrack = null;


function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0);
            try{
            	dataMatrix.decode();
                qrcode.decode();
            }
            catch(e){       
                console.log(e);
                setTimeout(captureToCanvas, 500);
            };
        }
        catch(e){
                console.log(e);
                setTimeout(captureToCanvas, 500);
        };
    }
}


function read(a)
{
	decodeSuccessWarning();

	//Scanner result value back set
	activeScanFiled.val(a);
	console.log("js success:" + a);
}

function scannerDestroy(){
    if(mediaTrack!=null){
		//Close media track and close dialog
		mediaTrack.stop();
		$( "#outdiv" ).dialog('close');
		
		decodeResult = "";
		qrcode.callback = null;
		gCtx = null;
		gCanvas = null;
		c=0;
		stype=0;
		gUM=false;
		webkit=false;
		moz=false;
		v=null;
		mediaTrack = null;
		
		console.log("Media Track Closed.");
    }else{
    	alert('未获得相机权限或流通道,请确认是否允许!');
    }
}



function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function success(stream) 
{
    v.srcObject = stream;
    v.play();
    gUM=true;
    setTimeout(captureToCanvas, 200);
}

function error(error)
{
    alert("error:" + error);
    scannerDestroy();
    return;
}

function load()
{
	if(isCanvasSupported() && window.File && window.FileReader)
	{
		initCanvas(800, 600);
		qrcode.callback = read;
        setwebcam();
	}
	else
	{
		document.getElementById("outdiv").style.display="inline";
		document.getElementById("outdiv").innerHTML='<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>'+
		'<br><p id="mp2">sorry your browser is not supported</p><br><br>'+
		'<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
	}
}
function setwebcam()
{
	var options = true;
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	{
		try{
			navigator.mediaDevices.enumerateDevices().then(function(devices) {
			  devices.forEach(function(device) {
				if (device.kind === 'videoinput') {
				  if(device.label.toLowerCase().search("back") >-1)
					options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'};
				}
				console.log(device.kind + ": " + device.label +" id = " + device.deviceId + " " + Date.parse(new Date()));			
			  });
			  setwebcam2(options);
			});
		}
		catch(e)
		{
			console.log(e);
		}
	}
	else{
		console.log("no navigator.mediaDevices.enumerateDevices" );
		setwebcam2(options);
	}
}

function setwebcam2(options)
{
	console.log("setwebcam2:" + options + " " + Date.parse(new Date()));	
    if(stype==1)
    {
    	console.log("setwebcam2: captureToCanvas time out 500ms" + " " + Date.parse(new Date()));
        setTimeout(captureToCanvas, 500);    
        return;
    }
    
    var n = navigator;
    v = document.getElementById("v");    
    if(n.mediaDevices!=null && n.mediaDevices.getUserMedia!= null)
    {
        n.mediaDevices.getUserMedia({video: options, audio: false}).
            then(function(stream){
                success(stream);
                mediaTrack = stream.getTracks()[0];
                console.log("1 n.mediaDevices.getUserMedia" + " " + Date.parse(new Date()));
            }).catch(function(error){
                error(error);
                console.error(error);
            });
    }
    else if(n.getUserMedia != null)
	{
		webkit=true;
        n.getUserMedia({video: options, audio: false}, success, error);
        console.log("2 n.getUserMedia" + " " + Date.parse(new Date()));
	}
    else if(n.webkitGetUserMedia != null)
    {
        webkit=true;
        n.webkitGetUserMedia({video:options, audio: false}, success, error);
        console.log("3 n.webkitGetUserMedia" + " " + Date.parse(new Date()));
    }else {
    	alert("无法获取摄像头资源, MES兼容Firefox http/https 和 Chrome https浏览器访问!");
    }
    console.log("stype=1 " + Date.parse(new Date()));
    stype=1;
    setTimeout(captureToCanvas, 500);
}

/*function setimg()
{
	document.getElementById("result").innerHTML="";
    if(stype==2)
        return;
    document.getElementById("outdiv").innerHTML = imghtml;
    //document.getElementById("qrimg").src="qrimg.png";
    //document.getElementById("webcamimg").src="webcam2.png";
    document.getElementById("qrimg").style.opacity=1.0;
    document.getElementById("webcamimg").style.opacity=0.2;
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);  
    qrfile.addEventListener("dragover", dragover, false);  
    qrfile.addEventListener("drop", drop, false);
    stype=2;
}*/
