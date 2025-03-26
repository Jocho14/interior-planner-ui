import "./App.css";
import { BrowserRouter } from "react-router";

import AppRouter from "./router/AppRouter";
import { SizeProvider } from "./context/SizeContext";
import { SketchProvider } from "./context/SketchContext";

function App() {
  return (
    <>
      <SketchProvider>
        <SizeProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </SizeProvider>
      </SketchProvider>
    </>
  );
}

export default App;
