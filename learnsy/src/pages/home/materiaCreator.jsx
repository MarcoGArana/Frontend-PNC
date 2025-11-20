import { useState } from "react";
import { saveMateria } from "../../services/materiaService";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MateriaCreator = () => {
  const userId = useAuthStore((state) => state.user?.usuarioId);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const preview =
    imageUrl ||
    "http://localhost:5173/src/assets/images/landscape-placeholder.svg";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingresa un nombre y una URL de imagen",
      });
      return;
    }

    saveMateria({
      materiaData: { nombre: name, imagen: imageUrl },
      userId,
    });



    Swal.fire({
      icon: "success",
      title: "¡Materia creada!",
      text: "La materia fue creada correctamente.",
      timer: 1200,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className="flex justify-center items-start px-3 sm:px-4 pt-6 pb-20">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-4xl bg-white shadow-xl rounded-2xl
          border border-gray-200 
          px-6 py-8 sm:px-10 sm:py-12
          flex flex-col gap-10
        "
      >

        <h1 className="text-center text-2xl sm:text-3xl title">
          CREAR UN NUEVO CURSO
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-center">

          <div className="flex justify-center">
            <img
              src={preview}
              className="
                w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48
                rounded-full object-cover
                border-[3px] border-[var(--color-titles-purple)]
              "
            />
          </div>

          {/* Form fields*/}
          <div className="md:col-span-2 flex flex-col gap-6">

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm body">
                Nombre del curso:
              </label>
              <input
                type="text"
                placeholder="Ejemplo: Programación declarativa"
                className="
                  border title-font border-gray-300 p-2 rounded-lg w-full
                  text-[var(--color-border-shadow)] font-light
                  placeholder:text-gray-400 placeholder:font-light
                "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm body">
                URL de imagen de portada:
              </label>
              <input
                type="url"
                placeholder="Ejemplo: https://imagen.com/curso.png"
                className="
                  border title-font border-gray-300 p-2 rounded-lg w-full
                  text-[var(--color-border-shadow)] font-light
                  placeholder:text-gray-400 placeholder:font-light
                "
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* Buttoms */}
        <div className="
          flex gap-4 pt-2 
          justify-center md:justify-end 
          md:pr-[10px]
        ">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary py-2 px-8 rounded-lg transition min-w-[160px]"
          >
            CANCELAR
          </button>

          <button
            type="submit"
            className="btn-primary py-2 px-8 rounded-lg transition min-w-[160px]"
          >
            CREAR CURSO
          </button>
        </div>

      </form>
    </div>
  );
};

export default MateriaCreator;
