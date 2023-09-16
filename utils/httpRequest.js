import { loading } from "@/redux/reducers/commonReducer";
import { dispatch } from "@/redux/store";

export default async (url, method, data, isMultipart) => {
  try {
    dispatch(loading(true));

    let reqOptions = { method };

    if (isMultipart) {
      reqOptions.body = data;
    } else {
      reqOptions.headers = { "Content-Type": "application/json" };
      reqOptions.body = JSON.stringify(data);
    }
    const result = await fetch(url, reqOptions);
    const response = await result.json();
    dispatch(loading(false));
    return response;
  } catch (error) {
    dispatch(loading(false));
    return { success: false, message: "Internal Server Error" };
  }
};
