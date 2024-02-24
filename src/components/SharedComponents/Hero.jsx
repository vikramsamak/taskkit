import UserLoginButton from "../User/UserLoginButton";

function Hero() {
  return (
    <section className="flex flex-col py-4 px-4 gap-4">
      <div className="text-center px-2 py-2">
        <h1 className="text-8xl font-mono tracking-widest">TASKKIT</h1>
      </div>
      <div className="text-center px-2 py-2">
        <p className="text-lg font-mono tracking-wider">
          All your tools in one place for maximum efficiency
        </p>
      </div>
      <div className="flex w-full justify-center items-center">
        <UserLoginButton />
      </div>
    </section>
  );
}

export default Hero;
