"use client";

import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { updatePlayground } from "../services/playgroundService";
import toast from "react-hot-toast";
import { getToken } from "../services/authService";

export default function Playground() {
  const { state } = useLocation();
  const [code, setCode] = useState(state?.writtenCode || "");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const debounceTimerRef = useRef(null);
  const [algoType, setAlgoType] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showAiGenerator, setShowAiGenerator] = useState(true);

  // New state for AI generator box dimensions
  const [aiGeneratorHeight, setAiGeneratorHeight] = useState(200); // Default height in pixels
  const [aiGeneratorWidth, setAiGeneratorWidth] = useState(100); // Default width in percentage
  const aiGeneratorRef = useRef(null);
  const isResizingHeightRef = useRef(false);
  const isResizingWidthRef = useRef(false);
  const resizeStartPosRef = useRef({ x: 0, y: 0 });
  const startDimensionsRef = useRef({ width: 0, height: 0 });

  const handleGenerateCode = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    if (!algoType.trim()) {
      toast.error("Please enter an algorithm type");
      return;
    }

    try {
      const token = getToken();
      toast.loading("Generating code...");
      const response = await fetch(
        `${API_URL}api/algorithm/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type: algoType }),
        }
      );

      if (!response.ok) throw new Error("API error");

      const data = await response.text(); // AI response is plain text
      setGeneratedCode(data);
      toast.dismiss();
      toast.success("Code generated!");

      // Save code to backend with user ID 5
      const saveResponse = await fetch(
        `${API_URL}Api/codes/user/5`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            codeTitle: algoType,
            codeDescription: algoType,
            writtenCode: data,
          }),
        }
      );

      if (saveResponse.ok) {
        toast.success("AI code saved to backend");
      } else {
        toast.error("Failed to save AI code");
      }
    } catch (error) {
      console.error("Generation or saving failed:", error);
      toast.dismiss();
      toast.error("Failed to generate or save code");
    }
  };

  // Code panel resize handlers
  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
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
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // AI generator box resize handlers
  const handleAiResizeMouseDown = (e, direction) => {
    e.preventDefault();

    if (direction === "height") {
      isResizingHeightRef.current = true;
    } else if (direction === "width") {
      isResizingWidthRef.current = true;
    }

    resizeStartPosRef.current = { x: e.clientX, y: e.clientY };

    if (aiGeneratorRef.current) {
      const rect = aiGeneratorRef.current.getBoundingClientRect();
      startDimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };
    }

    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleAiResizeMouseMove);
    document.addEventListener("mouseup", handleAiResizeMouseUp);
  };

  const handleAiResizeMouseMove = (e) => {
    if (isResizingHeightRef.current) {
      const deltaY = e.clientY - resizeStartPosRef.current.y;
      const newHeight = startDimensionsRef.current.height + deltaY;
      // Set minimum and maximum height
      const clampedHeight = Math.min(Math.max(newHeight, 100), 600);
      setAiGeneratorHeight(clampedHeight);
    }

    if (isResizingWidthRef.current && aiGeneratorRef.current) {
      const parentWidth = aiGeneratorRef.current.parentElement.offsetWidth;
      const deltaX = e.clientX - resizeStartPosRef.current.x;
      const newWidthPx = startDimensionsRef.current.width + deltaX;
      const newWidthPercent = (newWidthPx / parentWidth) * 100;
      // Set minimum and maximum width percentage
      const clampedWidth = Math.min(Math.max(newWidthPercent, 50), 100);
      setAiGeneratorWidth(clampedWidth);
    }
  };

  const handleAiResizeMouseUp = () => {
    isResizingHeightRef.current = false;
    isResizingWidthRef.current = false;
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", handleAiResizeMouseMove);
    document.removeEventListener("mouseup", handleAiResizeMouseUp);
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
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs",
      },
    });
    const editor = null;
    require(["vs/editor/editor.main"], () => {
      // Fetch custom IntelliSense definitions from an external file
      fetch("https://zalaharshpalsinh.github.io/VisualDS/dist/VisualDS.d.ts")
        .then((response) => {
          return response.text();
        })
        .then((customDefinitions) => {
          // customDefinitions
          var libUri = "ts:filename/visualds.d.ts";
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            customDefinitions,
            libUri
          );
          const editor = monaco.editor.create(
            document.getElementById("editor-container"),
            {
              value: code,
              language: "javascript",
              theme: "vs-dark",
              automaticLayout: true,
            }
          );
          // Listen for changes in the editor and update state
          editor.onDidChangeModelContent(() => {
            const newValue = editor.getValue();
            setCode(newValue); // Update state with new value
          });

          handleVIsualisation(editor);
        })
        .catch((error) => console.log("Failed to load .d.ts file:", error));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-300">
      <Header />
      <div className="p-6">
        {/* AI Code Generator Section - Now resizable */}
        <div
          ref={aiGeneratorRef}
          className={`mb-4 bg-gray-800 rounded-lg shadow-md p-4 text-white relative transition-all duration-300 ${
            showAiGenerator ? "block" : "hidden"
          }`}
          style={{
            width: `${aiGeneratorWidth}%`,
            height: `${aiGeneratorHeight}px`,
            maxHeight: `${aiGeneratorHeight}px`,
            overflow: "auto",
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">AI Code Generator</h3>
            <div className="flex">
              <button
                onClick={() => setShowAiGenerator(false)}
                className="text-gray-300 hover:text-white ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={algoType}
              onChange={(e) => setAlgoType(e.target.value)}
              placeholder="Enter algorithm type (e.g. bubble sort)"
              className="flex-grow p-2 border rounded-md text-gray-800"
            />
            <button
              onClick={handleGenerateCode}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Generate
            </button>
          </div>
          {generatedCode && (
            <div className="bg-gray-700 p-3 rounded-md relative">
              <pre className="whitespace-pre-wrap text-sm text-gray-200">
                {generatedCode}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  toast.success("Copied to clipboard");
                }}
                className="absolute top-2 right-2 text-indigo-400 hover:text-indigo-300 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          )}

          {/* Resize Handles */}
          {/* Width resize handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-indigo-500 rounded-bl-lg"
            onMouseDown={(e) => handleAiResizeMouseDown(e, "width")}
            style={{ opacity: 0.7 }}
          />

          {/* Height resize handle */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-indigo-500"
            onMouseDown={(e) => handleAiResizeMouseDown(e, "height")}
            style={{ opacity: 0.7 }}
          />
        </div>

        {/* Button to show AI Generator when hidden */}
        {!showAiGenerator && (
          <button
            onClick={() => setShowAiGenerator(true)}
            className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Show AI Generator
          </button>
        )}

        <div
          ref={containerRef}
          className="flex relative"
          style={{ height: "calc(100vh - 150px)" }}
        >
          {/* Left Panel */}
          <div
            className="bg-gray-800 p-4 rounded-l-lg shadow-md h-full overflow-auto transition-all duration-100"
            style={{ width: `${leftPanelWidth}%` }}
          >
            <h3 className="text-xl text-gray-200 font-semibold mb-2">
              Code Editor
            </h3>
            <div id="editor-container" style={{ height: "100%" }}></div>
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
              <p className="text-sm text-gray-600">
                Visualization output will appear here.
              </p>
              <canvas
                id="visualization-canvas"
                style={{
                  width: "100%",
                  height: "85%",
                  border: "2px solid black",
                  background: "rgba(255, 255, 255, 1)",
                  marginTop: "20px",
                }}
              ></canvas>
            </div>
          </div>
        </div>

        {/* Visualize Button */}
        <div className="flex justify-center mt-4">
          <button
            id="run-btn"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Visualize
          </button>
        </div>
      </div>
    </div>
  );
}
