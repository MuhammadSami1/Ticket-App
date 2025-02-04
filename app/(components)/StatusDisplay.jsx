const StatusDisplay = ({ status }) => {
  console.log("Received status:", status);
  const getColor = (status) => {
    let color = "bg-slate-700";
    switch (status.toLowerCase().trim()) {
      case "done":
        color = "bg-green-200";
        return color;
      case "started":
        color = "bg-yellow-200";
        return color;
      case "not started":
        color = "bg-red-200";
        return color;
    }
    return color;
  };

  return (
    <span
      className={`font-semibold px-2 py-1 text-xs inline-block rounded-full text-gray-700 ${getColor(
        status
      )} `}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
