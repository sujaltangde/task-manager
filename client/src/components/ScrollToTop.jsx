import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the ScrollToTop component
export const ScrollToTop = () => {
  // Get the current pathname from the location hook
  const { pathname } = useLocation();

  // Scroll to the top of the page whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top (x=0, y=0)
  }, [pathname]); // Depend on pathname change

  // Return null because this component does not render anything
  return null;
};