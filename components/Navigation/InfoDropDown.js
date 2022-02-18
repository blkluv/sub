import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const InfoDropDown = () => {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none outline-none">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">More Info</span>
            <QuestionMarkCircleIcon
              className="h-6 w-6 mr-2"
              aria-hidden="true"
            />
          </button>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            
              <a
                href="#"
                className={classNames(
                  "bg-gray-100",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                submarine.me is a product by Pinata. It allows creators to lock their content behind various unlocking mechanisms (NFT ownership, retweets, payments, etc) and share content through a link.
              </a>
           
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default InfoDropDown;
