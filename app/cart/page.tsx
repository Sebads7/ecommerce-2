import { getCurrentUser } from "@/actions/getCurrentUsers";
import Container from "../components/Container";
import CartClient from "./CartClient";

const CartPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default CartPage;
