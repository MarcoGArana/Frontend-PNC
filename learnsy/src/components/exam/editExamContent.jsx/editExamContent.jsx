import { useState } from "react";
import { createQuestion } from "../../../services/examService";
import CreateResponse from "./createResponse/createResponse";
import { toast } from "react-toastify";

const EditExamContent = ({ idExam }) => {
    const [statement, setStatement] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [resModalOpen, setResModalOpen] = useState(false);
    const [idPreguntaOpcionMultiple, setIdPreguntaOpcionMultiple] = useState(null);

    const previewImage = imageUrl != "" ? imageUrl : "http://localhost:5173/src/assets/images/landscape-placeholder.svg";    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!statement || !imageUrl) {
            toast.error('Por favor ingresa un nombre y una URL de imagen');
            return;
        }

        const questionData = {
            image: imageUrl,
            statement: statement,
            idExam: idExam
        }
        const response = await createQuestion({questionData: questionData});
        console.log(response);
        
        setIdPreguntaOpcionMultiple(response.data.id);
        toast.success('Pregunta creada correctamente!');
    }

    return (
        <div>
            <div className="font-light flex gap-10 min-h-52 items-center">
                <form className="flex flex-col gap-3.5 w-[35rem] justify-center" aria-disabled={idPreguntaOpcionMultiple ? true : false} onSubmit={handleSubmit}>
                    <label>Enunciado</label>
                    <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            type="text"
                            placeholder="statement"
                            value={statement}
                            onChange={(e) => setStatement(e.target.value)}
                            required
                        >
                    </input>
                    <label>Imagen de la pregunta</label>
                    <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            type="url"
                            placeholder="imagen"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        ></input>
                    <button type="submit" className="hidden">Enviar</button>    
                </form>
                <img src={previewImage} className="h-40 contain-content" />
            </div>
                {idPreguntaOpcionMultiple && <button className="rounded cursor-pointer p-1.5 bg-ligthBlue text-white" onClick={() => setResModalOpen(true)}>Crear respuesta</button>}
                {idPreguntaOpcionMultiple && resModalOpen && <CreateResponse idPreguntaOpcionMultiple={idPreguntaOpcionMultiple} onClose={() => setResModalOpen(false)}/>}
        </div>
    )
}

export default EditExamContent