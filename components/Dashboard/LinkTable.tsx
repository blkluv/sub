import { PencilAltIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const LinkTable = ({ files, copyLink, setOpen, open, handleDelete, loadLinks, getThumbnail }) => {
  const [file, setFile] = useState(null);

  const openDeleteModal = (thisFile) => {
    setFile(thisFile);
    setOpen(true);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <List>
        {files.map((file) => {
          return (
            <div key={file.id}>
              <ListItem
                secondaryAction={
                  <Unstable_Grid2 container>
                    <Link
                      passHref
                      href={`/submarine/${file?.unlock_info?.type}?edit=${file.short_id}`}
                    >
                      <IconButton edge="end" aria-label="edit">
                        <PencilAltIcon width={"1.5rem"} />
                      </IconButton>
                    </Link>
                    <IconButton edge="end" onClick={() => copyLink(file)}>
                      <ShareIcon width={"1.5rem"} />
                    </IconButton>
                    <IconButton onClick={(file) => openDeleteModal(file)} aria-label="delete">
                      <TrashIcon width={"1.5rem"} />
                    </IconButton>
                  </Unstable_Grid2>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <Image
                      alt="Thumbnail"
                      layout="fixed"
                      style={{
                        borderRadius: "9999px",
                      }}
                      src={getThumbnail(file)}
                      height={40}
                      width={40}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">{file.name}</Typography>}
                  disableTypography
                  secondary={
                    <>
                      <Typography variant="subtitle2">
                        {file.unlock_info?.type}
                        {file?.unlock_info?.type === "nft" &&
                          ` - ${file?.unlock_info?.blockchain}`}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: (theme) => theme.palette.grey[600] }}
                      >
                        {makeDatePretty(file.created_at)}
                      </Typography>
                      <Typography
                        sx={{
                          display: isMobile ? "none" : "block",
                          color: (theme) => theme.palette.grey[600],
                        }}
                        variant="body2"
                      >
                        {file.submarine_cid}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
      <DeleteModal
        file={file}
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        loadLinks={loadLinks}
      />
    </>
  );
};

export default LinkTable;

const makeDatePretty = (date, locale?): string => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  switch (locale) {
    case "en":
      return `${month}/${day}/${year}`;
    default:
      return `${month}/${day}/${year}`;
  }
};
