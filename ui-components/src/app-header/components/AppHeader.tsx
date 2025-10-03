import { AppBar, AppBarProps, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export interface AppHeaderProps {
  title?: string;
  toggleMenu: () => void;
  appBarProps?: AppBarProps;
}

export const AppHeader = ({ toggleMenu, title, appBarProps }: AppHeaderProps) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} {...appBarProps}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
