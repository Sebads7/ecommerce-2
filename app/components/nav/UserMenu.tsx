"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";

import { SafeUser } from "@/types";

interface userMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  // console.log(currentUser);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className=" relative z-30 flex justify-end">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-300 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700  justify-center w-[100%] "
        >
          {currentUser && (
            <div className="pr-2">
              <p>
                <span className="text-slate-800  text-sm ">Welcome: </span>
                {currentUser?.name}
              </p>
            </div>
          )}
          <div className="flex items-center  ">
            <Avatar src={currentUser?.image || ""} />
            <AiFillCaretDown />
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md bg-white overflow-hidden right-0 top-12 text-sm cursor-pointer  w-[200px]  ">
            {!currentUser ? (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Sign up</MenuItem>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="orders-user">
                  <MenuItem onClick={toggleOpen}>Orders</MenuItem>
                </Link>
                <hr />
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Sign out
                </MenuItem>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
