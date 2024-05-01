"use client";
import { PROFILE } from "@/helpers/Constants";
import AppMainSection from "../SharedComponents/AppMainSection";
import AppWindowHeader from "../SharedComponents/AppWindowHeader";
import UserAvatar from "./UserAvatar";
import { useAuthContext } from "@/Contexts/AuthContexts";
import AppWindow from "../SharedComponents/AppWindow";

function UserProfileWindow() {
  const { user } = useAuthContext();

  return (
    <AppWindow>
      <AppWindowHeader windowName={PROFILE} />
      <AppMainSection>
        <div className="grow flex items-center w-full justify-center">
          <UserAvatar photoUrl={user?.avatarUrl} size={"w-80 h-80"} />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="font-mono tracking-wide text-4xl">{user?.fullName}</p>
        </div>
      </AppMainSection>
    </AppWindow>
  );
}

export default UserProfileWindow;
