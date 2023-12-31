'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'gns3npss';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{
        maxFiles: 3,
      }}
      uploadPreset={uploadPreset}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`
              relative
              cursor-pointer
              hover:opacity-70
              transition
              p-20

              ${
                value
                  ? 'border-0 border-transparent'
                  : 'border-dashed border-2 border-neutral-300'
              }
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
              text-center
              h-[250px]
            `}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            <div className="font-normal text-sm text-neutral-400">
              Maximum file size is 10MB
            </div>
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
