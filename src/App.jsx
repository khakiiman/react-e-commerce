import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import ProductsProvider from "./contexts/ProductsProvider";
import { ToastProvider } from "./contexts/ToastProvider";
import Layout from "./layout/Layout";
import ProductsLayout from "./layout/ProductsLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ToastDemo from "./components/ui/ToastDemo";
import ComponentDemo from "./pages/ComponentDemo";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <Routes>
            <Route element={<ProductsLayout />}>
              <Route path="/products" element={
                <ProductsProvider>
                  <Products />
                </ProductsProvider>
              } />
            </Route>
            <Route element={<Layout />}>
              <Route
                index
                path="/home"
                element={<Navigate to="/" replace />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/toast-demo" element={<ToastDemo />} />
              <Route path="/component-demo" element={<ComponentDemo />} />
              <Route path="/products/:id" element={<DetailPage />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
