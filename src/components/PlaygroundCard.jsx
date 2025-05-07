import { format } from "date-fns";

export default function PlaygroundCard({ playground, onView, onCopy = null, onEdit = null }) {
  const { codeTitle, codeDescription, user, date } = playground;

  const formattedDate = date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : "Unknown";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={user.imageUrl || `https://ui-avatars.com/api/?name=${user.name}`}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{codeTitle}</h3>
      <p className="text-gray-700 mb-2">{codeDescription}</p>
      <p className="text-xs text-gray-400 mb-3">Created on: {formattedDate}</p>

      <div className="flex justify-between text-sm">
        <button
          onClick={() => onView(playground)}
          className="text-indigo-600 hover:underline"
        >
          View
        </button>

        {onEdit ? (
          <button
            onClick={() => onEdit(playground)}
            className="text-yellow-600 hover:underline"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => onCopy(playground)}
            className="text-green-600 hover:underline"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}