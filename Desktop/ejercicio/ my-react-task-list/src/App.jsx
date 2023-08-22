import Header from "./componenst/Header";
import { Task } from "./componenst/Task";
import "./App.css";

function App() {
  const estrenos = [
    { name: "Comedia" },
    { name: "Romance" },
    { name: "Accion" },
  ];

  return (
    <div className="App">
      <Header />
      <Task list={estrenos} />
    </div>
  );
}

export default App;
