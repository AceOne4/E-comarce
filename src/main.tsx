import ReactDOM from "react-dom/client";
import AppRoutes from "@routes/AppRoutes";
//redux
import { Provider } from "react-redux";
import { persistor, store } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";
// axios
import "./services/axios_global.js";
//style
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);
