"use client";

import React from "react";
import AdminNavItems from "./AdminNavItems";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-2- border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItems
              label="Sumary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItems
              label="Addproducts"
              icon={MdLibraryAdd}
              selected={pathname === "/admin-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItems
              label="ManageProducts"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItems
              label="ManageOrders"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
