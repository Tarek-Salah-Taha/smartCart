import { ErrorProps } from "../types/types";

function Errors({ message }: ErrorProps) {
  return (
    <div className="flex justify-center items-center min-h-64 p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md w-full">
        <div className="text-red-600 font-semibold text-lg mb-2">Error</div>
        <div className="text-red-700 text-base">{message}</div>
      </div>
    </div>
  );
}

export default Errors;
