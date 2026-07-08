/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Menu from "./pages/Menu";
import Canvas from "./pages/Canvas";
import Epilogue from "./pages/Epilogue";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/canvas/:id" element={<Canvas />} />
        <Route path="/epilogue" element={<Epilogue />} />
      </Routes>
    </BrowserRouter>
  );
}
