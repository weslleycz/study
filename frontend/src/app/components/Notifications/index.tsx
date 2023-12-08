import { api } from "@/app/services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, Menu } from "@mui/material";
import { useState } from "react";

type Props = {
  notifications: any[];
  setNotifications: any;
};

export const Notifications = ({ notifications, setNotifications }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id:string) => {
    try {
      const res = await api.delete(`/notifications/${id}`);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Badge
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        badgeContent={notifications.length}
        color="info"
      >
        <NotificationsIcon sx={{cursor: "pointer"}} color="primary" />
      </Badge>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {notifications.map((notification) => (
          <>
            <Box
              sx={{ border: "4px solid #e7e9f6ac", borderRadius: "8px" }}
              p={1}
              bgcolor={"#ffffffea"}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <DeleteIcon
                  color="primary"
                  sx={{ marginRight: 1, cursor: "pointer" }}
                  onClick={() => handleDelete(notification.id)}
                />
                <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                  {notification.title}
                </span>
              </div>
              <span>{notification.text}</span>
            </Box>
          </>
        ))}
      </Menu>
    </>
  );
};
