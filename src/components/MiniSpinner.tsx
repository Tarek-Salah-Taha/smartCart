function MiniSpinner() {
  return (
    <div
      className="w-4 h-4 md:w-5 md:h-5 border-2 md:border-[2.5px] border-t-transparent border-[#d87d4a] rounded-full animate-spin"
      role="status"
      aria-label="loading"
    />
  );
}

export default MiniSpinner;
