import { RiStickyNoteAddLine } from "react-icons/ri";

export default function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 mt-2 cursor-pointer"
    >
      <RiStickyNoteAddLine /> Add New Task
    </button>
  );
}
