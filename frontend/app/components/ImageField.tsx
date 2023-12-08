interface ImageFieldProps {
  readonly name: string;
  readonly onFileChange: (file: File | undefined) => void;
  readonly previewImage: string | null;
  readonly onPreviewImageChange: (image: string | null) => void;
  readonly existingPreviewUrl?: string;
}

export function ImageField({
  name,
  onFileChange,
  previewImage,
  onPreviewImageChange,
  existingPreviewUrl,
}: ImageFieldProps) {
  const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FILE_TYPES = ["image/jpeg", "image/png"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    // If no file is selected, set file to undefined
    if (!selectedFile) {
      onFileChange(undefined);
      onPreviewImageChange(null);
      return;
    }

    // File Size Validation
    if (selectedFile.size > FILE_SIZE_LIMIT) {
      alert("File size exceeds the 2MB limit.");
      return;
    }

    // File Type Validation
    if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Unsupported file type. Please upload a JPEG or PNG image.");
      return;
    }

    onFileChange(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        onPreviewImageChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const displayedPreview = previewImage || existingPreviewUrl;

  return (
    <div className="flex flex-col">
      <input name={name} type="file" onChange={handleImageChange} />
      {displayedPreview && (
        <div>
          <img
            src={displayedPreview}
            alt="Profile Preview"
            className="rounded-lg mt-4"
          />
        </div>
      )}
    </div>
  );
}
