import React from 'react';
import './styles.css';
import ChatbarComponent from './components/chat';
import { ThemeProvider } from 'styled-components';
import TogglerButton from './components/ToggleButton';
import GlobalStyle from './components/styles/global';
import ThemeContext from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './components/styles/themes';
import useThemeMode from './hooks/useThemeMode';

function App() {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <header>
          <TogglerButton themeToggler={themeToggler} />
        </header>
        <ChatbarComponent />                
      </ThemeProvider>
    </ThemeContext>
  );
}



export default App;
