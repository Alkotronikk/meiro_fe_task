import './App.css'
import Home from "./pages/Home.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Attributes from "./pages/Attributes.tsx";
import Page from "./layouts/Page.tsx";
import AttributeDetail from "./pages/AttributeDetail.tsx";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LabelsProvider} from "./context/LabelsContext.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LabelsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Page/>}>
              <Route index element={<Home/>}/>
              <Route path="attributes">
                <Route path=":id" element={<AttributeDetail/>}/>
                <Route index element={<Attributes/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </LabelsProvider>
    </QueryClientProvider>
  )
}

export default App;