


const TicketTimer = ({timeLeft}) => {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isWarning = timeLeft <= 120;

  return (
    <div className="w-full bg-red-50 p-3 text-center rounded-lg">
      <p className="text-lg font-semibold text-red-700">
        🎟️ Tickets reservados
      </p>
      <p className="mt-1 text-sm text-gray-700">
        Tiempo restante: 
        <span className={`ml-2 font-mono text-lg font-bold ${
          isWarning ? "text-red-600 animate-pulse" : "text-red-500"
        }`}>
          {minutes}:{seconds}
        </span>
      </p>
    </div>
  );
};


export default TicketTimer;