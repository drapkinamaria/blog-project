import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import { fetchNewsDetails } from "./store/api-actions";
import { Article } from "./pages/article";

store.dispatch(fetchNewsDetails());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
