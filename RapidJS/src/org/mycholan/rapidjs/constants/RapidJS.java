package org.mycholan.rapidjs.constants;

public final class RapidJS {
	public static final class TRANSPORT_PARAM {
        public static final String TARGET = "Target";
        public static final String ACTION = "Action";
        public static final String TABEL = "Tabel";
        public static final String USER = "User";
        public static final String PROJECTIONS = "Projection";
        public static final String SELECTORS = "Selector";
        public static final String SELECTOR_TYPE = "SelectorType";
        public static final String ORDER_BY = "OrderBy";
        public static final String GROUP_BY = "GroupBy";
        public static final String HAVING = "Having";
        public static final String DATA = "Data";
    }
	
	public static class RAPID_ACTION {
		public static final int NEW = 1;
		public static final int CREATE = 2;
		public static final int EDIT = 3;
		public static final int UPDATE = 4;
		public static final int LIST = 5;
		public static final int SHOW = 6;
		public static final int REMOVE = 7;
	}
	
	public static class RAPID__OPERATOR {
		public static final String EQUAL = "=";
		public static final String GREATER_THAN = ">";
		public static final String GREATER_THAN_EQUAL = ">=";
		public static final String LESS_THAN = "<";
		public static final String LESS_THAN_EQUAL = "<=";
		public static final String BETWEEN = "Between";
		public static final String IN = "In";
		public static final String NOT = "Not";
		public static final String LIKE = "Like";
	}
}
