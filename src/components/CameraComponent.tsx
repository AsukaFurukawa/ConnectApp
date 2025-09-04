'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Video, 
  MapPin, 
  Tag, 
  Send, 
  X, 
  RotateCcw, 
  Play, 
  Pause, 
  Square,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Heart,
  Leaf,
  Home,
  GraduationCap,
  Shield,
  Baby,
  User,
  Zap,
  Star,
  Globe,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface PostData {
  id: string;
  title: string;
  description: string;
  category: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  location: LocationData;
  timestamp: Date;
  status: 'draft' | 'posted' | 'in-progress' | 'completed';
  xpEarned: number;
  ngoResponses: number;
  verified: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  xpMultiplier: number;
  description: string;
}

const CameraComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<{ type: 'image' | 'video'; url: string; file: File } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<'capture' | 'category' | 'details' | 'location' | 'preview'>('capture');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [postData, setPostData] = useState<Partial<PostData>>({
    title: '',
    description: '',
    category: '',
    status: 'draft'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    xpEarned: number;
    ngoResponses: number;
    message: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Categories for different types of issues
  const categories: Category[] = [
    {
      id: 'animal-health',
      name: 'Animal Health',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600 border-red-200',
      xpMultiplier: 1.5,
      description: 'Injured or sick animals needing help'
    },
    {
      id: 'environment',
      name: 'Environment',
      icon: <Leaf className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600 border-green-200',
      xpMultiplier: 1.2,
      description: 'Environmental issues, pollution, tree planting'
    },
    {
      id: 'poverty',
      name: 'Poverty Relief',
      icon: <Home className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      xpMultiplier: 1.3,
      description: 'Homelessness, food distribution, basic needs'
    },
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      xpMultiplier: 1.1,
      description: 'Educational support, school supplies, tutoring'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      xpMultiplier: 1.4,
      description: 'Medical emergencies, health camps, medicine'
    },
    {
      id: 'children',
      name: 'Children',
      icon: <Baby className="w-6 h-6" />,
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      xpMultiplier: 1.3,
      description: 'Child welfare, orphanages, child safety'
    },
    {
      id: 'women',
      name: 'Women Empowerment',
      icon: <User className="w-6 h-6" />,
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      xpMultiplier: 1.2,
      description: 'Women safety, empowerment, skill development'
    },
    {
      id: 'elderly',
      name: 'Elderly Care',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-teal-100 text-teal-600 border-teal-200',
      xpMultiplier: 1.1,
      description: 'Senior citizen care, old age homes'
    }
  ];

  // Get user location
  const getUserLocation = async () => {
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get address
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();

      const locationData: LocationData = {
        latitude,
        longitude,
        address: data.localityInfo?.administrative?.[0]?.name || 'Unknown',
        city: data.city || data.locality || 'Unknown',
        state: data.principalSubdivision || 'Unknown',
        country: data.countryName || 'Unknown'
      };

      setLocation(locationData);
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback location
      setLocation({
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'Bangalore, Karnataka',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India'
      });
    } finally {
      setLocationLoading(false);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setIsRecording(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setCapturedMedia({ type: 'image', url, file });
            setCurrentStep('category');
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  // Start video recording
  const startRecording = () => {
    if (streamRef.current) {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], 'captured-video.webm', { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setCapturedMedia({ type: 'video', url, file });
        setCurrentStep('category');
        stopCamera();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  // Stop video recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setPostData(prev => ({ ...prev, category: categoryId }));
    setCurrentStep('details');
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!capturedMedia || !location || !postData.category) return;

    setIsSubmitting(true);
    
    try {
      // Prepare post data for API
      const postPayload = {
        title: postData.title || '',
        description: postData.description || 'Help needed in this area',
        category: postData.category,
        media: {
          type: capturedMedia.type,
          url: capturedMedia.url
        },
        location
      };

      // Submit to API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit post');
      }

      const result = await response.json();
      
      // Calculate XP based on category
      const selectedCategory = categories.find(cat => cat.id === postData.category);
      const baseXP = 50;
      const xpEarned = Math.round(baseXP * (selectedCategory?.xpMultiplier || 1));
      
      const finalPost: PostData = {
        id: result.post.id,
        title: result.post.title,
        description: result.post.description,
        category: result.post.category,
        media: result.post.media,
        location: result.post.location,
        timestamp: new Date(result.post.timestamp),
        status: 'posted',
        xpEarned: result.post.xpEarned,
        ngoResponses: result.post.ngoResponses,
        verified: false
      };

      console.log('Post submitted successfully:', finalPost);
      console.log('NGOs notified:', result.notifications);
      
      setSubmissionResult({
        xpEarned: result.post.xpEarned,
        ngoResponses: result.post.ngoResponses,
        message: result.message
      });
      setSubmitted(true);
      setCurrentStep('preview');
      
      // Reset after 5 seconds
      setTimeout(() => {
        resetForm();
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setCapturedMedia(null);
    setShowPostForm(false);
    setCurrentStep('capture');
    setPostData({
      title: '',
      description: '',
      category: '',
      status: 'draft'
    });
    setLocation(null);
    setSubmitted(false);
    setSubmissionResult(null);
  };

  // Get location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Post Submitted!</h2>
          <p className="text-gray-600 mb-4">{submissionResult?.message || 'Your request has been shared with nearby NGOs'}</p>
          
          <div className="space-y-3 mb-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Star className="w-5 h-5" />
                <span className="font-semibold">+{submissionResult?.xpEarned || 50} XP Earned!</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{submissionResult?.ngoResponses || 0} NGOs Notified</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">You'll be notified when NGOs respond</p>
        </motion.div>
      </div>
    );
  }

  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col camera-interface safe-area-top">
        {/* Camera Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 text-white">
          <button onClick={stopCamera} className="p-2">
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-lg font-semibold">Capture Media</h3>
          <button onClick={() => setCurrentStep('category')} className="p-2">
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Video Element */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording</span>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="flex items-center justify-center gap-8 p-6 bg-black/50">
          <button
            onClick={capturePhoto}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Camera className="w-8 h-8 text-gray-800" />
          </button>
          
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
              isRecording ? 'bg-red-500' : 'bg-white'
            }`}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Video className="w-8 h-8 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'category') {
    return (
      <div className="flex flex-col h-full p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#2E7D32] mb-2">Select Category</h2>
          <p className="text-[#66BB6A] text-sm">Choose the type of issue you're reporting</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${category.color} hover:shadow-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs opacity-75 mb-2">{category.description}</p>
                <div className="flex items-center gap-1 text-xs">
                  <Zap className="w-3 h-3" />
                  <span>{category.xpMultiplier}x XP</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => setCurrentStep('capture')}
          className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg font-medium"
        >
          Back to Camera
        </button>
      </div>
    );
  }

  if (currentStep === 'details') {
    const selectedCategory = categories.find(cat => cat.id === postData.category);
    
    return (
      <div className="flex flex-col h-full p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#2E7D32] mb-2">Add Details</h2>
          <p className="text-[#66BB6A] text-sm">Provide more information about the issue</p>
        </div>

        {/* Category Display */}
        <div className={`p-4 rounded-lg border-2 mb-4 ${selectedCategory?.color}`}>
          <div className="flex items-center gap-3">
            {selectedCategory?.icon}
            <div>
              <h3 className="font-semibold">{selectedCategory?.name}</h3>
              <p className="text-sm opacity-75">{selectedCategory?.description}</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={postData.title || ''}
              onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief title for your post"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={postData.description || ''}
              onChange={(e) => setPostData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the issue in detail..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <button
              onClick={getUserLocation}
              disabled={locationLoading}
              className="text-[#4CAF50] text-sm font-medium hover:underline disabled:opacity-50"
            >
              {locationLoading ? 'Updating...' : 'Update Location'}
            </button>
          </div>
          
          {location ? (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{location.address}</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Location not available</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep('category')}
            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !postData.description.trim()}
            className="flex-1 py-3 bg-[#4CAF50] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </div>
            ) : (
              'Post Request'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Default camera interface
  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#2E7D32] mb-2 font-fun">📸 Report Issue</h1>
        <p className="text-[#66BB6A] text-sm font-clean">Capture and share issues that need help</p>
      </div>

      {/* Main Camera Interface */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Camera Preview Area */}
        <div className="w-full max-w-sm mb-8">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
            {capturedMedia ? (
              <div className="relative w-full h-full">
                {capturedMedia.type === 'image' ? (
                  <img
                    src={capturedMedia.url}
                    alt="Captured"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <video
                    src={capturedMedia.url}
                    controls
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
                <button
                  onClick={() => setCapturedMedia(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No media captured yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          {!capturedMedia ? (
            <>
              <button
                onClick={startCamera}
                className="w-full py-4 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Camera className="w-6 h-6" />
                Open Camera
              </button>
              
              <button className="w-full py-4 bg-white border-2 border-[#4CAF50] text-[#4CAF50] rounded-xl font-semibold text-lg hover:bg-[#4CAF50] hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                <Upload className="w-6 h-6" />
                Upload from Gallery
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentStep('category')}
              className="w-full py-4 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send className="w-6 h-6" />
              Continue to Post
            </button>
          )}
        </div>

        {/* Location Status */}
        <div className="mt-8 w-full max-w-sm">
          {location ? (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">📍 {location.city}, {location.state}</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Location access needed</span>
              </div>
            </div>
          )}
        </div>

        {/* Features Info */}
        <div className="mt-8 w-full max-w-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Users className="w-6 h-6 text-[#4CAF50] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Nearby NGOs</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Zap className="w-6 h-6 text-[#4CAF50] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Earn XP</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Globe className="w-6 h-6 text-[#4CAF50] mx-auto mb-2" />
              <p className="text-xs text-gray-600">Make Impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
