package com.te.tools;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.google.zxing.Binarizer;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.ChecksumException;
import com.google.zxing.FormatException;
import com.google.zxing.LuminanceSource;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.datamatrix.DataMatrixReader;
import sun.misc.BASE64Decoder;

/**
 * @author Cheny
 * @email mimi2008yu@163.com
 */

@Controller
public class DatamatrixDecode {

@RequestMapping(value="/Dmdecoder",method=RequestMethod.POST)
public void handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) {
	//RESPONSE INIT
	arg1.setStatus(200);
	arg1.setContentType("text/html;charset=utf-8");
	arg1.setCharacterEncoding("utf-8");
	PrintWriter writer = null;
	
	String result = "";
	
	//GET BASE64 IMAGE DATA AND CUT OUT BASE64 HEAD
	String imageBASE64 = arg0.getParameter("imageData");
	
	if ( imageBASE64!=null ) {
		imageBASE64 = imageBASE64.substring(22);
		
		//DECODE BASE64 IMAGE
		BASE64Decoder decoder = new BASE64Decoder();
		
		byte[] bytes;
		try {
			//RESPONSE WRITER SETTING
			writer = arg1.getWriter();
			
			//DECODE BASE64 TO BYTES > CONSTRUCT ARRAY INPUT STREAM > CREATE IMAGE BUFFER
			bytes = decoder.decodeBuffer(imageBASE64);
			ByteArrayInputStream input = new ByteArrayInputStream(bytes);
			BufferedImage imageBuf = ImageIO.read(input);
			
			//2D DATA MATRIX DECODE
	        DataMatrixReader reader = new DataMatrixReader();
	        LuminanceSource source = new BufferedImageLuminanceSource(imageBuf);
	        Binarizer binarizer = new HybridBinarizer(source);
	        BinaryBitmap imageBinaryBitmap = new BinaryBitmap(binarizer);
	        Result decode_result = null;
			decode_result = reader.decode(imageBinaryBitmap);
			result = new String(URLDecoder.decode(decode_result.getText(), "utf-8").getBytes("iso-8859-1"),"UTF-8");
			
			//2D CODE RESULT FORMAT TO JSON
			JSONObject json_result = new JSONObject();
			json_result.put("result", result);
			
			//RESPONSE SUCCESS JSON RESULT
			writer.print(json_result);
			writer.flush();
		} catch (IOException //IMAGEIO/RESPONSEIO EXCEPTION
				| JSONException e  //ZXING LIB DECODE EXCEPTION
				) {
			e.printStackTrace();
		} catch (NotFoundException | ChecksumException | FormatException e){	//ZXING LIB DECODE EXCEPTION
			//decode unsuccessful, do nothing
			//e.printStackTrace();
		}finally {
			writer.close();			
		}
	}
	
	
	
}

}
