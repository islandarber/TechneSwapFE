const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-80 max-w-md m-auto flex-col flex rounded-lg border-2 border-[#3e8fb0]">
        <div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="float-right px-2 py-1 text-xs font-semibold custom-blue-700 hover:text-red-500"
          >
            X
          </button>
        </div>
        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;