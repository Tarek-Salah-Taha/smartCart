function MiniSpinner() {
  return (
    <div
      className="w-4 h-4 border-2 border-t-transparent border-[#d87d4a] rounded-full animate-spin"
      role="status"
      aria-label="loading"
    />
  );
}

export default MiniSpinner;
