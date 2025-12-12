import React, { useState, useRef } from 'react';
import { Upload, X, Globe, ArrowRight, Loader2 } from 'lucide-react';

interface SEOFormProps {
  onSubmit: (description: string, imageFile: File | null, language: string) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  "English",
  "German",
  "French",
  "Spanish",
  "Italian",
  "Dutch",
  "Portuguese",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Vietnamese",
  "Chinese (Simplified)",
  "Japanese",
  "Korean",
  "Russian",
  "Arabic"
];

const SEOForm: React.FC<SEOFormProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [language, setLanguage] = useState('English');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image file is too large (5MB limit)");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !imageFile) {
      alert("Please enter a description or upload a product image.");
      return;
    }
    onSubmit(description, imageFile, language);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Product Details
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Target Language
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3.5 w-4 h-4 text-indigo-400 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white text-slate-900 text-sm font-medium appearance-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Product Imagery
            </label>
            
            {!previewUrl ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-slate-300 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group bg-slate-50/50"
              >
                <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:shadow-md transition-all">
                  <Upload className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Click to upload</p>
                <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG (max 5MB)</p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-56 w-full object-contain p-4" 
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-white shadow-md hover:bg-red-50 text-slate-500 hover:text-red-600 p-2 rounded-md transition-colors border border-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="hidden" 
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Description / Key Features
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-slate-900 placeholder:text-slate-400 text-sm bg-slate-50 focus:bg-white"
              placeholder="Describe the product material, usage, or specific selling points..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || (!description && !imageFile)}
            className={`w-full py-4 px-6 rounded-lg text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2
              ${isLoading || (!description && !imageFile)
                ? 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                GENERATE CONTENT
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SEOForm;