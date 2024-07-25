export interface ThemeProps {
    background: string;
    text: string;
    messagebox: string,
    sidebarform: string
  }
  
  export const darkTheme: ThemeProps = {
    background: 'var(--dark-background)',
    text: 'var(--dark-text)',
    messagebox: 'var(--dark-msgbox)',
    sidebarform: 'var(--dark-sidebarform)'
  };
  
  export const lightTheme: ThemeProps = {
    background: 'var(--light-background)',
    text: 'var(--light-text)',
    messagebox: 'var(--light-msgbox)',
    sidebarform: 'var(--light-sidebarform)'
  };