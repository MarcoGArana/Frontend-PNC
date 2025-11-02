import API from "./globalRequestInterceptor";

export const getMaterias = async () => {
  try {
    const response = await API.get('/materia');
    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const getMateriaById = async ({ id }) => {
  try {
    const exams = await API.get(`/materia/${id}/exams`);
    const topics = await API.get(`/materia/${id}/temas`);

    const response = {
      examenes: exams.data,
      temas: topics.data
    }

    return response;
  } catch (error) {
    console.log(error);

  }
}

export const saveMateria = async ({ materiaData, userId }) => {
  try {
    const response = await API.post('/materia', materiaData);
    if (response.data.status == 201) {
      await addUser({
        materiaId: response.data.data.id,
        userId: userId
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const addUser = async ({ materiaId, userId }) => {
  try {
    const response = await API.post(`/materia/${materiaId}/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const deleteMateria = async ({ materiaId }) => {
  try {
    const response = await API.delete(`/materia/${materiaId}`);
    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const updateMateria = async ({ materiaUpdate }) => {
  try {
    const response = await API.put(`/materia`, materiaUpdate);
    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const getMateriaWithDetails = async ({ materiaId }) => {
  try {
    const response = await API.get(`/materia/${materiaId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);

  }
}

export const getPdf = async (id) => {
  try {
    const response = await API.get(`/tema/${id}/archivo/view`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');

    setTimeout(() => URL.revokeObjectURL(url), 1000);

  } catch (error) {
    console.log(error);

  }
}

export const savePdf = async ({ nombre, file: archivo, materiaId }) => {
  try {
    const response = await API.post(`/tema/${materiaId}?nombre=${encodeURIComponent(nombre)}&visibilidad=true`, archivo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);

  }
}

export const deleteTema = async ({ temaId }) => {
  try {
    const response = await API.delete(`/tema/${temaId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addUserByName = async ({ userName, materiaId }) => {
  try {
    const user = await API.get(`/user/${userName}`);
    console.log(user);
    
    const response = addUser({ materiaId: materiaId, userId: user.data.data.usuarioId });
    return response;
  } catch (error) {
    console.log(error);
  }
} 