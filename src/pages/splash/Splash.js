import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Splash.css";
import LogoLoader from "../../components/Loader/LoaderLogo";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
        <LogoLoader id="logo" />
    </div>
  );
}

function Splash(props) {
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

  return redirected ? null : (
    <AnimatedSplash theme={props.theme} />
  );
}

export default Splash;

// import React, { Component } from "react";
// import "./Splash.css";
// import LogoLoader from "../../components/Loader/LoaderLogo";
// import { useRoutes, useLocation } from "react-router-dom";

// function AnimatedSplash(props) {
//   return (
//     <div className="logo_wrapper">
//       <LogoLoader id="logo" />
//     </div>
//   );
// }

// class Splash extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirected: false,
//     };
//   }

//   componentDidMount() {
//     this.id = setTimeout(() => this.setState({ redirected: true }), 5500);
//   }

//   componentWillUnmount() {
//     clearTimeout(this.id);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.redirected && !prevState.redirected) {
//       this.props.location.replace("/");
//     }
//   }

//   render() {
//     return this.state.redirected ? null : (
//       <AnimatedSplash theme={this.props.theme} />
//     );  
//   }
// }

// function SplashWrapper(props) {
//   let location = useLocation();
//   return <Splash location={location} {...props} />;
// }

// export default function RoutedSplash(props) {
//   let element = <SplashWrapper {...props} />;
//   let routes = [
//     { path: "*", element: element }
//   ];

//   return useRoutes(routes);
// }


// import React, { Component } from "react";
// import "./Splash.css";
// import LogoLoader from "../../components/Loader/LoaderLogo";
// import { useRoutes } from "react-router-dom";

// function AnimatedSplash(props) {
//   return (
//     <div className="logo_wrapper">
//       <LogoLoader id="logo" />
//     </div>
//   );
// }

// class Splash extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirected: false,
//     };
//   }

//   componentDidMount() {
//     this.id = setTimeout(() => this.setState({ redirected: true }), 5500);
//   }

//   componentWillUnmount() {
//     clearTimeout(this.id);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.redirected && !prevState.redirected) {
//       this.props.navigate("/");
//     }
//   }

//   render() {
//     return this.state.redirected ? null : (
//       <AnimatedSplash theme={this.props.theme} />
//     );  
//   }
// }

// export default function RoutedSplash(props) {
//   const routes = {
//     path: "*",
//     element: <Splash {...props} />,
//   };

//   return useRoutes(routes);
// }
