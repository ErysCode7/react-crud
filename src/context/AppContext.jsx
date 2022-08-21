import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { data, loading, error } = useAxios(`http://localhost:3500/posts`);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const AppContextValue = { posts, setPosts, loading, error };

  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
