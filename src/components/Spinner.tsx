function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-64 p-4 gap-4">
      <div
        className="w-24 h-24 md:w-32 md:h-32 border-4 border-t-4 border-t-transparent border-[#d87d4a] rounded-full animate-spin"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

export default Spinner;
