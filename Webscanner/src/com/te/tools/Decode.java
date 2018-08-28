package com.te.tools;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Cheny
 * @email mimi2008yu@163.com
 */

@Controller
public class Decode {

@RequestMapping(value={"/","/WebScanner"},method=RequestMethod.GET)
public String handleRequest(HttpServletRequest arg0, HttpServletResponse arg1) {
	return "WebScanner";
}
}
