import "./App.css";
import { BrowserRouter } from "react-router";

import AppRouter from "./router/AppRouter";
import { SizeProvider } from "./context/SizeContext";
import { SketchProvider } from "./context/SketchContext";
import { StageProvider } from "./context/StageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StageProvider>
          <SketchProvider>
            <SizeProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </SizeProvider>
          </SketchProvider>
        </StageProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
