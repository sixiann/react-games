const ReplayButton: React.FC<{ handleReplayClick: () => void }> = ({
  handleReplayClick,
}) => {
  return (
    <button
      className="hover:bg-pink-300 bg-pink-400 border-0 hover:border-0 text-white mt-3 py-1"
      onClick={() => handleReplayClick()}
    >
      Replay
    </button>
  );
};

export default ReplayButton;
