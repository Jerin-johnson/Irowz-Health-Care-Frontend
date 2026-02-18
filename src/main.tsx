import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/index.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import "./api/apiService/auth/axios.interceptor.ts";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/common/Loader.tsx";
import ErrorBoundary from "./components/error/ErrorBoundaries.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster position="top-right" />
            <Suspense fallback={<Loader />}>
              <RouterProvider router={routers} />
            </Suspense>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
