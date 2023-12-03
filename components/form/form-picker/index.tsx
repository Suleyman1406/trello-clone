import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "../form-errors";

interface IFormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: IFormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const responseImages = result.response as Array<Record<string, any>>;
          setImages(responseImages);
        } else {
          setImages(defaultImages);
          console.error("Failed to get images from Unsplash.");
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setIsloading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImgId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              disabled={pending}
              onChange={() => 0}
              checked={selectedImgId === image.id}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.urls.html}|${image.user.name}`}
            />
            {selectedImgId === image.id && (
              <div className="absolute top-0  h-full w-full bg-black/30 flex items-center justify-center z-10">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Image
              fill
              alt="Unsplash image"
              src={image.urls.thumb}
              className="object-cover rounded-sm"
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 w-full absolute bottom-0 text-[8px] truncate text-white hover:underline p-1 bg-black/50 z-20"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};

export default FormPicker;
