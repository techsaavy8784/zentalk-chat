import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalThemeProps = {
  theme: ThemeProps;
};


const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: #0f0f0f;
    --dark-text: #F5F5F7;

    //light-mode
    --light-background: #EDDDD4;
    --light-text: #2E0509;

    //msgbox
    --dark-msgbox: #191919;
    --light-msgbox: linear-gradient(90deg,rgb(168 189 205),rgb(0 172 221));

    //sidebarform
    --dark-sidebarform: #0f0f0f;
    --light-sidebarform: #edddd4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    margin-bottom: 1px;
  }
  
  header{
    margin: 10px;
    position: fixed;
    top: 0;
    right: 0;

  }

  body  {
    -webkit-font-smoothing: antialiased;        
    height: 93vh;    
    margin: 0 auto;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message-input {
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }

  .message>p {
    background: ${({ theme }: GlobalThemeProps) => theme.messagebox};
    color: white;
  }

  .notification {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .user1_Key {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .message-input {
     color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .room-id {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .info-container {
    background-color: ${({ theme }: GlobalThemeProps) => theme.sidebarform};
  }
`;

export default withTheme(globalStyle);