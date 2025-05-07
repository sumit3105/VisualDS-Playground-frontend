export default function PlaygroundCard({ playground, onEdit, onView }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800">{playground.codeTitle}</h3>
      <p className="text-gray-600 mb-2">{playground.codeDescription}</p>
      <div className="flex justify-around">
        <button onClick={() => onView(playground)} className="text-indigo-600 hover:underline">View</button>
        <button onClick={() => onEdit(playground)} className="text-yellow-600 hover:underline">Edit</button>
      </div>
    </div>
  );
}