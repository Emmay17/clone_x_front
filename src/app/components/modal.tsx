interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[rgba(255,255,255,0.2)] flex items-center h-screen justify-center z-50 overflow-y-auto">
      <div className="bg-black w-full h-full md:h-auto p-6 box-border rounded-lg shadow-lg relative w-[90%] max-w-md">
        <button
          onClick={onClose}
          className="text-2xl mb-2 font-bold top-2 left-3 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          x
        </button>
        <div className="h-full flex flex-col pb-10 box-border">{children}</div>
      </div>
    </div>
  );
}
