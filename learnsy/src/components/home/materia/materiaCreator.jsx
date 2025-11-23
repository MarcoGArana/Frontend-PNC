import { useState } from "react";
import { saveMateria } from "../../../services/materiaService";
import { toast } from "react-toastify";
import previa from "../../../../src/assets/images/landscape-placeholder.svg";

const MateriaCreator = ({ userId }) => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const previewImage = imageUrl != "" ? imageUrl : previa;    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !imageUrl) {
            toast.error('Por favor ingresa un nombre y una URL de imagen');
            return;
        }

        saveMateria(
            {
                materiaData: {
                    nombre: name,
                    imagen: imageUrl
                }, 
                userId: userId
            });

        toast.success('Materia creada correctamente!');
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="flex h-44">
                <div className="w-1/10">
                    <img src={previewImage} className="w-44 h-44 rounded-full absolute border-primary border-4 border-solid bg-white" />
                </div>
                <div className="w-5xl">
                    <div className="h-1/5 w-full"></div>
                    <input className="h-2/5 w-full border-r-4 border-t-4 border-b-2 border-primary border-solid flex items-center pl-24"
                        type="url"
                        placeholder="imagen"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    ></input>
                    <input className="h-2/5 w-full border-b-4 border-r-4 border-primary border-solid flex items-center pl-24 text-2xl"
                        type="text"
                        placeholder="nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    >
                    </input>
                    <button type="submit" className="hidden">Enviar</button>
                </div>
            </form>
        </>
    );
}

export default MateriaCreator;