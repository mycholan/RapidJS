package org.mycholan.rapidjs.delegates;

import org.mycholan.rapidjs.application.handler.Rapid_ApplicationActionHandler;
import org.mycholan.rapidjs.factory.guards.Rapid_CredentialManager;
import org.mycholan.rapidjs.factory.guards.Rapid_StarterApp;
import org.mycholan.rapidjs.factory.handler.Rapid_FactoryActionHandler;
import org.mycholan.rapidjs.meta.handlers.Rapid_MetaActionHandler;
import org.mycholan.rapidjs.session.RapidContext;

/**
 * 
 * @author saravana
 * @usage Entire request response response transaction will go through this
 *        class It's get rerouted according to the request Type and Action Type.
 * 
 */
public class Rapid_Router {
	private RapidContext rContext = null;

	public Rapid_Router(RapidContext rcontext) {
		rContext = rcontext;
	}

	public String ActionRouter() {
		String responseStr = "";
		
		if (rContext.getRequestModel().getTarget().equals("RJS")) {
			Rapid_StarterApp starterApp = new Rapid_StarterApp(rContext);
			Rapid_CredentialManager credentialManager = new Rapid_CredentialManager(rContext);

			if (rContext.getRequestModel().getAction().equals("INIT")) {
				responseStr = starterApp.StartAdmin();
			} else if (rContext.getRequestModel().getAction().equals("LOGIN")) {
				responseStr = credentialManager.doLogin();
			} else if (rContext.getRequestModel().getAction().equals("LOGOUT")) {
				responseStr = credentialManager.doLogout();
			}
		} else if (rContext.getRequestModel().getTarget().equals("META")) {
			Rapid_MetaActionHandler metaAction = new Rapid_MetaActionHandler(rContext);
			if (rContext.getRequestModel().getAction().equals("GET")) {				
				responseStr = metaAction.doMetaAction();
			} else if (rContext.getRequestModel().getAction().equals("CHECK")) {

			}
		} else if (rContext.getRequestModel().getTarget().equals("FACTORY")) {
			Rapid_FactoryActionHandler factoryActionHandler = new Rapid_FactoryActionHandler(rContext);
			responseStr = factoryActionHandler.doAction();
		} else if (rContext.getRequestModel().getTarget().equals("APP")) {
			Rapid_ApplicationActionHandler appActionHandler = new Rapid_ApplicationActionHandler(rContext);
			responseStr = appActionHandler.doAction();
		}

		return responseStr;
	}
}
