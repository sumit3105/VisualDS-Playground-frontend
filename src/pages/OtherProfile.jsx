import { useState, useEffect } from "react";
import { User, ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile, getProfileById } from "../services/userService";
import { getAllPlaygrounds, addPlayground } from "../services/playgroundService";
import toast from "react-hot-toast";
import PlaygroundCard from "../components/PlaygroundCard";
import Header from "../components/Header";
import { useParams } from 'react-router-dom';

export default function OtherProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        imageUrl: "",
        id: null,
    });
    
    const [myPlaygrounds, setMyPlaygrounds] = useState([]);
    const [viewedPlayground, setViewedPlayground] = useState(null);
    

    useEffect(() => {
        (async () => {
            const currentUser = await getProfile();
            
            // current logged in user
            if(currentUser.id == id)
                navigate("/profile");
            
            const user = await getProfileById(id);
            setProfile(user);
            console.log("User:", user);

            const data = await getAllPlaygrounds();
            
            console.log("Profile: ", profile);
            const sortedData = data.filter((pg) => pg.user.email == user.email)
                                .sort((a, b) => new Date(b.date) - new Date(a.date));

            console.log("Sorted data: ", sortedData);
            setMyPlaygrounds(sortedData);
        })();
    }, []);

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
            <Header />
            <div className="max-w-6xl mx-auto mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-200 rounded-lg shadow">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <div className="flex-1">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-black hover:text-indigo-600 transition"
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </button>
                    </div>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Profile
                        </h1>
                    </div>
                    <div className="flex-1" />
                </div>

                {/* Profile Image and Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
                        {/* {renderProfileImage()} */}
                        <img
                            src={
                                profile.imageUrl ||
                                `https://ui-avatars.com/api/?name=${profile.name}`
                            }
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 text-lg text-gray-800 font-semibold">
                            <User size={20} />
                            <span>{profile.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Mail size={18} />
                            <span>{profile.email || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* User's Playgrounds */}
                <div className="max-w-5xl mx-auto space-y-6 mt-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-black text-2xl font-semibold">
                            {`${profile.name}'s Playground`}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {myPlaygrounds.map((pg) => (
                            <PlaygroundCard
                                key={pg.codeId}
                                playground={pg}
                                onView={() => setViewedPlayground(pg) }
                                onCopy={() => handleCopy(pg)}
                            />
                        ))}
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
        </div>
    );
}