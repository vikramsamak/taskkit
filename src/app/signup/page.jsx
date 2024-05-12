import PageView from "@/components/SharedComponents/PageView";
import UserSignUpForm from "@/components/User/UserSignUpForm";

export default function SignupPage() {
  return (
    <PageView
      window={
        <section className="flex flex-col h-full justify-center gap-4">
          <div className="flex flex-col py-2 px-2 gap-4 w-full">
            <div className="text-center px-2 py-2">
              <h1 className="text-4xl font-mono tracking-widest">TASKKIT</h1>
            </div>
            <div className="text-center px-2 py-2">
              <p className="text-lg font-mono tracking-wider">
                All your tools in one place for maximum efficiency
              </p>
            </div>
          </div>
          <UserSignUpForm />
        </section>
      }
    ></PageView>
  );
}
