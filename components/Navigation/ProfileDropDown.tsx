import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useAppDispatch } from "../../store/hooks";
import { doLogOut } from "../../store/slices/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropDown = ({ avatar }) => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(doLogOut());
  };
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm outline-none">
          <span className="sr-only">Open user menu</span>
          {avatar && (
            <Image className="h-8 w-8 rounded-full" src={avatar} alt="avatar" layout="fill" />
          )}
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
          {/* <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogOut}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropDown;
