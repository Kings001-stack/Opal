"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon, Upload, X, Loader2, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  bucket?: string;
  folder?: string;
  currentImage?: string;
  label?: string;
}

export default function ImageUpload({
  onUpload,
  bucket = "projects",
  folder = "images",
  currentImage,
  label = "Media Asset",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(10); // Start progress

    try {
      // Local preview
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      setUploadProgress(30);

      setUploadProgress(30);

      // Debug Auth
      const { data: { session } } = await supabase.auth.getSession();
      console.log("[ImageUpload] Current Session:", session);
      if (!session) {
        console.warn("[ImageUpload] No active session found! RLS will likely fail.");
        // alert("You appear to be logged out. Please refresh the page."); // Optional
      }

      // Upload directly to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // Double check if error is due to missing bucket (unlikely if already setup)
        if (uploadError.message.includes("bucket not found")) {
          throw new Error(`Storage bucket "${bucket}" not found. Please contact administrator.`);
        }
        throw uploadError;
      }

      setUploadProgress(80);

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onUpload(publicUrl);
      setUploadProgress(100);

      // Cleanup local preview URL to save memory
      // URL.revokeObjectURL(localUrl);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Ensure you are logged in as admin.");
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <Label className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</Label>
        {preview && !isUploading && (
          <button
            onClick={removeImage}
            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-bold uppercase"
          >
            <X size={12} /> Remove
          </button>
        )}
      </div>

      {/* Upload Area / Preview */}
      <div
        className={`relative group h-48 rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-4
          ${preview
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E91E8C]/30"
          }
          ${isUploading ? "pointer-events-none border-[#E91E8C]/50" : "cursor-pointer"}
        `}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            {/* Overlay if uploading */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Loader2 className="animate-spin text-[#E91E8C] mb-3" size={32} />
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E91E8C] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-white font-bold uppercase mt-2 tracking-widest">Uploading...</p>
              </div>
            )}
            {/* Success indicator */}
            {!isUploading && !error && preview === currentImage && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg">
                <CheckCircle2 size={12} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center transition-colors
              ${isUploading ? "bg-white/5 text-gray-600" : "bg-white/5 text-gray-400 group-hover:text-[#E91E8C] group-hover:bg-[#E91E8C]/10"}
            `}>
              {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">
                {isUploading ? "Uploading..." : "Select File"}
              </p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                Max 5MB • PNG, JPG, WEBP
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2">
          <X size={14} className="text-red-500 mt-0.5 mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-red-400 font-bold leading-tight uppercase">{error}</p>
        </div>
      )}
    </div>
  );
}
