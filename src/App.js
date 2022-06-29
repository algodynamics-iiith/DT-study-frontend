import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import CodeEditor from "./pages/CodeEditor";
import CodeDebugger from "./pages/CodeDebugger";
import QuizPage from "./pages/Quiz";
import { useEffect, useState } from "react";
import client from "./pages/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const App = ({ element }) => {
  let [rollNo, setRollNo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    console.log(process.env.PUBLIC_URL);
    if (localStorage.getItem("userId") != null) {
      getAlgorithm(localStorage.getItem("userId"));
    } else {
      if (window.location.pathname.slice(18) !== "/home") {
        //Add swal and absolute address
        window.location.href = process.env.PUBLIC_URL + "/home";
      }
    }

    // Add full screen event listener
    [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
    ].forEach((fchange) =>
      document.addEventListener(fchange, () => {
        // if (isFullScreen) setIsFullScreen(false);
        // else
        if (document.fullscreenElement) setIsFullScreen(true);
        else if (document.mozFullScreenElement) setIsFullScreen(true);
        else if (document.webkitFullscreenElement) setIsFullScreen(true);
        else setIsFullScreen(false);
      })
    );
    // return () => {
    //   // Remove full screen event listener
    //   [
    //     "fullscreenchange",
    //     "webkitfullscreenchange",
    //     "mozfullscreenchange",
    //   ].forEach((fchange) =>
    //     document.removeEventListener(fchange, () => {
    //       if (document.fullscreenElement) setIsFullScreen(true);
    //       else if (document.mozFullScreenElement) setIsFullScreen(true);
    //       else if (document.webkitFullscreenElement) setIsFullScreen(true);
    //       else setIsFullScreen(false);
    //     })
    //   );
    // };
  }, []);

  const getAlgorithm = async (input) => {
    let final = "/getAlgorithm/" + input;
    await client
      .get(final)
      .then((response) => {
        let current = parseInt(localStorage.getItem("current"));
        let desiredPath = JSON.parse(localStorage.getItem("path"))[current];
        setRollNo(response.data.rollno);
        if (
          current !== 2 &&
          window.location.pathname.slice(18) !== desiredPath
        ) {
          // remove '/' from beginning of path
          window.location.href = process.env.PUBLIC_URL + desiredPath;
        }
        if (
          current === 2 &&
          window.location.pathname.slice(18) !== desiredPath
        ) {
          window.location.href = desiredPath;
        }
      })
      .catch((error) => {
        if (window.location.pathname.slice(18) !== "/home") {
          //Add swal and absolute address
          window.location.href = process.env.PUBLIC_URL + "/home";
        }
      });
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen({ navigationUI: "hide" });
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen({ navigationUI: "hide" });
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen({ navigationUI: "hide" });
      }
    }
  };

  // window.addEventListener("resize", () => {
  //   setTimeout(() => {
  //     if (
  //       document.mozFullScreenElement ||
  //       document.webkitCurrentFullScreenElement ||
  //       document.fullscreenElement
  //     ) {
  //       console.log("FullScreen");
  //     }
  //   }, 100);
  // });

  if (!isFullScreen) {
    Swal.fire({
      title: "Full Screen Mode",
      text: "This test requires you to be in full screen mode",
      icon: "info",
      confirmButtonText: "Enter Full Screen",
      confirmButtonColor: "#00bcd4",
      showCloseButton: true,
      // Add function to close button
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        toggleFullScreen();
      } else if (result.dismiss === "close") {
        console.log("clicked x");
      }
    });
  }
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-gray-800 flex justify-between py-4 px-2 text-md text-gray-100 font-bold">
        <h1 className="text-xl">Algodynamics Driving Test Study</h1>
        <div className="flex w-1/6 justify-end items-center">
          <h1 className="texl-lg px-4 ">{rollNo}</h1>
          <button onClick={toggleFullScreen} className="px-2">
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
          </button>
          <p>Full Screen: {isFullScreen ? "Yes" : "No"}</p>
          {/* <button onClick={checkFullScreen}>check</button> */}
        </div>
      </div>
      {/* <div className="flex-grow flex overflow-hidden"> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/code" element={<CodeEditor />} />
          <Route exact path="/debug" element={<CodeDebugger />} />
          <Route exact path="/quiz" element={<QuizPage />} />
          {/* Error for all other paths */}
          <Route element={() => <div>Hello World</div>} />
          {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      {/* </div> */}
      <div id="footer" className="flex bg-gray-500 justify-center">
        <h3>Copyright © 2020-2022, Algodynamics</h3>
      </div>
    </div>
  );
};

export default App;
