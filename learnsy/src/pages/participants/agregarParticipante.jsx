import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUserByName } from "../../services/materiaService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AgregarParticipante = () => {
  const { materiaId } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  {/* Implementación de sweet alert con personalizacion de colores botones */}
  const result = await Swal.fire({
    title: "¿Estás seguro que deseas agregar al participante?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    customClass: {
      confirmButton: "btn-primary px-6 py-2 rounded-lg",
      cancelButton: "btn-secondary px-6 py-2 rounded-lg",
      actions: "flex gap-4 justify-center",
    },
       buttonsStyling: false,
  });

  if (result.isConfirmed) {
    await addUserByName({ userName, materiaId });
    Swal.fire({
      icon: "success",
      title: "Participante agregado",
      timer: 1500,
      showConfirmButton: false,
    });
    navigate(-1);
  }
};

  return (
    <div className="w-full flex justify-center px-4 mt-6 pb-20">

      {/* Tarjeta principal */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-300 px-8 py-12 md:px-16 md:py-14">

        {/* Titulo */}
        <h1 className="text-center text-3xl md:text-4xl title font-medium uppercase mb-12">
          Añadir Participante
        </h1>

        {/* Formulario con campos */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10">

          <div className="w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-1 md:space-x-1">
            <label className="font-semibold body text-medium md:w-[28%]">
              Nombre del usuario:
            </label>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ejemplo: marcoarana"
              className="
                w-full
                md:flex-1
                md:ml-0
                border border-gray-300
                rounded-md
                px-4 py-2.5
                bg-gray-100
                title-font font-light
                text-[var(--color-border-shadow)]
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-purple-400
              "
            />
          </div>

          {/* Botones */}
          <div className="flex gap-8 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary py-2 px-10 rounded-lg transition min-w-[140px]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-primary py-2 px-10 rounded-lg transition min-w-[140px]"
            >
              Añadir
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AgregarParticipante;
