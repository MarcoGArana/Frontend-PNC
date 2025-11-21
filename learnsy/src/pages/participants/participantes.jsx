import { useQuery } from "@tanstack/react-query";
import { getMateriaWithDetails } from "../../services/materiaService";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Participantes = () => {
  const { materiaId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
 
  const [search, setSearch] = useState("");

  const { data: content, isPending } = useQuery({
    queryKey: ["materiaDetails", materiaId],
    queryFn: () => getMateriaWithDetails({ materiaId }),
  });

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-2 px-4 pb-18">

      {/* Tarjeta con el titulo de la materia */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 px-6 py-10">
        {!isPending && (
          <h1 className="text-center text-3xl md:text-4xl title font-medium uppercase">
            {content?.nombre}
          </h1>
        )}
      </div>

      {/* Contenido (tarjeta) con lista de participantes */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 p-6 md:p-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h2 className="text-2xl title font-light">PARTICIPANTES</h2>

          {/* Buscador (search bar) */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full 
                border border-gray-300 
                rounded-md 
                px-4 py-2 pr-10
                title-font font-light
                text-[var(--color-border-shadow)]
                placeholder:text-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-300
                transition
              "
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Boton agregar participante */}
          {user?.rol === "admin" && (
            <button
              onClick={() =>
                navigate(`/dashboard/materia/${materiaId}/agregar-participante`)
              }
              className="btn-primary py-2.5 px-4 rounded-md transition min-w-[110px]  text-base "
            >
              AGREGAR PARTICIPANTE
            </button>
          )}
        </div>

        {/* Tabla con los datos */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="body text-base text-center">
                <th className="pb-3"></th>
                <th className="pb-3">Nombre / Apellido</th>
                <th className="pb-3">Correo</th>
              </tr>
            </thead>

            <tbody>
              {!isPending &&
                [...content?.usuarios]
                  .filter(
                    (u) =>
                      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
                      u.email.toLowerCase().includes(search.toLowerCase())
                  )
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((u, index) => (
                    <tr
                      key={u.id}
                      className={`${
                        index % 2 === 0 ? "bg-[#EFE9FF]" : "bg-white"
                      } text-center`}
                    >
                      {/* Foto */}
                      <td className="p-4">
                        <div className="flex justify-center">
                          <img
                            src={u.avatar}
                            className="
                              w-14 h-14 rounded-full object-cover 
                              border-[2px] border-[var(--color-titles-purple)]
                            "
                          />
                        </div>
                      </td>

                      {/* Nombre */}
                      <td className="p-4 body text-base font-medium text-center">
                        {u.nombre}
                      </td>

                      {/* Correo */}
                      <td className="p-4 body text-base font-semibold underline text-center">
                        {u.email}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Participantes;
