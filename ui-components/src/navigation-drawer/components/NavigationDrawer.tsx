import { useNavigationDrawer } from "../context";
import { useCallback } from "react";
import { NavigationDrawerList } from "./NavigationDrawerList";
import { Drawer } from "@mui/material";
import { NavigationDrawerBackdrop } from "./NavigationDrawerBackdrop";

export const NavigationDrawer = () => {
  const {
    appHeaderHeight,
    device,
    props,
    setState,
  } = useNavigationDrawer();
  const onClose = useCallback(() => setState(false), [setState]);

  return (
    <Drawer
      variant='permanent'
      open={props.open}
      onClose={onClose}
      slots={{
        backdrop: NavigationDrawerBackdrop
      }}
      sx={{
        display: device === 'mobile' && !props.open ? 'none' : 'block',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginTop: `${appHeaderHeight}px`,
          boxSizing: 'border-box',
        },
      }}
    >
      <NavigationDrawerList />
    </Drawer>
  );
};
