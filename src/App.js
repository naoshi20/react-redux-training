import "./App.css";
import { useSelector } from "react-redux";
import Count from "./components/Count";
import Post from "./components/Post";

function App() {
    const count = useSelector((state) => state.count);
    return (
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count: {count}</p>
            {/* <Count /> */}
            <Post />
        </div>
    );
}

export default App;
