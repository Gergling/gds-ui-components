import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { NAVIGATION_DRAWER_ICON_WIDTH, NAVIGATION_DRAWER_TEXT_MARGIN, NAVIGATION_DRAWER_TEXT_WIDTH } from "../constants"
import { useNavigationDrawer } from "../context";

export const NavigationDrawerList = () => {
  const {
    items,
    props: {
      showItemText,
    },
  } = useNavigationDrawer();
  return (
    <List>
      {items.map(({ icon, onClick, text }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={onClick} sx={{
            paddingRight: 0,
            paddingLeft: `${NAVIGATION_DRAWER_TEXT_MARGIN}px`,
          }}>
            <ListItemIcon sx={{
              minWidth: `${NAVIGATION_DRAWER_ICON_WIDTH}px`,
            }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{
              marginLeft: `${NAVIGATION_DRAWER_TEXT_MARGIN}px`,
              width: showItemText ? `${NAVIGATION_DRAWER_TEXT_WIDTH}px` : 0,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease-in-out',
            }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}