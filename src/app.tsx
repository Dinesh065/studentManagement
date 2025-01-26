import React from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter import

// Third-party imports first
import { Fab } from '@mui/material'; // Example: if you have third-party imports
import { useScrollToTop } from 'src/hooks/use-scroll-to-top'; // Custom hook
import { Iconify } from 'src/components/iconify';  // Custom component for icons

// Local imports after third-party imports
import LoginPage from "./pages/login-page";
import StudentsPage from "./pages/students-page";
import 'src/global.css'; // Global CSS file

export default function App() {
  // Scroll to top on route change
  useScrollToTop();

  // GitHub floating action button
  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
      {githubButton}  {/* GitHub button stays fixed */}
    </>
  );
}
