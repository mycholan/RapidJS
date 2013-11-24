package org.mycholan.rapidjs.utils;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.mycholan.rapidjs.constants.RapidConstants;
import org.mycholan.rapidjs.constants.RapidJS;
import org.mycholan.rapidjs.model.Rapid_ParamModel;

/**
 * 
 * @author Saravana Kumar K
 * @purpose mapping the json parameter coming from the browser to Rapid_ParamModel
 * 
 */
public class Rapid_ParseParameter {
     String PARAM = null;
     JSONObject jObj = null;
     JSONArray jColumnKey = null;
     JSONArray jSelectors = null;     

     public Rapid_ParseParameter(String parameter) {
          PARAM = parameter;
     }

     public Rapid_ParamModel GetParameter() {
          Rapid_ParamModel RPM = new Rapid_ParamModel();
          try {
               jObj = new JSONObject(PARAM);
              
               jColumnKey = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.PROJECTIONS);
               jSelectors = jObj.getJSONArray(RapidJS.TRANSPORT_PARAM.SELECTORS);    

               RPM.setTarget(jObj.getString(RapidJS.TRANSPORT_PARAM.TARGET));
               RPM.setTable(jObj.getString(RapidJS.TRANSPORT_PARAM.TABEL));
               RPM.setAction(jObj.getString(RapidJS.TRANSPORT_PARAM.ACTION));               
               RPM.setUser(jObj.getString(RapidJS.TRANSPORT_PARAM.USER));
             
               List<String> list = new ArrayList<String>();
               for (int i=0; i<jColumnKey.length(); i++) {
                   list.add( jColumnKey.getString(i) );
               }
               RPM.setProjection(list.toArray(new String[list.size()]));
               
               RPM.setSelectorType(RapidJS.TRANSPORT_PARAM.SELECTOR_TYPE);
               
               	
               RPM.setWhereKey(jArrayToStringArray(jWhereKey));
               RPM.setWhereValue(jArrayToStringArray(jWhereValue));
               RPM.setColumnKey(jArrayToStringArray(jColumnKey));
               RPM.setColumnValue(jObj.getString("COLUMN_VALUE"));
               RPM.setStartIndex(jObj.getInt("START_INDEX"));
               RPM.setEndIndex(jObj.getInt("RESULT_COUNT"));
               

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
