const Controls = ({currentQuestion, limit, changeQuestion}) => {
    return (
        <div className="flex justify-center font-light">
            {(currentQuestion === 0) && <div className="w-9 p-1.5"></div>}
            {(currentQuestion > 0) && <button onClick={changeQuestion({ next: false })} className="cursor-pointer py-1 px-3 border-2 border-ligthBlue">{currentQuestion}</button>}
            <button className="cursor-pointer py-1 px-3 bg-ligthBlue text-white border-2 border-ligthBlue">{currentQuestion + 1}</button>
            {(currentQuestion + 2 <= limit) && <button onClick={changeQuestion({ next: true })} className="cursor-pointer py-1 px-3 border-2 border-ligthBlue">{currentQuestion + 2}</button>}
            {(currentQuestion + 2 > limit) && <div className="w-9 p-1.5"></div>}
        </div>
    )
}

export default Controls;