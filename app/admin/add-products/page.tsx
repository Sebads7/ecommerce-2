import React from "react";
import AddProductForm from "./AddProductForm";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUsers";
import NullData from "@/app/components/products/NullData";

const Addproducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Access denied, you must be an admin to access this page" />
    );
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Addproducts;
