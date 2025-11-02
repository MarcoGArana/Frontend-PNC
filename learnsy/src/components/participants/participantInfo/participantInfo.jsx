const ParticipantInfo = ({userInfo}) => {
    return (
        <>
            <div className="flex justify-around items-center">
            <img src={userInfo.avatar} className="rounded-full w-24 object-contain"></img>
                <h4>{userInfo.nombre}</h4>
                <h4>{userInfo.email}</h4>
            </div>
        </>
    )
}

export default ParticipantInfo;