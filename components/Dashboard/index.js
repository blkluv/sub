import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import LinkTable from "./LinkTable";
import Link from "next/link";
import Alert from "../Alert";
import { useSubmarine } from "../../hooks/useSubmarine";
import ky from "ky";
import { fetchSession } from "../../hooks/useAuth";
import UpgradeModal from "./UpgradeModal";
import Pagination from "./Pagination";
import Loading from "./Loading";

const LIMIT = 10;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { getHeaders } = useSubmarine();
  useEffect(() => {
    checkForPlan();
  }, []);

  const checkForPlan = async () => {
    const userPlanInfo = await getUserBillingInfo();
    if (!userPlanInfo) {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else if (userPlanInfo?.subscriptionItems[0]?.type !== "PROFESSIONAL") {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else {
      loadLinks(offset);
    }
  };

  const getUserBillingInfo = async () => {
    const { accessToken } = await fetchSession();
    try {
      const res = await ky(
        `${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/userStripeCustomer`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            source: "login",
          },
        }
      );

      const userJson = await res.json();
      return userJson;
    } catch (error) {
      console.log(error);
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

    const json = await loadLinks(newOffset);
    if (json && json.length > 0) {
      setOffset(newOffset);
    }
  };

  const loadLinks = async (newOffset) => {
    // const res = await getSubmarinedContent()
    const headers = await getHeaders();
    const res = await ky(`/api/metadata?offset=${newOffset}`, {
      method: "GET",
      headers: {
        ...headers,
      },
    });

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
      const headers = await getHeaders();
      await ky(`/api/metadata`, {
        method: "DELETE",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
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

  return (
    <div>
      <Navigation />
      <Alert
        showAlert={showAlert}
        type={message?.type}
        message={message?.message}
      />
      {displayUpgradeModal && <UpgradeModal />}
      <div className="h-screen bg-gray container w-full m-auto">
        <main className="pt-24 pb-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <Link href="/submarine/new">
                  <button
                    type="button"
                    className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-pinata-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submarine New File
                  </button>
                </Link>
                {
                  loading ? 
<div className="flex flex-row w-full p-20 justify-center">
                      <Loading />
                    </div> : 
                       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  
                       <div>
                         <LinkTable
                           copyLink={copyLink}
                           files={files}
                           handleDelete={handleDelete}
                           open={open}
                           setOpen={setOpen}
                           loadLinks={loadLinks}
                         />
                         {files.length >= LIMIT && (
                           <Pagination
                             offset={offset}
                             handlePageChange={handleChangePage}
                             LIMIT={LIMIT}
                           />
                         )}
                       </div>
                   </div>
                }
             
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
