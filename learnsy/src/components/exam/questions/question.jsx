import Timer from "../timer/timer"

const Question = ({ questionInfo, respuestas, handleChange, duration }) => {
    return (
        <div className="flex flex-col font-light gap-8 justify-center w-full">
            <div className="flex justify-between">
                <p className="text-2xl text-titles-purple font-medium max-w-[36rem]">
                    {questionInfo.statement}
                </p>
                <Timer duration={duration} />
            </div>
            <div className="flex justify-between">
                <div className="grid grid-cols-1 gap-5 text-dark-text">
                    {questionInfo.responses.map((res) =>
                        <label key={res.id} className="flex gap-1 items-center">
                            <input
                                type="radio"
                                className="radio"
                                name="respuesta"
                                value={res.description}
                                checked={respuestas[questionInfo.id] === res.id}
                                onChange={handleChange(res.id)}
                                key={res.id} />
                            <p> {res.description}</p>
                        </label>
                    )}
                </div>
                {questionInfo.image && <img src={questionInfo.image} className="h-52 border-[2px] border-titles-purple rounded-2xl shadow-xl shadow-[#CFCFCF]" />}
            </div>
        </div>

    )
}

export default Question