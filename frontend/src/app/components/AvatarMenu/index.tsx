import { api } from "@/app/services/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { theme } from "../../theme";

type Props = {
  id: string;
  name: string;
};
export const AvatarMenu = ({ id, name }: Props) => {
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
    router.refresh();
    handleClose();
  };

  const handleOpenProfile = () => {
    router.push(`/perfil/${id}`);
    handleClose();
  };
  return (
    <>
      <Avatar
        sx={{ background: theme.palette.info.main }}
        alt={name}
        src={process.env.API_Url + `/users/avatar/${id}`}
      />
      <ExpandMoreIcon
        onClick={(event) => handleClick(event)}
        sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
      />
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
