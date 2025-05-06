export default function PlaygroundCard({ playground, onEdit, onDelete, onView }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800">{playground.CodeTitle}</h3>
        <p className="text-gray-600 mb-2">{playground.CodeDescription}</p>
        <p className="text-sm text-gray-400 mb-4">Language: {playground.CodeLanguage}</p>
        <div className="flex justify-between">
          <button onClick={() => onView(playground)} className="text-indigo-600 hover:underline">View</button>
          <button onClick={() => onEdit(playground)} className="text-yellow-600 hover:underline">Edit</button>
          <button onClick={() => onDelete(playground.CodeId)} className="text-red-600 hover:underline">Delete</button>
        </div>
      </div>
    );
  }