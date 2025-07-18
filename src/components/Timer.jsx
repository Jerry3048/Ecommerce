import{useState, useEffect} from "react"

function Timer({duration,display1, display2}) {
    const [time, setTime] = useState(duration);
    const getFormattedTime = (milliseconds) => {
        const total_seconds = Math.floor(milliseconds / 1000);
        const total_minutes = Math.floor(total_seconds / 60);
        const total_hours = Math.floor(total_minutes / 60);
        const days = Math.floor(total_hours / 24);
    
        const seconds = total_seconds % 60;
        const minutes = total_minutes % 60;
        const hours = total_hours % 24;
    
        return { days, hours, minutes, seconds };
      };
    
      const timeParts = getFormattedTime(time);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTime(time - 1000);
        }, 1000);
        return () => clearTimeout(timer);
      }, [time]);
    
  return (
    <div>
          <div 
          style={{display:display1}}
          className="font-semibold text-3xl flex gap-4 items-end">
            <div className="flex flex-col items-center">
              <span className="text-[11px]">Days</span>
              <span>{timeParts.days}</span>
            </div>
            <span className="text-orange-500 text-3xl mx-1">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xs">Hours</span>
              <span>{timeParts.hours}</span>
            </div>
            <span className="text-orange-500 text-3xl mx-1">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xs">Minutes</span>
              <span>{timeParts.minutes}</span>
            </div>
            <span className="text-orange-500 text-3xl mx-1">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xs">Seconds</span>
              <span>{timeParts.seconds}</span>
            </div>
          </div>

          
          <div style={{display:display2}} className="font-semibold text-2xl text-black flex gap-4 items-end mb-10">
                <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                  <span>{timeParts.days}</span>
                  <span className="text-[11px]">Days</span>
                </div>

                <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                  <span>{timeParts.hours}</span>
                  <span className="text-[11px]">Hours</span>
                </div>

                <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                  <span>{timeParts.minutes}</span>
                  <span className="text-[11px]">Minutes</span>
                </div>

                <div className="flex-col bg-white rounded-full w-15 h-15 items-center flex justify-center">
                  <span className="">{timeParts.seconds}</span>
                  <span className="text-[11px]">Seconds</span>
                </div>
              </div>
    </div>
  )
}

export default Timer