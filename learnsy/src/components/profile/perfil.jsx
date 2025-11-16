import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import ChangeAvatarModal from "./changeAvatarModal.jsx/changeAvatarModal";
import UserInfo from "./userInfo";

const Perfil = () => {

    const user = useAuthStore((state) => state.user);
    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const isPending = (user?.nombre == null)

    return (
        <>
            <div className="bg-white p-8 flex flex-col gap-12 min-w-5xl soft-ring rounded-2xl h-fit">
                {isPending && <div>Loading...</div>}
                {!isPending && (<UserInfo data={user} openModal={()=>{setAvatarModalOpen(true)}}/>)}

                {avatarModalOpen && <ChangeAvatarModal onClose={() => setAvatarModalOpen(false)}/>}
            </div>
        </>
    )
}

export default Perfil