const Loading: React.FC<{ message: string; color?: 'dark' | 'light' }> = ({
  message,
  color = 'dark'
}) => {
  return (
    <div
      className={`text-xl text-center p-4 ${
        color === 'dark' ? 'text-gray-700' : 'text-white'
      }`}
    >
      {message}…
    </div>
  );
};

export default Loading;
