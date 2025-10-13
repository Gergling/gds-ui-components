import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { NAVIGATION_DRAWER_ICON_WIDTH, NAVIGATION_DRAWER_TEXT_MARGIN, NAVIGATION_DRAWER_TEXT_WIDTH } from "../constants"
import { useNavigationDrawer } from "../context";
import { useAppTheme } from "../../theme";
import { useMemo } from "react";

export const NavigationDrawerList = () => {
  const { theme: { transitions: { create } } } = useAppTheme();
  const {
    items,
    props: {
      showItemIcon,
      showItemText,
    },
  } = useNavigationDrawer();

  const {
    iconWidth,
    textMargin,
  } = useMemo(
    () => ({
      iconWidth: showItemIcon ? `${NAVIGATION_DRAWER_ICON_WIDTH}px` : 0,
      textMargin: showItemIcon ? `${NAVIGATION_DRAWER_TEXT_MARGIN}px` : 0,
    }),
    [showItemIcon],
  );
  const textWidth = useMemo(
    () => showItemText ? `${NAVIGATION_DRAWER_TEXT_WIDTH}px` : 0,
    [showItemText],
  );
  return (
    <List>
      {items.map(({ icon, onClick, text }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={onClick} sx={{
            paddingRight: 0,
            paddingLeft: textMargin,
            transition: create('padding-left'),
          }}>
            <ListItemIcon sx={{
              minWidth: iconWidth,
              transition: create(['width', 'min-width']),
              width: iconWidth,
            }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{
              marginLeft: textMargin,
              width: textWidth,
              whiteSpace: 'nowrap',
              transition: create(['width', 'margin-left']),
            }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}