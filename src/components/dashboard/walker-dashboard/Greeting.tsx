"use client";

import useAuth from "@/hook/useAuth";
import axiosInstance from "@/lib/api";
import { dataTagErrorSymbol, useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

type TGreetingProps = {
  isOnboarding?: boolean;
  isComplete: boolean;
};

export default function Greeting({ isComplete, isOnboarding }: TGreetingProps) {
  const [uploadingPic, setUploadingPic] = useState(false);
  const picInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { user } = useAuth();
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-primary-50/10 flex items-center justify-center border-2 border-primary-100/50">
            {profilePicPreview ? (
              <Image
                src={profilePicPreview}
                alt="Preview"
                className="w-full h-full object-cover"
                width={56}
                height={56}
              />
            ) : user?.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                alt="Profile"
                className="w-full h-full object-cover"
                width={56}
                height={56}
              />
            ) : (
              <span className="text-xl font-bold text-primary-400">
                {user?.display_name?.[0]}
              </span>
            )}
          </div>
          <button
            onClick={() => picInputRef.current?.click()}
            disabled={uploadingPic}
            className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            data-testid="profile-pic-upload-btn"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
          <input
            ref={picInputRef}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setProfilePic(file);
              setProfilePicPreview(URL.createObjectURL(file));

              const formData = new FormData();
              formData.append("image", file);
              try {
                await axiosInstance.post("/profile/photo/update", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                toast.success("Profile picture updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["user"] });
              } catch (error) {
                toast.error("Failed to update profile picture.");
              }
            }}
            className="hidden"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
            Karibuni, {user?.display_name || user?.full_name}
          </h1>
          <p className="text-stone-500 mt-1">
            {isOnboarding
              ? isComplete
                ? "Congratulations! You completed your challenge!"
                : "Your journey continues. Keep walking!"
              : "Choose a challenge to start your journey."}
          </p>
        </div>
      </div>
    </div>
  );
}
