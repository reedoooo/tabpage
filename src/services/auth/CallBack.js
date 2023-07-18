import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/splash/Splash.css';
import LogoLoader from '../../components/Loader/LoaderLogo';

function CallBackSVG() {
  return (
    <div className="logo_wrapper">
      <LogoLoader id="logo" />
    </div>
  );
}

function CallBack() {
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => setRedirected(true), 5500);
    return () => clearTimeout(id);
  }, []); // Only run once, equivalent to componentDidMount

  useEffect(() => {
    if (redirected) {
      navigate('/');
    }
  }, [redirected, navigate]); // Run whenever `redirected` changes

  return redirected ? null : <CallBackSVG />;
}

export default CallBack;
