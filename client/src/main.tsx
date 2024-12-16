import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const startApp = async () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  const queryClient = new QueryClient();

  createRoot(rootElement).render(
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

startApp();
