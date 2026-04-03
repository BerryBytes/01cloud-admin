import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import MainRouter from "./MainRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearCache from "react-clear-cache";

function App() {
  return (
    <div className="masterContainer">
      <ClearCache auto={true}>
        {({ isLatestVersion, emptyCacheStorage }) => (
          <div className="Cache-block">
            {!isLatestVersion && (
              <p> Click here for&nbsp;
                <button
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    emptyCacheStorage();
                  }}
                >
                  Updated version
                </button>
                &nbsp;of app
              </p>
            )}
          </div>
        )}
      </ClearCache>
      <ThemeProvider theme={theme}>
        <MainRouter />
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
