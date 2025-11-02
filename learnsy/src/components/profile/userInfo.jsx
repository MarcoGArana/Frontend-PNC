import { useAuthStore } from "../../store/authStore";

const UserInfo = ({data, openModal}) => {
    const {username, correo, avatar} = data;
    const logout = useAuthStore((state) => state.logout);

    return (
        <>
            <div className="grid p-4 text-2xl">
                <h3 className="flex justify-end">Tu perfil</h3>
                <div className="flex gap-8 items-center">
                    <img src={avatar} className="rounded-full h-52 object-contain border-4 border-secondary cursor-pointer" onClick={openModal}/>
                    <div className="grid gap-1.5 font-medium">
                        <p>
                            Usuario: {username}
                        </p> 
                        <p>
                            Correo electronico: {correo}
                        </p>
                        <button className="flex gap-3 cursor-pointer text-gray-500" onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="delete" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                            <p>Log out</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo