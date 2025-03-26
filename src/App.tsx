import "./App.css";
import { BrowserRouter } from "react-router";

import AppRouter from "./router/AppRouter";
import { SizeProvider } from "./context/SizeContext";

function App() {
  return (
    <>
      <SizeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </SizeProvider>
    </>
  );
}

export default App;
