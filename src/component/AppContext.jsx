import React from "react";
export const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [username, setUsername] = React.useState("");

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {props.children}
    </AppContext.Provider>
  );
};
