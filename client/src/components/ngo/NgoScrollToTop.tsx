import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Instantly scroll to top whenever the path changes
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}