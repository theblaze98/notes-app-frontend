import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashBoardPage, IndexPage, LoginPage, SignupPage } from './pages/index';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexPage />} />
                <Route path='/dashboard' element={<DashBoardPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    )
}
