import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaygrounds, updatePlayground, addPlayground } from "../services/playgroundService";
import PlaygroundCard from "../components/PlaygroundCard";
import Header from "../components/Header";
import toast from "react-hot-toast";

export default function Dashboard() {
  
  const [playgrounds, setPlaygrounds] = useState([]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const [currentPlayground, setCurrentPlayground] = useState(null);
    
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaygrounds();
      // console.log("Data:", data);
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setPlaygrounds(sortedData);
      // setPlaygrounds(data);
      // console.log(playgrounds);
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const message = await addPlayground(form.title, form.description, "");
    if(message === "Code Saved Successfully")
      navigate("/playground", { state: form });
    else
      toast.error(message);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      
      const updated = await updatePlayground(
        currentPlayground.codeId,
        form.title,
        form.description,
        currentPlayground.writtenCode
      );

      setPlaygrounds(playgrounds.map(pg => 
        pg.codeId === updated.codeId ? updated : pg
      ));

      setShowUpdateModal(false);

    } catch (error) {
      toast.error(`Update failed: ${error}`);
    }
  };

  const openUpdateModal = (playground) => {
    setCurrentPlayground(playground);
    setForm({
      title: playground.codeTitle,
      description: playground.codeDescription,
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-200 p-6">
      <Header />
      <div className="max-w-5xl mx-auto space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-black text-2xl font-semibold">Your Playgrounds</h2>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            + New Playground
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {playgrounds.map((pg) => (
            <PlaygroundCard
              key={pg.codeId}
              playground={pg}
              onView={() => navigate("/playground", { state: pg })}
              onEdit={() => openUpdateModal(pg)}
            />
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold">Create New Playground</h3>
            <input 
              name="title" 
              required 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              className="w-full p-2 border rounded" 
              placeholder="Title" 
            />
            <input 
              name="description" 
              required 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              className="w-full p-2 border rounded" 
              placeholder="Description" 
            />
            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)} 
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold">Update Playground</h3>
            <input 
              name="title" 
              required 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              className="w-full p-2 border rounded" 
              placeholder="Title" 
            />
            <input 
              name="description" 
              required 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              className="w-full p-2 border rounded" 
              placeholder="Description" 
            />
            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setShowUpdateModal(false)} 
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}