import PageView from "@/components/SharedComponents/PageView";
import UserSignUpForm from "@/components/User/UserSignUpForm";

export default function SignupPage() {
  return <PageView window={<UserSignUpForm />}></PageView>;
}
