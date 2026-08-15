import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Set document favicon dynamically using lightweight SVG data URI
const svgFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="%2315803d"/><path d="M11 1a15 15 0 0 1 10 0v30a15 15 0 0 1-10 0z" fill="%23ffffff"/><path d="M21 1.7a15 15 0 0 1 0 28.6v-28.6z" fill="%23dc2626"/><circle cx="16" cy="16" r="15" fill="none" stroke="%23f59e0b" stroke-width="2"/><path d="M16 8c-3 4-2 7 0 9 2-2 3-5 0-9z" fill="%23ea580c"/><path d="M16 11c-1.5 2-1 3.5 0 4.5 1-1 1.5-2.5 0-4.5z" fill="%23fde047"/></svg>`;

const existingFavicon = document.querySelector("link[rel*='icon']");
if (existingFavicon) {
  existingFavicon.setAttribute('href', svgFavicon);
} else {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = svgFavicon;
  document.head.appendChild(link);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


