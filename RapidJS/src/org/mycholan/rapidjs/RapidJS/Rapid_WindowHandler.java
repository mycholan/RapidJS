package org.mycholan.rapidjs.RapidJS;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.mycholan.rapidjs.factory.db.Rapid_DerbyManager;
import org.mycholan.rapidjs.loader.Rapid_Initializer;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.session.RapidContext;
import org.mycholan.rapidjs.utils.Rapid_DataAccessUtils;

public class Rapid_WindowHandler {
	private Rapid_ApplicationMetaData AppMetaObj = null;
	private Rapid_DataAccessUtils DataAccessUtils = null;
	private Rapid_DerbyManager RJDB = null;
	private RapidContext rContext = null;
	private ResultSet RS = null;

	public Rapid_WindowHandler(RapidContext rcontext) {
		RapidContext rContext = rcontext;
		AppMetaObj = Rapid_Initializer.LoadApplicationMeta();
		DataAccessUtils = new Rapid_DataAccessUtils();
		RJDB = new Rapid_DerbyManager();
	}

	public ArrayList<Properties> GetWindowObj(int appID) {
		ArrayList<Properties> WindowList = new ArrayList<Properties>();
		JSONObject ContainerJson = null;
		RJDB.GetConnection();
		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_WINDOW", "APP_ID", appID, AppMetaObj));
		WindowList = DataAccessUtils.FetchMultiRow("RJ_WINDOW", AppMetaObj, RS);

		if (WindowList == null) {
			RJDB.CloseConnection();
			return null;
		}

		for (int i = 0; i < WindowList.size(); i++) {
			ContainerJson = GetContainerObj(Integer.parseInt(WindowList.get(i).getProperty("ID")), Integer.parseInt(WindowList.get(i).getProperty("CONTAINER_TYPE")));

			if (ContainerJson == null) {
				RJDB.CloseConnection();
				return null;
			}

			WindowList.get(i).put("ContainerList", ContainerJson);
			ContainerJson = null;
		}

		RJDB.CloseConnection();
		return WindowList;
	}

	private JSONObject GetContainerObj(int windowID, int containerType) {
		Properties ContainerObj = new Properties();
		ArrayList<Properties> ContainerList = new ArrayList<Properties>();
		JSONObject LayoutJson = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_CONTAINER", "WINDOW_ID", windowID, AppMetaObj));
		ContainerList = DataAccessUtils.FetchMultiRow("RJ_CONTAINER", AppMetaObj, RS);

		if (ContainerList == null) {
			return null;
		}

		for (int i = 0; i < ContainerList.size(); i++) {
			LayoutJson = GetLayoutObj(Integer.parseInt(ContainerList.get(i).getProperty("ID")));

			if (LayoutJson == null) {
				return null;
			}

			ContainerList.get(i).put("layout", LayoutJson);
			LayoutJson = null;
		}

		JSONArray jArray = JSONArray.fromObject(ContainerList);		
		ContainerObj.put("CONTAINERS", jArray);
		ContainerObj.put("COUNT", String.valueOf(ContainerList.size()));
		ContainerObj.put("TYPE", String.valueOf(containerType));

		JSONObject jObject = JSONObject.fromObject(ContainerObj);
		return jObject;
	}

	private JSONObject GetLayoutObj(int containerID) {
		Properties layoutObj = null;
		JSONArray ToolbarJson = null;
		JSONObject ViewJson = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_LAYOUT", "CONTAINER_ID", containerID, AppMetaObj));
		layoutObj = DataAccessUtils.FetchSingleRow("RJ_LAYOUT", AppMetaObj, RS);

		if (layoutObj == null) {
			return null;
		}

		ToolbarJson = GetToolbarObj(Integer.parseInt(layoutObj.getProperty("ID")));
		if (ToolbarJson == null) {
			return null;
		}

		ViewJson = GetViewObj(Integer.parseInt(layoutObj.getProperty("ID")));
		if (ViewJson == null) {
			return null;
		}

		layoutObj.put("ToolbarObject", ToolbarJson);
		layoutObj.put("ViewObject", ViewJson);

		JSONObject jObject = JSONObject.fromObject(layoutObj);
		return jObject;
	}

	private JSONArray GetToolbarObj(int layoutID) {
		ArrayList<Properties> ToolBarList = new ArrayList<Properties>();
		JSONArray ToolItemJson = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_TOOLBAR", "LAYOUT_ID", layoutID, AppMetaObj));
		ToolBarList = DataAccessUtils.FetchMultiRow("RJ_TOOLBAR", AppMetaObj, RS);

		if (ToolBarList == null) {
			return null;
		}

		for (int i = 0; i < ToolBarList.size(); i++) {
			ToolItemJson = GetToolbarItemObj(Integer.parseInt(ToolBarList.get(i).getProperty("ID")));

			if (ToolItemJson == null) {
				return null;
			}

			ToolBarList.get(i).put("ToolItem", ToolItemJson);
			ToolItemJson = null;
		}

		JSONArray jArray = JSONArray.fromObject(ToolBarList);
		return jArray;
	}

	private JSONArray GetToolbarItemObj(int toolbarID) {
		ArrayList<Properties> ToolItemList = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_TOOLITEM", "TOOLBAR_ID", toolbarID, AppMetaObj));
		ToolItemList = DataAccessUtils.FetchMultiRow("RJ_TOOLITEM", AppMetaObj, RS);

		if (ToolItemList == null) {
			return null;
		}

		JSONArray jArray = JSONArray.fromObject(ToolItemList);
		return jArray;
	}

	private JSONObject GetViewObj(int layoutID) {
		Properties viewObj = null;
		JSONArray ControlJson = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_VIEW", "LAYOUT_ID", layoutID, AppMetaObj));
		viewObj = DataAccessUtils.FetchSingleRow("RJ_VIEW", AppMetaObj, RS);

		if (viewObj == null) {
			return null;
		}

		ControlJson = GetControls(Integer.parseInt(viewObj.getProperty("ID")));
		if (ControlJson == null) {
			return null;
		}

		viewObj.put("ViewItem", ControlJson);
		JSONObject jObject = JSONObject.fromObject(viewObj);

		return jObject;
	}

	private JSONArray GetControls(int viewID) {
		ArrayList<Properties> ControlList = null;

		RS = RJDB.ExecuteQuery(DataAccessUtils.ConstructSelectQuery_App("RJ_CONTROL", "VIEW_ID", viewID, AppMetaObj));
		ControlList = DataAccessUtils.FetchMultiRow("RJ_CONTROL", AppMetaObj, RS);

		if (ControlList == null) {
			return null;
		}

		JSONArray jArray = JSONArray.fromObject(ControlList);
		return jArray;
	}
}
