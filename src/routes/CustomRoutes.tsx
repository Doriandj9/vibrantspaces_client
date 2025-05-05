import { app } from "@/config/app";
import ErrorBoundary from "@/core/classes/ErrorBoundary";
import { Children } from "@/core/@types/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Toaster } from "sonner";

TopBarProgress.config({
  barColors: {
    "0": app.colors.primary,
  },
  shadowBlur: 5,
  barThickness: 4,
});

export const CustomRoutes: React.FC<Children> = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    if (location.pathname !== prevLoc) {
      setProgress(true);
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <>
      {progress && <TopBarProgress />}
      <Toaster richColors />
      <ErrorBoundary>
        <Routes>{children}</Routes>
      </ErrorBoundary>
    </>
  );
};
