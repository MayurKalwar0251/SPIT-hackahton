import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center bg-black mx-auto py-10">
        <Button variant="outline" classname="bg-slate-950 text-blue-950">
          Click me
        </Button>
      </div>
    </>
  );
}

export default App;
