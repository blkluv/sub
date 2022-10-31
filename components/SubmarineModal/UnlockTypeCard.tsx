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
    <Unstable_Grid2 xs={12} sm={6} md={3}>
      <Link href={`/submarine/${unlockType}`} sx={{ textDecoration: "none" }}>
        <Card
          sx={{
            backgroundImage:
              unlockType === type
                ? `linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)`
                : "#FFFFF",
            "&:hover": { boxShadow: "4px 12px 40px 6px rgba(0, 0, 0, 0.09)" },
            height: "100%",
          }}
          onClick={() => setUnlockType(type)}
        >
          <CardContent>
            <Unstable_Grid2 container direction={"column"}>
              <Unstable_Grid2 xs={2}>
                <Typography sx={{ color: unlockType === type && "#FEFEFE;" }} variant="h1">
                  {title}
                </Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={10} sx={{ marginTop: "1em" }}>
                <Typography sx={{ color: unlockType === type && "#FEFEFE;" }}>
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
