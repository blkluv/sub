import { Card, CardContent, Typography, Unstable_Grid2, Link } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface UnlockTypeCardProps {
  type: string;
  helperText: string;
  setUnlockType: Dispatch<SetStateAction<string>>;
  unlockType: string;
  title: string;
}
export const UnlockTypeCard = ({
  type,
  title,
  helperText,
  setUnlockType,
  unlockType,
}: UnlockTypeCardProps) => {
  return (
    <Unstable_Grid2 xs={12} sm={6} lg={3}>
      <Link href={`/submarine/${unlockType}`} sx={{ textDecoration: "none" }}>
        <Card
          sx={{
            backgroundImage:
              unlockType === type
                ? `linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)`
                : "#FFFFF",
            height: "100%",
          }}
          onMouseOver={() => setUnlockType(type)}
        >
          <CardContent>
            <Unstable_Grid2 container direction={"column"}>
              <Unstable_Grid2>
                <Typography
                  sx={{
                    color: (theme) => unlockType === type && theme.palette.primary.light,
                    "&:hover": { color: (theme) => theme.palette.primary.light },
                  }}
                  variant="h3"
                >
                  {title}
                </Typography>
              </Unstable_Grid2>
              <Unstable_Grid2>
                <Typography
                  variant="body1"
                  sx={{
                    color: (theme) => unlockType === type && theme.palette.primary.light,
                    "&:hover": { color: (theme) => theme.palette.primary.light },
                  }}
                >
                  {helperText}
                </Typography>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </CardContent>
        </Card>
      </Link>
    </Unstable_Grid2>
  );
};
