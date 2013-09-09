package org.mycholan.rapidjs.RapidJS;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Properties;

import org.mycholan.rapidjs.factory.db.Rapid_DerbyManager;
import org.mycholan.rapidjs.loader.Rapid_Initializer;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.utils.Rapid_DataAccessUtils;

public class Rapid_ActionHandler {
	private Rapid_ApplicationMetaData AppMetaObj = null;
	Rapid_DataAccessUtils DataAccessUtils = null;
	Rapid_DerbyManager RJDB = null;
	ResultSet RS = null;
	
	public Rapid_ActionHandler() {
		AppMetaObj = Rapid_Initializer.LoadApplicationMeta();
		DataAccessUtils = new Rapid_DataAccessUtils();
		RJDB = new Rapid_DerbyManager();
	}
	
	public ArrayList<Properties> GetApplicationActionList(int appID) {
		ArrayList<Properties> ActionList = null;
		RJDB.GetConnection();
		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_ACTION", "APP_ID", appID, AppMetaObj));
		ActionList = DataAccessUtils.FetchMultiRow("RJ_ACTION", AppMetaObj, RS);

		if (ActionList == null) {
			RJDB.CloseConnection();
			return null;
		}

		RJDB.CloseConnection();
		return ActionList;
	}
	
	public ArrayList<Properties> GetWindowActionList(int windowID) {
		ArrayList<Properties> ActionList = null;
		RJDB.GetConnection();
		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_ACTION", "WINDOW_ID", windowID, AppMetaObj));
		ActionList = DataAccessUtils.FetchMultiRow("RJ_ACTION", AppMetaObj, RS);

		if (ActionList == null) {
			RJDB.CloseConnection();
			return null;
		}

		RJDB.CloseConnection();
		return ActionList;
	}
}
