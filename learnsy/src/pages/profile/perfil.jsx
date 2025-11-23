import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import ChangeAvatarModal from "../../components/profile/changeAvatarModal.jsx/changeAvatarModal";
import UserInfo from "../../components/profile/userInfo";

const Perfil = () => {

    const user = useAuthStore((state) => state.user);
    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const isPending = (user?.nombre == null)

    return (
        <>
            
                {isPending && <div>Loading...</div>}
                {!isPending && (<UserInfo data={user} openModal={()=>{setAvatarModalOpen(true)}}/>)}

                {avatarModalOpen && <ChangeAvatarModal onClose={() => setAvatarModalOpen(false)}/>}

        </>
    )
}

export default Perfil