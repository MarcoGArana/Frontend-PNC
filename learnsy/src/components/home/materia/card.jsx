import { Link } from "react-router-dom";
import { deleteMateria, updateMateria } from "../../../services/materiaService";
import { useState } from "react";
import { toast } from "react-toastify";

const Card = ({ data, rol }) => {
  const { id, nombre, imagen: image } = data;
  const [deleted, setDeleted] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(nombre);
  const [imageUrl, setImageUrl] = useState(image);

  const display = deleted ? "hidden" : "";
  const previewImage = imageUrl != "" ? imageUrl : "http://localhost:5173/src/assets/images/landscape-placeholder.svg"; 

  const handleDelete = () => {
    try {
      deleteMateria({ materiaId: id });
      setDeleted(true);
      toast.success('Materia eliminada correctamente!');

    } catch (error) {
      console.log(error);

    }
  }

  const toggleUpdate = () => {
    setEditable((state) => !state);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !imageUrl) {
      toast.error('Por favor ingresa un nombre y una URL de imagen');
      return;
    }

    updateMateria(
      {
        materiaUpdate: {
          id: id,
          nombre: name,
          isVisible: true,
          imagen: imageUrl
        }
      });

    toast.success('Materia actualizada correctamente!');
    setEditable(false);
  }

  return (
    <div className={`grid ${display}`}>

      {rol == 'admin' && (
        <div className="flex gap-0.5 relative justify-end -bottom-7">
          <button className="cursor-pointer" onClick={toggleUpdate}>
            <svg xmlns="http://www.w3.org/2000/svg" id="delete" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
          </button>
          <button className="cursor-pointer" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" id="modify" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
          </button>
        </div>
      )}

      {editable && (
        <form onSubmit={handleUpdate} className="flex h-44">
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
      )}

      {!editable && (
        <Link to={`./materia/${name}/${id}`} className="flex h-44">
          <div className="w-1/10">
            <img src={`${imageUrl}`} className="w-44 h-44 rounded-full absolute border-primary border-4 border-solid bg-white" />
          </div>
          <div className="w-5xl">
            <div className="h-1/5 w-full"></div>
            <div className="h-2/5 w-full border-r-4 border-t-4 border-primary border-solid bg-[url(https://cdn.pixabay.com/photo/2024/05/30/08/48/pattern-8798134_1280.png)]"></div>
            <div className="h-2/5 w-full border-b-4 border-r-4 border-primary border-solid flex items-center pl-24 text-2xl">
              {name}
            </div>
          </div>
        </Link>
      )}

    </div>
  )
}

export default Card;