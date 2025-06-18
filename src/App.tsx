import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import PipelineEditor from "./components/PipelineEditor";
import theme from "./styles/theme";


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <h1>DevOps Pipeline UI Wizard</h1>
        <PipelineEditor />
      </Container>
    </ThemeProvider>
  );
};

export default App;
