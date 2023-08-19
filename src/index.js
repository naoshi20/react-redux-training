import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";

import { createRoot } from "react-dom/client";

// createRoot メソッドを使用してアプリケーションをレンダリング
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
