import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import LinkTable from "./LinkTable";
import Link from "next/link";
import Alert from "../Alert";
import { useSubmarine } from "../../hooks/useSubmarine";
import { mockData } from "./mockData";
import ky from "ky";
import { useAuth } from "../../hooks/useAuth";
import UpgradeModal from "./UpgradeModal";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);

  const { getHeaders } = useSubmarine();
  const { plan } = useAuth();
  useEffect(() => {
    if(plan && plan === 'PROFESSIONAL') {
      loadLinks();
    } else if(plan) {
      setDisplayUpgradeModal(true)
    }
  }, [plan]);

  const loadLinks = async () => {
    // const res = await getSubmarinedContent()
    const headers = await getHeaders();
    const res = await ky("/api/metadata",  {
      method: "GET",
      headers: {
        ...headers
      }
    })

    const json = await res.json();

    setFiles(json);
    // const res = mockData();
    // setFiles(res);
  }
  const copyLink = (file) => {
    navigator.clipboard.writeText(`${window.location.origin}/${file.short_id}`);
    setMessage({
      type: "success", 
      message: "Share link copied!"
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setMessage(null);      
    }, 1500);
  };
  return (
    <div>
      <Navigation />
      <Alert
        showAlert={showAlert}
        type={message?.type}
        message={message?.message}
      />
      {
        displayUpgradeModal && 
        <UpgradeModal />
      }      
      <div className="h-screen bg-gray container w-full m-auto">
        <main className="pt-24 pb-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <Link href="/submarine/new">
                  <button
                    type="button"
                    className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submarine New File
                  </button>
                </Link>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <LinkTable copyLink={copyLink} files={files} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
