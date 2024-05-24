import "./App.css";
import Map from "@components/map";
import { useStations } from "./hooks/useStations";

function App() {
  const { stations } = useStations();

  return (
    <>
      <Map />
    </>
  );
}

export default App;
