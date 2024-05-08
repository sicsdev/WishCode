import axiosConfig from "../base_url/config";

export const getRequestApi = async (ep) => {
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };
  try {
    let response = await axiosConfig.get(ep, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const postRequestAPi = async (url, payLoad) => {
  const tokens = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens}`,
    },
  };

  try {
    const { data } = await axiosConfig.post(url, payLoad, config);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const isUserPermission = (permissions, check_slug) => {
  if (permissions.length > 0) {
    const finalValue = permissions.find((x) => x.slug == check_slug);
    if (finalValue) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

  // Function to strip HTML tags
export const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };