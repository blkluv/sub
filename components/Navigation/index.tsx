/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import ProfileDropDown from "./ProfileDropDown";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUserAvatar } from "../../store/selectors/authSelectors";
import { doLogOut } from "../../store/slices/authSlice";

export default function Navigation() {
  const avatarPath = useAppSelector(selectUserAvatar);
  const isAuthenticated = !!useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(doLogOut());
  };
  const avatar = avatarPath ? `https:${avatarPath}` : "";
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                {/* <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button> */}
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link passHref href="/">
                  <div className="flex-shrink-0 flex items-center cursor-pointer">
                    <Image
                      height={32}
                      width={47}
                      className="block lg:hidden h-8 w-auto"
                      src="/submarine.png"
                      alt="Submarine Me"
                    />

                    <span className="ml-2 text-xl font-extrabold text-gray-900">submarine.me</span>
                  </div>
                </Link>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticated && <ProfileDropDown avatar={avatar} />}
                {isAuthenticated && (
                  <button
                    onClick={handleLogOut}
                    className={
                      "px-4 py-1 rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                    }
                  >
                    {" "}
                    Log out{" "}
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden"></Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
