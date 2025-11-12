export const TypeOptions = ["Select Type", "Expense", "Income"];
export const DownloadOptions = ["Download", "PDF", "CSV"];

export const CategoryExpenseOptions = [
  "Select Category",
  "Food & Dining",
  "Transportation",
  "Housing",
  "Entertainment",
  "Bills & Utilities",
  "Health & Fitness",
  "Shopping",
  "Travel",
  "Education",
  "Personal Care",
  "Insurance",
  "Miscellaneous",
];

export const CategoryIncomeOptions = [
  "Select Category",
  "Salary",
  "Business",
  "Investments",
  "Gifts",
  "Rental",
  "Refunds",
];

export const CategoryExpenseObject = [
  { type: "food_dining", label: "Food & Dining" },
  { type: "transportation", label: "Transportation" },
  { type: "entertainment", label: "Entertainment" },
  { type: "housing", label: "Housing" },
  { type: "bills_utilities", label: "Bills & Utilities" },
  { type: "health_fitness", label: "Health & Fitness" },
  { type: "shopping", label: "Shopping" },
  { type: "travel", label: "Travel" },
  { type: "education", label: "Education" },
  { type: "personal_care", label: "Personal Care" },
  { type: "insurance", label: "Insurance" },
  { type: "miscellaneous", label: "Miscellaneous" },
];

export enum AuthCode {
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_ERROR = "SIGNUP_ERROR",
  USER_NOT_REGISTERED = "USER_NOT_REGISTERED",
  USER_IS_ALREADY_VERIFIED = "USER_IS_ALREADY_VERIFIED",
  VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS",
  VERIFY_USER_ERROR = "VERIFY_USER_ERROR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
  GET_CUURENT_USER_ERROR = "GET_CUURENT_USER_ERROR",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  RESET_LINK_SENT = "RESET_LINK_SENT",
  SAME_AS_OLD_PASSWORD = "SAME_AS_OLD_PASSWORD",
  PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS",
  INVALID_OR_EXPIRED_TOKEN = "INVALID_OR_EXPIRED_TOKEN",
  PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS",
}

export enum TransactionCode {
  ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS",
  ADD_TRANSACTION_ERROR = "ADD_TRANSACTION_ERROR",
  DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS",
  DELETE_TRANSACTION_ERROR = "DELETE_TRANSACTION_ERROR",
  GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS",
  GET_TRANSACTIONS_ERROR = "GET_TRANSACTIONS_ERROR",
  UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS",
  UPDATE_TRANSACTION_ERROR = "UPDATE_TRANSACTION_ERROR",
}
