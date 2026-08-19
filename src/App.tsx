import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { HomeTuitionsPage } from './pages/HomeTuitionsPage';
import { TuitionCenterPage } from './pages/TuitionCenterPage';
import { OnlineClassesPage } from './pages/OnlineClassesPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { PageLayout } from './components/layout/PageLayout';

const NotFoundPage: React.FC = () => (
  <PageLayout>
    <div className="py-24 text-center space-y-6 max-w-md mx-auto px-4">
      <h1 className="text-6xl font-black text-roar-blue">404</h1>
      <h2 className="text-2xl font-bold text-roar-navy">Page Not Found</h2>
      <p className="text-slate-600 text-sm">
        The page you are looking for might have been moved or does not exist.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-3 bg-roar-blue text-white font-bold rounded-xl shadow-md hover:bg-roar-blue-hover transition-all text-sm"
      >
        Return to Home Page
      </Link>
    </div>
  </PageLayout>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/home-tuitions" element={<HomeTuitionsPage />} />
        <Route path="/services/tuition-center" element={<TuitionCenterPage />} />
        <Route path="/services/online-classes" element={<OnlineClassesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/dashboard/:role?" element={<DashboardPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
