import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUsers";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";

const ManageOrderClient = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Access denied, you must be an admin to access this page" />
    );
  }
  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrderClient;
