package org.mycholan.rapidjs.utils;

import java.util.List;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.mycholan.rapidjs.constants.RapidJS;
import org.mycholan.rapidjs.model.Rapid_ParamModel;

/**
 * 
 * @author Saravana Kumar K
 * @purpose mapping the json parameter coming from the browser to Rapid_ParamModel
 * 
 */
public class Rapid_ParseParameter {
	 List<String> list = null;
     String PARAM = null;
     JSONObject jObj = null;
     JSONArray jColumnKey = null;
     JSONArray jSelectorsKeys = null;
     JSONArray jSelectorsValues = null;
     JSONArray jOrderByKeys = null;
     JSONArray jContains = null;

     public Rapid_ParseParameter(String parameter) {
          PARAM = parameter;
     }

     public Rapid_ParamModel GetParameter() {
          Rapid_ParamModel RPM = new Rapid_ParamModel();
          try {
               jObj = new JSONObject(PARAM);
              
               jColumnKey = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.PROJECTIONS);
               jSelectorsKeys = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.SELECTOR_KEYS);  
               jSelectorsValues = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.SELECTOR_VALUES);  
               jOrderByKeys = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.ORDER_BY_PROJECTION);
               jContains = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.CONTAINS);

               RPM.setTarget(jObj.getString(RapidJS.TRANSPORT_PARAM.TARGET));
               RPM.setTable(jObj.getString(RapidJS.TRANSPORT_PARAM.TABEL));
               RPM.setAction(jObj.getString(RapidJS.TRANSPORT_PARAM.ACTION));               
               RPM.setUser(jObj.getString(RapidJS.TRANSPORT_PARAM.USER));
             
               RPM.setProjection(jArrayToStringArray(jColumnKey));                 
             
               RPM.setSelectorKeys(jArrayToStringArray(jSelectorsKeys));              
               RPM.setSelectorValues(jArrayToStringArray(jSelectorsValues));               
               RPM.setSelectorType(jObj.getString(RapidJS.TRANSPORT_PARAM.SELECTOR_TYPE));
               
               RPM.setOperator(jObj.getString(RapidJS.TRANSPORT_PARAM.OPERATOR));
               RPM.setRange(jObj.getString(RapidJS.TRANSPORT_PARAM.RANGE));
               RPM.setContains(jArrayToStringArray(jContains));
                          
               RPM.setOrderByProjection(jArrayToStringArray(jOrderByKeys));               
               RPM.setOrderByType(jObj.getString(RapidJS.TRANSPORT_PARAM.ORDER_BY_TYPE));
               
               RPM.setPage(jObj.getInt(RapidJS.TRANSPORT_PARAM.PAGE));
               RPM.setCount(jObj.getInt(RapidJS.TRANSPORT_PARAM.COUNT));
               
               RPM.setData(jObj.getString(RapidJS.TRANSPORT_PARAM.DATA));

          } catch (JSONException e) {
               e.printStackTrace();
               return null;
          }

          return RPM;
     }

     private String[] jArrayToStringArray(JSONArray jArray) throws JSONException {
          String[] array = new String[jArray.length()];
          for (int i = 0; i < jArray.length(); i++) {
               array[i] = jArray.getString(i);
          }
          return array;
     }
}
