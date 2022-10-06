/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import MainLandingContent from "./MainLandingContent";

interface PreviewModalProps {
  previewOpen;
  setPreviewOpen;
  fileInfo: MetadataUnlockInfo;
}
export default function PreviewModal({ previewOpen, setPreviewOpen, fileInfo }: PreviewModalProps) {
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  return (
    <Transition.Root show={previewOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setPreviewOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl md:max-w-3xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <MainLandingContent
                      isPreview={true}
                      missing={false}
                      fileInfo={fileInfo}
                      gatewayUrl={gatewayUrl}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pinata-purple text-base font-medium text-white outline-none sm:text-sm"
                  onClick={() => setPreviewOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
