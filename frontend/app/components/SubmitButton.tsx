export const SubmitButton: React.FC<{text: string }> = ({ text }) => {
  return (
    <button
      type="submit"
      aria-disabled={false}
      className="w-full px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
    >
      {text}
    </button>
  );
};