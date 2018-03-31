import {environment} from "../../environments/environment";

export const URLS: any = {
  BASE_URL: environment.baseUrl,
  LOGIN: "users/login",
  LOGOUT: "users/logout",
  EDIT_USER_DETAILS: "users/edit",
  ADD_COMPANY: "users/add_company",
  LOAD_DATA: "users/load_data",
  ASK_QUERY: "users/ask_query",
  APPLY_FOR_LOAN: "users/apply_for_loan"
};

export const KEYS: any = {
  ACCESS_TOKEN: "access_token",
  USER: "user",
};
