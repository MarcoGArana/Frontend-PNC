import { useAuthStore } from "../../store/authStore";
import Card from "../../components/home/materia/card";
import MateriaCreator from "../../components/home/materia/materiaCreator";

const Home = () => {

  const user = useAuthStore((state) => state.user);
  const isPending = (user?.materias == null)

  return (
    <div className="grid auto-rows-min">
      <div className="bg-gray-200 p-2 pl-4">
        <h3 className="font-bold">
          Asignaturas
        </h3>
      </div>
      <div className="bg-white p-8 flex flex-col gap-12 min-w-5xl min-h-screen shadow-2xl shadow-black">
        {isPending && <div>loading...</div>}
        {!isPending && user?.rol == 'admin' && <MateriaCreator userId={user.usuarioId}/>}
        {!isPending && (user?.materias.map((materia) => {
          return <Card key={materia.id} data={materia} rol={user.rol}/>;
        }))}
      </div>
    </div>
  )
}

export default Home;