package org.mycholan.rapidjs.loader;

import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.model.Rapid_FactoryMetaData;
import org.mycholan.rapidjs.session.RapidCoreMeta;

/**
 * 
 * @author saravana
 * @usage Initialize factory and app meta data from 'app.json' and 'factory.json'. 
 * 			finally init RapidContext session object (which holds list of all applications, roles, access, users and datasources).
 *
 */
public class Rapid_Initializer {
	private static Rapid_ApplicationMetaData RJ_APP_META = null;
	private static Rapid_FactoryMetaData RJ_FACTORY_META = null;
	private static RapidCoreMeta RAPID_APP_SESSION = null;

	/*Load Initial Factory meta data from factory.json (if not already initialized)*/
	public static synchronized Rapid_FactoryMetaData LoadFactoryMeta() {
		if (RJ_FACTORY_META == null) {
			RJ_FACTORY_META = org.mycholan.rapidjs.meta.dao.Rapid_InitSchema.InitFactorySchema();
		}
		return RJ_FACTORY_META;
	}

	/*Load Initial Application meta data from app.json (if not already initialized)*/
	public static synchronized Rapid_ApplicationMetaData LoadApplicationMeta() {
		if (RJ_APP_META == null) {
			RJ_APP_META = org.mycholan.rapidjs.meta.dao.Rapid_InitSchema.InitApplicationSchema();
		}
		return RJ_APP_META;
	}

	/*Load RapidContext */
	public static synchronized RapidCoreMeta Init_RJ_Context() {
		if (RAPID_APP_SESSION == null) {
			Rapid_ContextLoader rjContextLoader = new Rapid_ContextLoader(LoadApplicationMeta(), LoadFactoryMeta());
			RAPID_APP_SESSION = rjContextLoader.InitApplicationSession();
		}
		return RAPID_APP_SESSION;
	}
}
