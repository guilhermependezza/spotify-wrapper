const API_TOKEN = 'BQBwsrgM14U7ZbQQ-MhfqpgHottReHkNKKZvPuoruoN5AVHmn-9USuqi9Ot1n6ieoT6d7UstBnvk6SHv8EpEiQL2WyjSrK-cHOtUAWRq1yUtAblvZ-Hvx5a_QNKA-6zawDbdU0ZArOzT';

const authHeaders = {
  headers: {
    authorization: `Bearer ${API_TOKEN}`
  }
};

const makeAuthHeader = () => authHeaders;

export default makeAuthHeader;
