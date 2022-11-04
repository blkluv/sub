import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Plan } from "../../store/legacy/billing/types";
import { Gateways } from "../../store/legacy/gateways/types";
import { uniqueNamesGenerator, NumberDictionary, colors, animals } from "unique-names-generator";
import { useTheme, styled } from "@mui/material/styles";
import picnicImg from "./dialogs/picnicplan.png";
import fiestaImg from "./dialogs/fiestaplan.png";
import carnivalImg from "./dialogs/carnivalplan.png";
import { useRouter } from "next/router";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BASE_GATEWAY = process.env.REACT_APP_PINATA_GATEWAY_BASE || "mypinata.cloud";

const PinataDialogTitleImage = styled(DialogTitle)<DialogTitleProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "240px",
}));

enum NewGatewayStatus {
  CREATING,
  CREATED,
  ERROR,
  NO_NEED,
}

interface AfterUpdatePlanDialogProps {
  createGateway: (gatewayInfo: any, update: boolean) => any;
  newPlan: Plan;
  gateways: Gateways;
  onClose: () => any;
}

const adjectives = [
  "able",
  "above",
  "absent",
  "absolute",
  "abstract",
  "abundant",
  "academic",
  "acceptable",
  "accepted",
  "accessible",
  "accurate",
  "accused",
  "active",
  "actual",
  "acute",
  "added",
  "additional",
  "adequate",
  "adjacent",
  "administrative",
  "adorable",
  "advanced",
  "adverse",
  "advisory",
  "big",
  "binding",
  "biological",
  "bitter",
  "bizarre",
  "blank",
  "bright",
  "brilliant",
  "broad",
  "calm",
  "capable",
  "capitalist",
  "careful",
  "casual",
  "causal",
  "cautious",
  "central",
  "certain",
  "changing",
  "characteristic",
  "charming",
  "cheap",
  "cheerful",
  "chemical",
  "dear",
  "decent",
  "decisive",
  "deep",
  "defeated",
  "defensive",
  "defiant",
  "definite",
  "deliberate",
  "delicate",
  "effective",
  "efficient",
  "elaborate",
  "elderly",
  "eldest",
  "electoral",
  "electric",
  "electrical",
  "electronic",
  "elegant",
  "eligible",
  "faithful",
  "familiar",
  "famous",
  "fancy",
  "fantastic",
  "far",
  "fascinating",
  "fashionable",
  "fast",
  "general",
  "generous",
  "genetic",
  "gentle",
  "genuine",
  "geographical",
  "giant",
  "gigantic",
  "given",
  "glad",
  "glamorous",
  "hidden",
  "high",
  "hilarious",
  "historic",
  "historical",
  "hollow",
  "holy",
  "imaginative",
  "immediate",
  "immense",
  "imperial",
  "implicit",
  "important",
  "impossible",
  "impressed",
  "impressive",
  "improved",
  "junior",
  "just",
  "keen",
  "key",
  "kind",
  "known",
  "labour",
  "large",
  "late",
  "lazy",
  "leading",
  "left",
  "legal",
  "legislative",
  "mad",
  "magic",
  "magnetic",
  "magnificent",
  "main",
  "major",
  "managerial",
  "managing",
  "manual",
  "many",
  "naval",
  "near",
  "nearby",
  "neat",
  "necessary",
  "negative",
  "neighbouring",
  "obedient",
  "objective",
  "obliged",
  "obvious",
  "occasional",
  "occupational",
  "odd",
  "official",
  "passive",
  "past",
  "patient",
  "payable",
  "peaceful",
  "peculiar",
  "perfect",
  "permanent",
  "persistent",
  "personal",
  "petite",
  "quick",
  "quickest",
  "quiet",
  "rainy",
  "random",
  "rapid",
  "rare",
  "rational",
  "raw",
  "ready",
  "real",
  "realistic",
  "rear",
  "reasonable",
  "recent",
  "secondary",
  "secret",
  "secure",
  "select",
  "selected",
  "selective",
  "solid",
  "sophisticated",
  "tiny",
  "tired",
  "top",
  "total",
  "tough",
  "traditional",
  "tragic",
  "tremendous",
  "tricky",
  "tropical",
  "urban",
  "urgent",
  "used",
  "useful",
  "voluntary",
  "wonderful",
  "wooden",
  "working",
  "worldwide",
  "worried",
  "worrying",
  "worthwhile",
  "worthy",
  "written",
  "wrong",
];

