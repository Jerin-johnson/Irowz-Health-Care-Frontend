import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageUploadProps {
  imageUrl?: string;
  onFileSelect: (file: File) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  imageUrl,
  onFileSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <img
        src={preview || "/avatar-placeholder.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700"
      >
        <Camera size={16} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImageUpload;
