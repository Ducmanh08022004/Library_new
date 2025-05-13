import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './route/index.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    return <Route path={route.path} element={route.component} key={index} />;
                })}
            </Routes>
        </Router>
    </StrictMode>,
);
