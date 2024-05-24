import { useEffect, useState } from "react";
import "./App.css";
import { getHealth } from "./api/health";

function App() {
  const [healthy, setHealthy] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    getHealth()
      .then(() => {
        setHealthy(true);
      })
      .catch(() => {
        setHealthy(false);
      });
  }, []);

  const apiLoading = typeof healthy === "undefined";

  return (
    <>
      <div>Welcome!</div>
      {!apiLoading && <div>API is {healthy ? "healthy" : "unhealthy"}</div>}
    </>
  );
}

export default App;
