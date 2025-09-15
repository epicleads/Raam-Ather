'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Image as ImageIcon, 
  Video, 
  MapPin, 
  Smartphone, 
  Monitor, 
  Check, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { CampaignFormData, CampaignLocation, MediaType } from '../../types/campaign';
import { campaignApi } from '../../lib/api/campaigns';
import Image from 'next/image';

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  initialData?: Partial<CampaignFormData>;
}

export default function CampaignForm({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode = 'create', 
  initialData 
}: CampaignFormProps) {
  const [formData, setFormData] = useState<CampaignFormData>({
    campaign_name: initialData?.campaign_name || '',
    slug: initialData?.slug || '',
    cta_text: initialData?.cta_text || 'Book Test Ride',
    cta_link: initialData?.cta_link || 'https://atherenergy.com/book-test-ride',
    end_date: initialData?.end_date || '',
    location: initialData?.location || 'hyderabad',
    media_type: initialData?.media_type || 'image',
  });

  const [files, setFiles] = useState<{
    desktop?: File;
    mobile?: File;
  }>({});
  
  const [dragOver, setDragOver] = useState<'desktop' | 'mobile' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrls, setPreviewUrls] = useState<{
    desktop?: string;
    mobile?: string;
  }>({});

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof CampaignFormData, value: string | number | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug when campaign name changes
      if (field === 'campaign_name') {
        updated.slug = generateSlug(typeof value === 'string' ? value : String(value));
      }
      
      return updated;
    });
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleFileSelect = useCallback((device: 'desktop' | 'mobile', file: File) => {
    // Validate file type
    const validTypes = formData.media_type === 'video' 
      ? ['video/mp4', 'video/webm', 'video/mov']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [device]: `Invalid file type. Please select a ${formData.media_type} file.`
      }));
      return;
    }

    // Validate file size (50MB for videos, 10MB for images)
    const maxSize = formData.media_type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        [device]: `File too large. Maximum size is ${formData.media_type === 'video' ? '50MB' : '10MB'}.`
      }));
      return;
    }

    setFiles(prev => ({ ...prev, [device]: file }));
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrls(prev => {
      // Cleanup previous URL
      if (prev[device]) {
        URL.revokeObjectURL(prev[device]);
      }
      return { ...prev, [device]: url };
    });
    
    // Clear error
    if (errors[device]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[device];
        return updated;
      });
    }
  }, [formData.media_type, errors]);

  const handleDrop = useCallback((device: 'desktop' | 'mobile') => (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileSelect(device, droppedFiles[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (device: 'desktop' | 'mobile') => (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(device);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.campaign_name.trim()) {
      newErrors.campaign_name = 'Campaign name is required';
    }
    
    if (!formData.cta_text.trim()) {
      newErrors.cta_text = 'CTA text is required';
    }
    
    if (!formData.cta_link.trim()) {
      newErrors.cta_link = 'CTA link is required';
    } else {
      try {
        new URL(formData.cta_link);
      } catch {
        newErrors.cta_link = 'Please enter a valid URL';
      }
    }
    
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    } else {
      const endDate = new Date(formData.end_date);
      if (endDate <= new Date()) {
        newErrors.end_date = 'End date must be in the future';
      }
    }
    
    if (mode === 'create' && !files.desktop) {
      newErrors.desktop = 'Desktop creative is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Use desktop file as the main creative (backend currently supports single file)
      const creativeFile = files.desktop || files.mobile;
      
      if (!creativeFile && mode === 'create') {
        throw new Error('Creative file is required');
      }
      
      const campaignData = {
        cta_text: formData.cta_text,
        cta_link: formData.cta_link,
        end_date: new Date(formData.end_date).toISOString(),
        slug: formData.slug,
        location: formData.location,
      };
      
      if (creativeFile) {
        await campaignApi.createCampaign(campaignData, creativeFile);
      }
      
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        campaign_name: '',
        slug: '',
        cta_text: 'Book Test Ride',
        cta_link: 'https://atherenergy.com/book-test-ride',
        end_date: '',
        location: 'hyderabad',
        media_type: 'image',
      });
      setFiles({});
      setPreviewUrls({});
      
    } catch (error) {
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to create campaign' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  const FileUploadArea = ({ device }: { device: 'desktop' | 'mobile' }) => {
    const file = files[device];
    const previewUrl = previewUrls[device];
    const error = errors[device];
    const isDragging = dragOver === device;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {device === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          <span className="text-sm font-medium capitalize">{device} Creative</span>
          {mode === 'create' && device === 'desktop' && <span className="text-red-400 text-sm">*</span>}
        </div>
        
        <div
          onDrop={handleDrop(device)}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter(device)}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${
            isDragging
              ? 'border-green-400 bg-green-400/10'
              : error
              ? 'border-red-400 bg-red-400/5'
              : file
              ? 'border-green-400 bg-green-400/5'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
          }`}
        >
          {file && previewUrl ? (
            <div className="relative">
              {formData.media_type === 'video' ? (
                <video 
                  src={previewUrl} 
                  className="w-full h-32 object-cover rounded-lg"
                  controls={false}
                />
              ) : (
                <Image 
                  src={previewUrl} 
                  alt={`${device} preview`}
                  width={256}
                  height={128}
                  className="object-cover rounded-lg"
                />
              )}
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
              <div className="mt-2 text-sm text-gray-300 truncate">{file.name}</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-3">
                {formData.media_type === 'video' ? (
                  <Video className="w-8 h-8 text-gray-400" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-300 mb-1">
                Drop your {formData.media_type} here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Max size: {formData.media_type === 'video' ? '50MB' : '10MB'}
              </p>
            </div>
          )}
          
          <input
            type="file"
            accept={formData.media_type === 'video' ? 'video/*' : 'image/*'}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                handleFileSelect(device, selectedFile);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              {mode === 'create' ? 'Create New Campaign' : 'Edit Campaign'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Media Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Media Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['image', 'video'] as MediaType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('media_type', type)}
                      className={`flex items-center justify-center space-x-2 p-4 border rounded-xl transition-all ${
                        formData.media_type === type
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {type === 'video' ? <Video className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                      <span className="capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadArea device="desktop" />
                <FileUploadArea device="mobile" />
              </div>

              {/* Location Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Target Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['hyderabad', 'chennai'] as CampaignLocation[]).map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => handleInputChange('location', location)}
                      className={`flex items-center justify-center space-x-2 p-4 border rounded-xl transition-all ${
                        formData.location === location
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{location}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.campaign_name}
                    onChange={(e) => handleInputChange('campaign_name', e.target.value)}
                    placeholder="Ather Apex Hyderabad Launch"
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400/20 transition-all outline-none ${
                      errors.campaign_name ? 'border-red-400' : 'border-gray-600 focus:border-green-400'
                    }`}
                  />
                  {errors.campaign_name && (
                    <p className="text-red-400 text-sm mt-1">{errors.campaign_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="ather-apex-hyderabad-launch"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:ring-2 focus:ring-green-400/20 transition-all outline-none ${
                    errors.end_date ? 'border-red-400' : 'border-gray-600 focus:border-green-400'
                  }`}
                />
                {errors.end_date && (
                  <p className="text-red-400 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CTA Text <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cta_text}
                  onChange={(e) => handleInputChange('cta_text', e.target.value)}
                  placeholder="Book Test Ride"
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400/20 transition-all outline-none ${
                    errors.cta_text ? 'border-red-400' : 'border-gray-600 focus:border-green-400'
                  }`}
                />
                {errors.cta_text && (
                  <p className="text-red-400 text-sm mt-1">{errors.cta_text}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CTA Link <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={formData.cta_link}
                  onChange={(e) => handleInputChange('cta_link', e.target.value)}
                  placeholder="https://atherenergy.com/book-test-ride"
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400/20 transition-all outline-none ${
                    errors.cta_link ? 'border-red-400' : 'border-gray-600 focus:border-green-400'
                  }`}
                />
                {errors.cta_link && (
                  <p className="text-red-400 text-sm mt-1">{errors.cta_link}</p>
                )}
              </div>

              {errors.submit && (
                <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold rounded-lg hover:from-green-500 hover:to-green-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>{mode === 'create' ? 'Create Campaign' : 'Update Campaign'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}