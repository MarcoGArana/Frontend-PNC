import API from "./globalRequestInterceptor";

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { identifier: email, password }, {
  withCredentials: true
});
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get('/user/whoami');
  return response.data;
};

export const changeAvatar = async ({avatar}) => {
  try {
    const response = await API.patch(`/user/changeAvatar?avatar=${avatar}`);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}

export const getGrades = async ({materiaId, userId}) => {
  const response = await API.get(`/usuarioxexamen/${materiaId}/${userId}`);
  return response.data;
};