import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Menu, MenuItem, Box, Badge, Stack } from "@mui/material";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness1Icon from "@mui/icons-material/Brightness1";

import { theme } from "../../theme";
import { AccountCircle } from "@mui/icons-material";

type Props = {
  name: string;
};
export const AvatarMenu = ({ name }: Props) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.API_Url}/notifications?id=${getCookie("id")}`
    );

    eventSource.onmessage = (event) => {
      // Manipular os dados recebidos do servidor
      const data = JSON.parse(event.data);
      console.log(data);
      setNotifications(data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoff = () => {
    deleteCookie("token");
    deleteCookie("id");
    router.refresh();
    handleClose();
  };

  const handleOpenProfile = () => {
    router.push(`/perfil/${getCookie("id")}`);
    handleClose();
  };
  return (
    <>
      {" "}
      <Stack direction="row" spacing={3}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Badge badgeContent={0} color="info">
            <InsertCommentIcon color="primary" />
          </Badge>
          <Badge badgeContent={notifications.length} color="info">
            <NotificationsIcon color="primary" />
          </Badge>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                background: theme.palette.info.main,
                marginRight: 0.2,
              }}
              alt="User Avatar"
              src={process.env.API_Url + `/users/avatar/${getCookie("id")}`}
            />
            <Brightness1Icon sx={{ color: "#2CCA37", fontSize:13 }} />
          </Box>

          <ExpandMoreIcon
            onClick={(event) => handleClick(event)}
            sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
          />
        </Box>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleLogoff}>Sair</MenuItem>
      </Menu>
    </>
  );
};
