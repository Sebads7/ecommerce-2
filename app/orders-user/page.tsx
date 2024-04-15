import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUsers";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrdersByUser from "@/actions/getOrdersByUser";

const UserOrder = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Please, log in or sign up"></NullData>;
  }

  const orders = await getOrdersByUser(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet" />;
  }

  return (
    <div>
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default UserOrder;
