import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useNavigationDrawer } from "../context";
import { NavigationDrawerItem } from "../types";

type NavigationDrawerProps = {
  items: NavigationDrawerItem[];
};

export const NavigationDrawer = ({ items }: NavigationDrawerProps) => {
  // This will all need a context hook.
  const {
    props: {
      open,
      showItemText,
      variant,
    },
    setState,
    appHeaderHeight,
  } = useNavigationDrawer();

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={() => setState(false)}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginTop: `${appHeaderHeight}px`,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {items.map(({ icon, onClick, text }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClick} sx={{
              paddingRight: 0,
            }}>
              <ListItemIcon sx={{
                minWidth: '24px',
              }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{
                marginLeft: '16px',
                width: showItemText ? '120px' : 0,
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease-in-out',
              }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
