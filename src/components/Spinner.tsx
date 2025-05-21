function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div
        className="w-32 h-32 border-2 border-t-transparent border-[#d87d4a] rounded-full animate-spin"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

export default Spinner;
