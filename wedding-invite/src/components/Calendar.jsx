export default function Calendar() {
    const days = ['S','M','T','W','T','F','S'];
    const dates = [
        1,2,3,4,5,6,7,
        8,9,10,11,12,13,14,
        15,16,17,18,19,20,21,
        22,23,24,25,26,27,28,
        29,30
    ];

    return (
        <div className="calendar_wrap">

        <div className="calendar_week">
            {days.map((d,i)=>(
            <div key={i} className="week">{d}</div>
            ))}
        </div>

        <div className="calendar_date">
            {dates.map((d,i)=>(
            <div key={i} className={`date ${d===28 ? 'wedding' : ''}`}>
                {d && (
                <>
                    {d===28 && <div className="heart">❤</div>}
                    {d}
                </>
                )}
            </div>
            ))}
        </div>

        </div>
    )
}