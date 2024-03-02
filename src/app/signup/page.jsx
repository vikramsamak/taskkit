import AppHeader from "@/components/SharedComponents/AppHeader";
import PageView from "@/components/SharedComponents/PageView";
import UserSignUpForm from "@/components/User/UserSignUpForm";

export default function SignupPage() {
  return (
    <PageView
      window={
        <section className="flex flex-col h-full justify-center gap-4">
          <AppHeader />
          <UserSignUpForm />
        </section>
      }
    ></PageView>
  );
}
