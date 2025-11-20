import { Link } from "react-router-dom";
import { deleteMateria, updateMateria } from "../../../services/materiaService";
import { useState } from "react";
import { toast } from "react-toastify";
import courseBg from "../../../assets/images/courses-background.png";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Card = ({ data, rol }) => {
  const { id, nombre, imagen: image } = data;
  const [deleted, setDeleted] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(nombre);
  const [imageUrl, setImageUrl] = useState(image);

  const display = deleted ? "hidden" : "";
  const previewImage =
    imageUrl ||
    "http://localhost:5173/src/assets/images/landscape-placeholder.svg";

  const handleDelete = () => {
    deleteMateria({ materiaId: id });
    setDeleted(true);
    Swal.fire({
      icon: "success",
      title: "Materia eliminada",
      text: "Materia eliminada correctamente.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const toggleUpdate = () => setEditable(!editable);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingresa un nombre y una URL de imagen",
      });

      return;
    }

    updateMateria({
      materiaUpdate: { id, nombre: name, imagen: imageUrl, isVisible: true },
    });

    Swal.fire({
      icon: "success",
      title: "Materia actualizada correctamente",
      timer: 1200,
      showConfirmButton: false,
    });

    setEditable(false);
  };

  return (
    <div className={`w-full max-w-full sm:max-w-[480px] mx-auto ${display}`}>

      <div className="border-[2.5px] w-full bg-white/200 rounded-xl shadow-md border-[var(--color-titles-purple)]  relative p-2 sm:p-0">

        {/* If a person is admin this buttoms will be visible */}
        {rol === "admin" && !editable && (
          <div className="absolute right-3 top-3 flex gap-3 z-30">
            <button
              onClick={toggleUpdate}
              className="p-2 bg-fuchsia-300 rounded-full text-white text-base hover:bg-amber-50 transition"
              title="Editar"
            >
              <FaEdit />
            </button>

            <button
              onClick={handleDelete}
              className="p-2 bg-fuchsia-300 rounded-full text-white text-base hover:bg-amber-50 transition"
              title="Eliminar"
            >
              <FaTrashAlt />
            </button>
          </div>
        )}

        {/* Edit mode */}
        {editable && (
          <form onSubmit={handleUpdate} className="p-4 flex flex-col gap-3 items-center">
            <img
              src={previewImage}
              className="w-28 h-28 rounded-full border-[2.5px] border-[var(--color-titles-purple)] object-cover"
            />

            <input
              type="url"
              className="border title-font border-gray-300 p-2 rounded w-full text-[var(--color-border-shadow)] font-light
                  placeholder:text-gray-400 placeholder:font-light"
              placeholder="URL de imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />

            <input
              type="text"
              className="border title-font border-gray-300 p-2 rounded w-full text-[var(--color-border-shadow)] font-light
                  placeholder:text-gray-400 placeholder:font-light"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <button className="btn-primary py-2 rounded w-full">
              Guardar
            </button>
          </form>
        )}

        {/* Normal view */}
        {!editable && (
          <Link to={`./materia/${name}/${id}`} className="block">

            <div className="relative flex flex-wrap items-center gap-0">

              <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden rounded-t-xl z-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${courseBg})`,
                  }}
                />
              </div>

              <div className="relative -ml-10 sm:-ml-12 shrink-0 z-20">
                <img
                  src={imageUrl}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[var(--color-titles-purple)] object-cover bg-white"
                />
              </div>

              <div className="flex-1 z-10">

                <div className="pt-16"></div>

                <div className="py-3 pl-4 text-sm sm:text-base text-[var(--color-titles-purple)] body-font bg-white rounded-b-xl">
                  {name}
                </div>
              </div>

            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
