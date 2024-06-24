const ReplayButton: React.FC<{ handleReplayClick: () => void }> = ({
  handleReplayClick,
}) => {
  return (
    <button
      className="bg-pink-300 hover:bg-pink-400 border-0 hover:border-0 text-black mt-3 py-1"
      onClick={() => handleReplayClick()}
    >
      Replay
    </button>
  );
};

export default ReplayButton;
