import axios from "axios";

export const getContactdetails = async (userId, contactId, filters) => {
  console.log(filters)
  const response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}/contactdetail`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: filters,
    }
  );
  return response;
};

export const createContactdetail = async (userId, contactId, contactdetailType,	contactdetailValue) => {
  const response = await axios.post(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}/contactdetail`,
    { contactdetailType,	contactdetailValue },
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const updateContactdetail = async (userId, contactId, contactdetailId, body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}/contactdetail/${contactdetailId}`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const deleteContactdetail = async (userId, contactId,contactdetailId) => {
  const response = await axios.delete(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}/contactdetail/${contactdetailId}`,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};
