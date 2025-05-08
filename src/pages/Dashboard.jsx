import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPlaygrounds,
  addPlayground,
} from "../services/playgroundService";
import { getProfile } from "../services/userService";
import PlaygroundCard from "../components/PlaygroundCard";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [filteredPlaygrounds, setFilteredPlaygrounds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewedPlayground, setViewedPlayground] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getProfile();
        const data = await getAllPlaygrounds();
        const others = data
          .filter((pg) => pg.user.email !== user.email)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setPlaygrounds(others);
        setFilteredPlaygrounds(others);
      } catch (err) {
        toast.error("Failed to load playgrounds");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredPlaygrounds(playgrounds);
      } else {
        const lower = searchTerm.toLowerCase();
        const filtered = playgrounds.filter(
          (pg) =>
            pg.codeTitle.toLowerCase().includes(lower) ||
            pg.codeDescription.toLowerCase().includes(lower) ||
            pg.user.name.toLowerCase().includes(lower) ||
            pg.user.email.toLowerCase().includes(lower) 

        );
        setFilteredPlaygrounds(filtered);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, playgrounds]);

  const handleCopy = async (pg) => {
    const newPlayground = await addPlayground(pg.codeTitle, pg.codeDescription, pg.writtenCode);
    if (newPlayground) {
      navigate("/playground", { state: newPlayground});
      toast.success("Playground copied to your dashboard");
    } else {
      toast.error("Copy failed");
    }
  };

  return (
    <div>


      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-200 pt-20 p-6">

        <div className="max-w-5xl mx-auto space-y-6 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-black text-2xl font-semibold">Explore Playgrounds</h2>
            <input
              type="text"
              placeholder="Search playgrounds..."
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          ) : (
            <>
              {filteredPlaygrounds.length === 0 ? (
                <div className="text-center text-gray-600 py-20">
                  {playgrounds.length === 0
                    ? "No other playgrounds available."
                    : "No playgrounds match your search."}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredPlaygrounds.map((pg) => (
                    <PlaygroundCard
                      key={pg.codeId}
                      playground={pg}
                      onView={() => setViewedPlayground(pg)}
                      onCopy={() => handleCopy(pg)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* View Modal */}
        {viewedPlayground && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4">
              <h3 className="text-lg font-bold">{viewedPlayground.codeTitle}</h3>
              <p className="text-gray-700">{viewedPlayground.codeDescription}</p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 whitespace-pre-wrap text-sm">
                {viewedPlayground.writtenCode}
              </pre>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setViewedPlayground(null)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCopy(viewedPlayground);
                    setViewedPlayground(null);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Copy to My Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
