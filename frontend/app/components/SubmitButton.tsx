export const SubmitButton: React.FC<{text: string }> = ({ text }) => {
  return (
    <button
      type="submit"
      aria-disabled={false}
      className="w-full px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
    >
      {text}
    </button>
  );
};