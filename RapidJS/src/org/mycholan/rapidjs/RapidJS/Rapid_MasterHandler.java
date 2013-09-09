package org.mycholan.rapidjs.RapidJS;

import java.util.ArrayList;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.mycholan.rapidjs.loader.Rapid_BootLoader;
import org.mycholan.rapidjs.loader.Rapid_Initializer;
import org.mycholan.rapidjs.session.RapidContext;
import org.mycholan.rapidjs.session.RapidCoreMeta;

public class Rapid_MasterHandler {
	private Properties CurrentApp;
	private Properties CurrentWindow;
	private Rapid_WindowHandler WindowHandler = null;
	private Rapid_ActionHandler ActionHandler = null;
	private RapidContext rContext = null;
	static Logger log = Logger.getLogger(Rapid_MasterHandler.class);
	
	public Rapid_MasterHandler(RapidContext rcontext) {
		rContext = rcontext;
		WindowHandler = new Rapid_WindowHandler(rContext);
		ActionHandler = new Rapid_ActionHandler();
		log.info("Routine : Construtor, DJ_ApplicationManager Instanciated");
	}
	
	public ArrayList<Properties> GetApplicationList() {
		RapidCoreMeta rj_session = Rapid_Initializer.Init_RJ_Context();

		if (rj_session == null) {
			log.info("Routine : GetApplication, Getting DJ_SESSION attribute operation failed ");
			return null;
		}

		return rj_session.getRj_apps();
	}

	public Properties GetApplication(int appID) {
		log.info("Routine : GetApplication, Function called with appID " + appID);
		boolean flaQ = false;

		RapidCoreMeta rj_session = Rapid_Initializer.Init_RJ_Context();
		if (rj_session == null) {
			log.info("Routine : GetApplication, Getting DJ_SESSION attribute operation failed ");
			return null;
		}

		if (Rapid_BootLoader.SCHEMA_INIT) {
			for (int i = 0; i < rj_session.getRj_apps().size(); i++) {
				if (Integer.parseInt(rj_session.getRj_apps().get(i).getProperty("ID")) == appID) {
					this.CurrentApp = rj_session.getRj_apps().get(i);
					flaQ = true;
					break;
				}
			}
		} else {
			log.info("Routine : GetApplication, Fatal Error, DJ_SCHEMA not initialized ");
			return null;
		}
		if (flaQ) {
			return this.CurrentApp;
		}
		log.info("Routine : GetApplication, Application not found");
		return null;
	}

	public ArrayList<Properties> getWindowList(int appID) {
		return WindowHandler.GetWindowObj(appID);
	}

	public Properties getWindow(int windowID) {
		ArrayList<Properties> WindowList = WindowHandler.GetWindowObj(Integer.parseInt(CurrentApp.getProperty("ID")));
		boolean flaQ = false;
		for (int i = 0; i < WindowList.size(); i++) {
			if (Integer.parseInt(WindowList.get(i).getProperty("ID")) == windowID) {
				CurrentWindow = WindowList.get(i);
				flaQ = true;
				break;
			}
		}
		if (flaQ) {
			return CurrentWindow;
		}
		return null;
	}
	
	public ArrayList<Properties> GetApplicationActionList(int appID) {
		return ActionHandler.GetApplicationActionList(appID);
	}
	
	public ArrayList<Properties> GetWindowActionList(int windowID) {
		return ActionHandler.GetWindowActionList(windowID);
	}

	public ArrayList<Properties> GetRapidUserList() {
		RapidCoreMeta rj_session = Rapid_Initializer.Init_RJ_Context();
		if (rj_session == null) {
			log.info("Routine : GetApplication, Getting DJ_SESSION attribute operation failed ");
			return null;
		}
		return rj_session.getRj_users();
	}
}
