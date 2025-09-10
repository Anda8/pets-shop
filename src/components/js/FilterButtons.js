import { ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";

export default function FilterButtons({ value, options, onChange }) {
  const theme = useTheme();
  //   FILTER products category
  return (
    <>
    {/*  {/* <ToggleButtonGroup
               
                
                    {type
                      .split("-")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup> */} 
      {/* FILTER BUTTONS  */}
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
        sx={{
          my: 4,
          width: "100%",
          gap: "15px",
        }}
      >
        {options.map((type) => (
          <ToggleButton
            key={type}
            value={type}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color: theme.palette.text.secondary,
              border: "none",
              borderBottom: `4px solid ${theme.palette.background.default}`,
              "&.Mui-selected": {
                color: theme.palette.text.primary,
                borderBottom: `4px solid ${theme.palette.primary.main}`,
                borderRadius: 0,
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {type.split("-")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {/* ======== FILTER BUTTONS =======  */}
    </>
  );
}
