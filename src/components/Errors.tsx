import { ErrorProps } from "../types/types";

function Errors({ message }: ErrorProps) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-600 font-medium text-lg">Error: {message}</div>
    </div>
  );
}

export default Errors;
