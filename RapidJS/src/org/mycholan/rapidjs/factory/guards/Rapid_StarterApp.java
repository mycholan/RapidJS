package org.mycholan.rapidjs.factory.guards;

import java.util.ArrayList;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.mycholan.rapidjs.RapidJS.Rapid_MasterHandler;
import org.mycholan.rapidjs.session.AppContext;
import org.mycholan.rapidjs.session.RapidContext;




public class Rapid_StarterApp {
	private RapidContext rContext = null;
	private Rapid_MasterHandler AppManager;
	private AppContext AC = null;
	
	private static Logger log = Logger.getLogger(Rapid_StarterApp.class);
	
	public Rapid_StarterApp(RapidContext rcontext) {
		rContext = rcontext;
		AC = new AppContext();
	      AppManager = new Rapid_MasterHandler(rContext);
	}
	
	public String StartAdmin() {
	          Properties AdminApp = AppManager.GetApplication(1);
	          
	          if (AdminApp == null) {
	               log.info("Routine : getLoginPage, Getting application object, operation failed");
	               return "{\"status\":\"Applcation not initiated\", \"info\":\"\"}";
	          }

	          Properties windowObj = AppManager.getWindow(1);
	          
	          ArrayList<Properties> actionList = AppManager.GetWindowActionList(1);
	          
	          AC.setApplication(AdminApp);
	          AC.setWindow(windowObj);
	          AC.setAction(actionList);
	          
	          rContext.getSession().setAttribute("RJS_AppContext", AC);

	          JSONObject jObj = JSONObject.fromObject(AC);
	          return jObj.toString();
	     }
}

