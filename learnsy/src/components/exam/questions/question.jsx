const Question = ({ questionInfo, respuestas, handleChange }) => {
    return (
        <div className="font-light flex gap-10 min-h-52 items-center">
            <div className="flex flex-col gap-3.5 max-w-[35rem] justify-center">
                <p>
                    {questionInfo.statement}
                </p>
                <div className="grid grid-cols-2 gap-7">
                    {questionInfo.responses.map((res) =>
                        <label key={res.id} className="flex gap-1 items-center">
                            <input
                                type="radio"
                                name="respuesta"
                                value={res.description}
                                checked={respuestas[questionInfo.id] === res.id}
                                onChange={handleChange(res.id)}
                                key={res.id} />
                            <p> {res.description}</p>
                        </label>
                    )}
                </div>
            </div>
            {questionInfo.image && <img src={questionInfo.image} className="h-40" />}
        </div>
    )
}

export default Question