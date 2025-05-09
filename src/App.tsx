import { Toaster } from "sonner";
import RootRoutes from "./routes/RootRoutes";

function App() {

  return (
    <>
    <Toaster richColors />
      <RootRoutes />
    </>
  );
}

export default App;
