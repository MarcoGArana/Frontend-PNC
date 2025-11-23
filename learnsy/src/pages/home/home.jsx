import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import Card from "../../components/home/materia/card";
import SearchBar from "../../components/home/materia/searchBar";
import { Link } from "react-router-dom";
import dashboardBack from "../../assets/images/dashboard-back.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const isPending = user?.materias == null;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const filtered = [...(user?.materias || [])]
    .sort((a, b) => b.id - a.id)
    .filter((m) =>
      m.nombre.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil((filtered?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isTeacher = user?.rol === "admin";

  const goNext = () => page < totalPages && setPage(page + 1);
  const goPrev = () => page > 1 && setPage(page - 1);

  return (
    <div className="min-h-screen flex flex-col w-full">

      <div
        className="w-full h-54 bg-cover bg-center flex items-center justify-center mt-[-20px]"
        style={{
          backgroundImage: `url(${dashboardBack})`,
          borderRadius: "16px"
        }}
      >
        <h1 className="title-font text-white text-3xl font-bold drop-shadow-lg">
          {isTeacher ? "MIS CURSOS CREADOS" : "MIS CURSOS"}
        </h1>
      </div>

      {/* Search Bar componente and the buttom */}
      <div className="w-full px-6 mt-4 flex items-center gap-3">
        <div className="flex-grow">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            fullWidth={true}
          />
        </div>

        {isTeacher && (
          <Link
            to="/dashboard/crear-materia"
            className="btn-primary px-5 py-2 rounded-md shadow-sm transition whitespace-nowrap"
          >
            Crear materia
          </Link>
        )}
      </div>

      {/* Cards*/}
      <div className="flex-grow w-full max-w-6xl mx-auto p-4">
        {isPending && <p>Cargando...</p>}

        {!isPending && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginated?.map((materia) => (
                <div key={materia.id} className="w-full max-w-[580px] mx-auto">
                  <Card data={materia} rol={user.rol} />
                </div>
              ))}

              {paginated?.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  No se encontraron materias
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="py-6 flex justify-center items-center gap-6">

          <button
            onClick={goPrev}
            disabled={page === 1}
            style={{
              border: "2px solid #706788",
              backgroundColor: "#eee6ff",
              color: "#2d1148",
              marginTop: "8px",
              padding: "8px 12px",
              borderRadius: "50%",
              opacity: page === 1 ? 0.4 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer"
            }}
          >
            <FiChevronLeft />
          </button>

          <span className="px-4 py-2 rounded-full text-sm title font-semibold"
            style={{
              border: `2px solid #706788`,
              backgroundColor: "#eee6ff",
              color: "#2d1148",
              marginTop: "8px"
            }}
          >
            {page} de {totalPages}
          </span>

          <button
            onClick={goNext}
            disabled={page === totalPages}
            style={{
              border: "2px solid #706788",
              backgroundColor: "#eee6ff",
              color: "#2d1148",
              marginTop: "8px",
              padding: "8px 12px",
              borderRadius: "50%",
              opacity: page === totalPages ? 0.4 : 1,
              cursor: page === totalPages ? "not-allowed" : "pointer"
            }}
          >
            <FiChevronRight />
          </button>

        </div>
      )}

    </div>
  );
};

export default Home;
