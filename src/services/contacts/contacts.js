import axios from "axios";

export const getContacts = async (userId, filters) => {
  console.log(filters)
  const response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: filters,
    }
  );
  return response;
};

export const createContact = async (userId, firstName, lastName) => {
  const response = await axios.post(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact`,
    { firstName, lastName },
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const updateContact = async (userId, contactId, body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const deleteContact = async (userId, contactId) => {
  const response = await axios.delete(
    `http://127.0.0.1:20200/api/v1/user/${userId}/contact/${contactId}`,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};
