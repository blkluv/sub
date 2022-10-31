import { Divider, Typography, Unstable_Grid2, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { UnlockTypeCard } from "./UnlockTypeCard";

const UnlockTypeCardFactory = () => {
  const [unlockType, setUnlockType] = useState<string>("");

  const nftText = "Require ownership of a particular NFT to unlock your submarined content.";
  const retweetText =
    "Require a retweet of a specific tweet in order to unlock your submarined content.";
  const locationText =
    "Require someone to verify their current location to unlock your submarined content.";

  return (
    <>
      <Divider />
      <Unstable_Grid2
        container
        direction="row"
        spacing={2}
        sx={{ padding: "1rem", margin: "1rem 0 1rem 0", height: "20rem" }}
      >
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="NFT Ownership"
          unlockType={unlockType}
          helperText={nftText}
          type="nft"
        />
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="Retweet"
          unlockType={unlockType}
          helperText={retweetText}
          type="retweet"
        />
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="Location"
          unlockType={unlockType}
          helperText={locationText}
          type="location"
        />
        <Unstable_Grid2 xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Unstable_Grid2 xs={2}>
                <Typography variant="h1" sx={{ color: "darkGrey" }}>
                  Credit/Debit Card Payment
                </Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={10} sx={{ marginTop: "1em" }}>
                <Typography sx={{ color: "darkGrey" }}>Coming Soon</Typography>
              </Unstable_Grid2>
            </CardContent>
          </Card>
        </Unstable_Grid2>
      </Unstable_Grid2>
    </>
  );
};
export default UnlockTypeCardFactory;
