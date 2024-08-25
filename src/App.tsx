import React from "react";
import "./App.css";
import { Tree } from "./components/Tree/Tree";

function App() {
	document.title = "TreeCreator";
  return (
    <div className="app-container">
      <Tree />
    </div>
  );
}

export default App;
