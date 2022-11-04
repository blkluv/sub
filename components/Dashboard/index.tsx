import { useEffect, useState } from "react";
import LinkTable from "./LinkTable";
import Link from "next/link";
import Pagination from "./Pagination";
import Loading from "./Loading";
import placeholder from "../../public/submarine.png";
import { getKy } from "../../helpers/ky";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { setAlert } from "../../store/slices/alertSlice";
import { Button, Unstable_Grid2 } from "@mui/material";

const LIMIT = 5;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  useEffect(() => {
    loadLinks(offset);
  }, []);

  const handleChangePage = async (direction) => {
    let newOffset = offset;

    if (direction === "forward") {
      newOffset = offset + LIMIT;
    } else {
      if (offset > 0) {
        newOffset = offset - LIMIT;
      }
    }
    setLoading(true);
    const json = await loadLinks(newOffset);
    if (json && json.length > 0) {
      setOffset(newOffset);
    }
    setLoading(false);
  };

  const loadLinks = async (newOffset) => {
    const ky = getKy();
    const res = await ky.get(`/api/metadata?offset=${newOffset}`);

    const json = await res.json();
    if (json && json.length > 0) {
      setFiles(json);
    }

    setLoading(false);
    return json;
  };
  const dispatch = useAppDispatch();
  const copyLink = (file) => {
    navigator.clipboard.writeText(`${window.location.origin}/${file.short_id}`);
    dispatch(
      setAlert({
        type: "success",
        message: "Share link copied!",
      })
    );
  };

  const handleDelete = async (id) => {
    try {
      const ky = getKy();
      await ky(`/api/metadata`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        timeout: 2147483647,
      });
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Error deleting link" }));
    }
  };

  const getThumbnail = (file) => {
    if (file.thumbnail) {
      return `${gatewayUrl}/ipfs/${file.thumbnail}`;
    } else {
      return placeholder;
    }
  };

  return (
    <>
      <Unstable_Grid2 container justifyContent={"space-between"} direction="column">
        <Link passHref href="/submarine/new">
          <Button>Submarine New File</Button>
        </Link>
        {loading ? (
          <Unstable_Grid2 container justifyContent={"center"}>
            <Loading />
          </Unstable_Grid2>
        ) : (
          <>
            <LinkTable
              copyLink={copyLink}
              files={files}
              handleDelete={handleDelete}
              open={open}
              setOpen={setOpen}
              loadLinks={loadLinks}
              getThumbnail={getThumbnail}
            />
            <Pagination handlePageChange={handleChangePage} />
          </>
        )}
      </Unstable_Grid2>
    </>
  );
};

export default Dashboard;
