"use client";
import UserAvatar from "./UserAvatar";
import UserHeader from "./UserHeader";

function UserProfileCard({ user }) {
  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      <UserHeader />
      <div className="flex-1 flex flex-col gap-2  items-center justify-center px-2 py-2 w-full h-full">
        <div className="flex w-full justify-center">
          <UserAvatar user={user} size={"w-40 h-40"} />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="font-mono tracking-wide text-4xl">
            {user?.displayName}
          </p>
          <p className="font-mono tracking-widest font-2xl">{user?.email}</p>
        </div>
      </div>
    </section>
  );
}

export default UserProfileCard;
