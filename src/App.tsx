import "./App.css";
import { BrowserRouter } from "react-router";

import AppRouter from "./router/AppRouter";
import { SizeProvider } from "./context/SizeContext";
import { SketchProvider } from "./context/SketchContext";
import { StageProvider } from "./context/StageContext";

function App() {
  return (
    <>
      <StageProvider>
        <SketchProvider>
          <SizeProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </SizeProvider>
        </SketchProvider>
      </StageProvider>
    </>
  );
}

export default App;
