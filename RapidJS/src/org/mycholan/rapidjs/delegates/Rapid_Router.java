package org.mycholan.rapidjs.delegates;

import org.mycholan.rapidjs.factory.guards.Rapid_CredentialManager;
import org.mycholan.rapidjs.factory.guards.Rapid_StarterApp;
import org.mycholan.rapidjs.meta.handlers.Rapid_MetaAction;
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
		Rapid_CredentialManager credentialManager = null;
		Rapid_StarterApp starterApp = null;
		Rapid_MetaAction metaAction = null;

		if (rContext.getRequestModel().getRjType().equals("RJS")) {
			starterApp = new Rapid_StarterApp(rContext);
			credentialManager = new Rapid_CredentialManager(rContext);

			if (rContext.getRequestModel().getAction().equals("INIT")) {
				responseStr = starterApp.StartAdmin();
			} else if (rContext.getRequestModel().getAction().equals("LOGIN")) {
				responseStr = credentialManager.doLogin();
			} else if (rContext.getRequestModel().getAction().equals("LOGOUT")) {
				responseStr = credentialManager.doLogout();
			}
		} else if (rContext.getRequestModel().getRjType().equals("META")) {
			metaAction = new Rapid_MetaAction(rContext);
			if (rContext.getRequestModel().getAction().equals("GET")) {
				System.out.println("ActionRouter, META, GET");
				responseStr = metaAction.doMetaAction();
			} else if (rContext.getRequestModel().getAction().equals("CHECK")) {

			}
		} else if (rContext.getRequestModel().getRjType().equals("FACTORY")) {
			if (rContext.getRequestModel().getAction().equals("GET")) {

			} else if (rContext.getRequestModel().getAction().equals("NEW")) {

			} else if (rContext.getRequestModel().getAction().equals("SAVE")) {

			} else if (rContext.getRequestModel().getAction().equals("DELETE")) {

			} else if (rContext.getRequestModel().getAction().equals("CHECK")) {

			}
		} else if (rContext.getRequestModel().getRjType().equals("APP")) {
			if (rContext.getRequestModel().getAction().equals("NEW")) {

			} else if (rContext.getRequestModel().getAction().equals("SAVE")) {

			} else if (rContext.getRequestModel().getAction().equals("DELETE")) {

			} else if (rContext.getRequestModel().getAction().equals("GET")) {

			} else if (rContext.getRequestModel().getAction().equals("CHECK")) {

			}
		}

		return responseStr;
	}
}
