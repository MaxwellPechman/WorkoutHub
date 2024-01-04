import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { RegisterPage } from "./pages/Register.tsx";
import { PageProvider } from "./providers/PageProvider.tsx";
import { WorkoutPage } from "./pages/Workout.tsx";
import { RankingPage } from "./pages/Ranking.tsx";
import { AboutPage } from "./pages/About.tsx";

export function Application() {
    return (
        <PageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/workout" element={<WorkoutPage/>}/>
                    <Route path="/ranking" element={<RankingPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </PageProvider>
    )
}