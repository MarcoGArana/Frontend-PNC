import API from './globalRequestInterceptor';

export const getExam = async ({ materiaId, examId }) => {
  try {
    const response = await API.get(`/materia/${materiaId}/exams`);
    return response.data.data.find((exam) => exam.id == examId);
  } catch (error) {
    console.log(error);

  }
};

export const beginExam = async ({ examId, userId }) => {
  try {
    const response = await API.post(`/usuarioxexamen`, 
      {
        examId: examId,
        userId: userId
      }
    )

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const completeExam = async ({ examId, userId, calificacion }) => {
  try {
    const response = await API.put(`/usuarioxexamen`, 
      {
        examId: examId,
        userId: userId,
        calificacion: calificacion
      }
    )

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getGradesByMateria = async ({ materiaId, userId }) => {
  try {
    const response = await API.get(`/usuarioxexamen/${materiaId}/${userId}`)

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const createExam = async ({ examData }) => {
  try {
    const response = await API.post(`/exam`, examData);

    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const createQuestion = async ({ questionData }) => {
  try {
    const response = await API.post(`/question`, questionData)

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const createAnswer = async ({ ansData }) => {
  try {
    const response = await API.post(`/response`, ansData)

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const createQuestionWithAnswers = async ({ questionData }, [...answers]) => {
  try {
    
    const responseQuestion = await createQuestion({questionData: questionData});

    //RIP Peticiones :'(
    
    answers.forEach(async (e, i) => {
      e.idPreguntaOpcionMultiple = responseQuestion.data.id;
      await createAnswer({ansData: e});
    })

    return responseQuestion;
  } catch (error) {
    console.log(error);
  }
}

export const deleteExam = async ({ examId }) => {
  try {
    const response = await API.delete(`/exam/${examId}`);

    return response.data;
  } catch (error) {
    console.log(error);

  }
}

export const updateQuestion = async ({ questionData }) => {
  try {
    const response = await API.put(`/question`, questionData)

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateAnswer = async ({ ansData }) => {
  try {
    const response = await API.put(`/response`, ansData)

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestionWithAnswers = async ({ questionData }, [...answers]) => {
  try {
    answers.forEach(async (e) => {
      await updateAnswer({ansData: e});
    })
    
    const responseQuestion = await updateQuestion({questionData: questionData});  
    
    return responseQuestion.data;
  } catch (error) {
    console.log(error);
  }
}