import { getCurrentUser } from "@/actions/getCurrentUsers";
import Container from "../components/products/Container";
import FormWrap from "../components/products/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Login;