export const AfterUpdatePlanDialog = (props: AfterUpdatePlanDialogProps) => {
  const { newPlan, gateways, onClose } = props;
  const [open, setOpen] = useState(false);
  const [newGatewayName, setNewGatewayName] = useState("");
  const [newGatewayStatus, setNewGatewayStatus] = useState<NewGatewayStatus>(
    NewGatewayStatus.NO_NEED
  );

  const router = useRouter();
  const theme = useTheme();

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const handleNewGateway = async () => {
    setNewGatewayStatus(NewGatewayStatus.CREATING);
    const numberDictionary = NumberDictionary.generate({ min: 1, max: 999 });
    const lowerCaseName: string = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals, numberDictionary],
      style: "lowerCase",
      separator: "-",
    });

    const newGatewayRes = await props.createGateway({ subdomain: lowerCaseName }, false);

    if (newGatewayRes) {
      setNewGatewayName(lowerCaseName);
      setNewGatewayStatus(NewGatewayStatus.CREATED);
    } else {
      setNewGatewayStatus(NewGatewayStatus.ERROR);
    }
  };

  useEffect(() => {
    setOpen(true);
    if (newPlan.gateway_count_limit > 0 && gateways.count === 0) {
      handleNewGateway();
    } else if (gateways.count > 0) {
      setNewGatewayStatus(NewGatewayStatus.NO_NEED);
    }
  }, []);

  const planImg =
    newPlan?.nickname === "Picnic"
      ? picnicImg
      : newPlan?.nickname === "Fiesta"
      ? fiestaImg
      : carnivalImg;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
      <PinataDialogTitleImage
        sx={{
          padding: 0,
          backgroundImage: `url(${planImg}), linear-gradient(180deg, #D3E5FF 0%, #CCF1DF 100%)`,
        }}
        component={"div"}
      >
        <Box sx={{ paddingX: 12 }}>
          <Typography>New Plan</Typography>
          <Typography variant="h1">{newPlan?.nickname}</Typography>
        </Box>
        <HighlightOffIcon
          sx={{ alignSelf: "start", ml: "auto", mr: 3, mt: 3, cursor: "pointer" }}
          aria-label="close"
          onClick={handleClose}
          color={"primary"}
        />
      </PinataDialogTitleImage>
      <DialogContent sx={{ paddingX: 12, marginTop: 2 }}>
        <Typography variant="body2" sx={{ lineHeight: 3 }}>
          Congrats! You have upgraded to the {newPlan?.nickname} Plan.
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 3 }}>
          You can now pin{" "}
          <Typography fontWeight={900} component={"span"}>
            {newPlan?.pin_total_limit} files{" "}
          </Typography>
          and have a total storage of{" "}
          <Typography fontWeight={900} component={"span"}>
            {newPlan?.storage_limit_gb} GB.
          </Typography>
        </Typography>
        {newGatewayStatus === NewGatewayStatus.CREATED && (
          <>
            <Typography variant="body2">
              One of the most exciting parts is that you have now your{" "}
              <Typography fontWeight={900} component={"span"}>
                own dedicated gateway.
              </Typography>
            </Typography>
            <Typography variant="body2">
              We have{" "}
              <Typography fontWeight={900} component={"span"}>
                automatically created a gateway
              </Typography>{" "}
              for you which includes{" "}
              <Typography fontWeight={900} component={"span"}>
                {newPlan?.bandwidth_limit_gb} GB.
              </Typography>{" "}
              of bandwidth!
            </Typography>
            <Typography sx={{ marginTop: 4 }}>
              Your dedicated gateway name
              <Tooltip
                title={"You can customize your gateways under the gateway menu section."}
                placement={"top"}
                arrow
              >
                <HelpOutlineIcon sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Typography>
            <Box
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.grey["200"],
                borderRadius: "16px",
                marginBottom: 4,
              }}
            >
              <Typography fontWeight={900}>
                {newGatewayName}.{BASE_GATEWAY}
              </Typography>
            </Box>
          </>
        )}{" "}
        {newGatewayStatus === NewGatewayStatus.CREATING && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">We&apos;re creating a gateway for you</Typography>
            <CircularProgress color="primary" />
          </Box>
        )}
        {newGatewayStatus === NewGatewayStatus.NO_NEED && (
          <Typography variant="body2">
            One of the most exciting part is that you can{" "}
            <Typography fontWeight={900} component={"span"}>
              own 3 dedicated gateways
            </Typography>{" "}
            now which includes{" "}
            <Typography fontWeight={900} component={"span"}>
              {newPlan?.bandwidth_limit_gb} GB.
            </Typography>{" "}
            of bandwidth!
          </Typography>
        )}
        {newGatewayStatus === NewGatewayStatus.ERROR && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2">
              Whoops! We couldn&apos;t auto-create gateway at this time
            </Typography>
            <Button onClick={handleNewGateway}>Try Again</Button> or{" "}
            <Link href={"/gateway"}>Go to gateways page</Link>
          </Box>
        )}
        <Typography variant={"caption"}>
          Want to know more about your plan or have information about gateways?{" "}
        </Typography>
        <Typography variant={"caption"}>
          Learn more about gateways{" "}
          <Link href={"https://knowledge.pinata.cloud/en/collections/3090434-gateways"}>here</Link>,
          still confused? Here are the <Link href={"https://docs.pinata.cloud/"}>docs</Link> :){" "}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => router.push("/pinmanager")}>Start Exploring</Button>
      </DialogActions>
    </Dialog>
  );
};
