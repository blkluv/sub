import React, { useEffect, useState } from "react";
import LinkTable from "./LinkTable";
import Link from "next/link";
import Alert from "../Alert";
import UpgradeModal from "./UpgradeModal";
import Pagination from "./Pagination";
import Loading from "./Loading";
import placeholder from "../../public/submarine.png";
import { getKy } from "../../helpers/ky";
import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";

const NEW_PLANS = ["Picnic", "Fiesta", "Carnival", "Enterprise"];

const LIMIT = 5;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  useEffect(() => {
    checkForPlan();
  }, []);

  const isValidPaidPlan = (userPlanInfo) => {
    if (
      userPlanInfo?.subscriptionItems[0]?.type === "PROFESSIONAL" ||
      userPlanInfo?.subscriptionItems[0]?.type === "EXTRA_MANAGED_GATEWAY"
    ) {
      return true;
    }

    if (NEW_PLANS.includes(userPlanInfo?.plan?.nickname)) {
      return true;
    }

    return false;
  };

  const checkForPlan = async () => {
    const userPlanInfo = await getUserBillingInfo();
    if (!userPlanInfo) {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else if (!isValidPaidPlan(userPlanInfo)) {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else {
      loadLinks(offset);
    }
  };

  const getUserBillingInfo = async () => {
    try {
      const ky = getKy();
      const res = await ky(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/billing/userStripeCustomer`);

      const userJson = await res.json();
      return userJson;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

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
  const copyLink = (file) => {
    navigator.clipboard.writeText(`${window.location.origin}/${file.short_id}`);
    setMessage({
      type: "success",
      message: "Share link copied!",
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setMessage(null);
    }, 1500);
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
      setMessage({
        type: "error",
        message: "Trouble deleting link",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setMessage(null);
      }, 1500);
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
    <div>
      <Alert showAlert={showAlert} type={message?.type} message={message?.message} />
      {displayUpgradeModal && <UpgradeModal />}
      <div className="h-screen bg-gray container w-full m-auto">
        <main className="sm:w-4/5 sm:m-auto pt-12 sm:pt-24 pb-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="text-center sm:text-left pb-4">
                  <Link passHref href="/submarine/new">
                    <button
                      type="button"
                      className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-pinata-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submarine New File
                    </button>
                  </Link>
                </div>
                {loading ? (
                  <div className="flex flex-row w-full p-20 justify-center">
                    <Loading />
                  </div>
                ) : (
                  <div className="overflow-hidden sm:rounded-lg">
                    <div>
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
