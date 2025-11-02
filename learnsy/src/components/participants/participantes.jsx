import { useQuery } from "@tanstack/react-query";
import { addUserByName, getMateriaWithDetails } from "../../services/materiaService";
import { useParams } from "react-router-dom";
import ParticipantInfo from "./participantInfo/participantInfo";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import AddUserForm from "./addUserForm.jsx/AddUserForm";

const Participantes = () => {

    const { materiaId } = useParams();
    const [userName, setUserName] = useState('')
    const user = useAuthStore((state) => state.user);

    const { data: content, isError, isPending } = useQuery(
        {
            queryKey: ["materiaDetails", materiaId],
            queryFn: () => getMateriaWithDetails({materiaId: materiaId})
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault()
        const res = addUserByName({userName: userName, materiaId: materiaId})
        toast.success('Usuario agregado');
    };

    const setName = (name) => {
        setUserName(name);
    }

    return (
        <>
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 shadow-2xl shadow-black">
                {isPending && <div>loading...</div>}
                {user?.rol == 'admin' && <AddUserForm userName={userName} setName={setName} handleSubmit={handleSubmit}/>}
                {!isPending && content?.nombre && (<h3 className="text-primary text-4xl">{content.nombre}</h3>)}
                {!isPending && content?.usuarios && (content.usuarios.map((user) => {return <ParticipantInfo key={user.id} userInfo={user}/>}))}
            </div>
        </>
    )
}

export default Participantes;