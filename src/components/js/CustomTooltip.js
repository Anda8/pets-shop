import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CustomTooltip() {
  // tooltip for favorite icon
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
  }));
  return (
    <>
      <CustomTooltip title="Wishlist" placement="left" arrow>
        <FavoriteBorderIcon />
      </CustomTooltip>
    </>
  );
}
