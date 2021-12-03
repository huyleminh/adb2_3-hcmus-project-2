import { useEffect } from "react";
import ClientAPI from "./service/ClientAPI";

function App() {
    useEffect(() => {
        const test = async () => {
            try {
                const res = await ClientAPI.get("/test");
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        test();
    });
    return <div className="app">App</div>;
}

export default App;
