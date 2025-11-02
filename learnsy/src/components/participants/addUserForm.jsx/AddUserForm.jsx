const AddUserForm = ({handleSubmit, userName, setName}) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm py-4">
                <label className='text-primary w-full font-medium text-xl'>Añadir usuario</label>
                <div className="flex gap-4">
                    <input
                        type="name"
                        value={userName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre de usuario"
                        className="font-normal w-full p-2 rounded bg-gray-200 focus:border-secondary focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-medium px-3 py-2 hover:bg-blue-700 rounded cursor-pointer"
                    >
                        Agregar
                    </button>
                </div>
            </form>
            <hr className="h-0.5 border-0 bg-primary"></hr>
        </>
    )
}

export default AddUserForm;