import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import "./Home.scss";
import Postfeed from "./Postfeed/Postfeed";

const Home = () => {
  const { posts, loading, error } = useAppContext();

  return (
    <main className="app__home">
      {!error && loading && (
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={120} />
        </Stack>
      )}
      {!loading && error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>Refresh the page or come back later!</strong>
        </Alert>
      )}
      {!loading && !error && posts && <Postfeed posts={posts} />}
    </main>
  );
};

export default Home;
