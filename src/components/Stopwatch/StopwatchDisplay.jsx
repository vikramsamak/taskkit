function StopwatchDisplay({ time }) {
  return (
    <div className="flex items-center justify-center h-4/5">
      <h1 className="font-mono font-semibold text-8xl">{time}</h1>
    </div>
  );
}

export default StopwatchDisplay;
