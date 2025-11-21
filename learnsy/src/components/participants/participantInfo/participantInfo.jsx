const ParticipantInfo = ({ userInfo }) => {
    return (
        <div className="flex items-center gap-4 p-3">
            <img
                src={userInfo.avatar}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
            />
            <div className="flex flex-col">
                <span className="font-semibold">{userInfo.nombre}</span>
                <span className="text-sm text-gray-600">{userInfo.email}</span>
            </div>
        </div>
    );
};

export default ParticipantInfo;
