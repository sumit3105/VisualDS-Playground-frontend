import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import Header from "../components/Header";
import { updatePlayground } from "../services/playgroundService";
import toast from "react-hot-toast";

export default function Playground() {
  const { state } = useLocation();
  const [code, setCode] = useState(state?.writtenCode || "");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const debounceTimerRef = useRef(null);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    const newWidth = (mouseX / containerWidth) * 100;
    const clampedWidth = Math.min(Math.max(newWidth, 20), 80);
    setLeftPanelWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Debounced effect to auto-save code
  useEffect(() => {
    if (!state?.codeId) return;
  
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  
    debounceTimerRef.current = setTimeout(() => {
      const toastId = toast.loading("Saving...");
  
      updatePlayground(
        state.codeId,
        state.codeTitle,
        state.codeDescription,
        code
      )
        .then(() => {
          toast.success("Saved!", { id: toastId });
        })
        .catch((err) => {
          console.error("Auto-save failed:", err);
          toast.error("Save failed!", { id: toastId });
        });
    }, 1000);
  
    return () => clearTimeout(debounceTimerRef.current);
  }, [code, state]);
  

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-300">
      <Header />
      <div className="p-6">
        <div
          ref={containerRef}
          className="flex relative"
          style={{ height: 'calc(100vh - 150px)' }}
        >
          {/* Left Panel */}
          <div
            className="bg-gray-800 p-4 rounded-l-lg shadow-md h-full overflow-auto transition-all duration-100"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <h3 className="text-xl text-gray-200 font-semibold mb-2">Code Editor</h3>
            <CodeMirror
              value={code}
              theme={oneDark}
              onChange={(val) => setCode(val)}
            />
          </div>

          {/* Resize Handle */}
          <div
            className="w-2 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 cursor-col-resize transition-colors duration-200"
            onMouseDown={handleMouseDown}
          />

          {/* Right Panel */}
          <div
            className="bg-white p-4 rounded-r-lg shadow-md h-full overflow-auto transition-all duration-100"
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            <h3 className="text-xl font-semibold mb-2">Visualization</h3>
            <div id="visualization-panel" className="h-full">
              <p className="text-sm text-gray-600">Visualization output will appear here.</p>
            </div>
          </div>
        </div>

        {/* Visualize Button */}
        <div className="flex justify-center mt-4">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
}
