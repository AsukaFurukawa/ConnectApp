// NGO Notification Service
// Handles location-based NGO matching and notifications

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface PostData {
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

export interface NGO {
  id: string;
  name: string;
  logo: string;
  description: string;
  categories: string[];
  location: LocationData;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  verified: boolean;
  rating: number;
  responseTime: number; // in hours
  active: boolean;
}

export interface NotificationData {
  id: string;
  postId: string;
  ngoId: string;
  ngoName: string;
  ngoLogo: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'read' | 'responded';
  responseType?: 'interested' | 'not-interested' | 'completed';
  responseMessage?: string;
}

class NotificationService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Get nearby NGOs based on location and category
  async getNearbyNGOs(
    location: LocationData, 
    category: string, 
    radiusKm: number = 50
  ): Promise<NGO[]> {
    try {
      // In a real app, this would fetch from your database
      // For now, we'll use mock data
      const mockNGOs: NGO[] = [
        {
          id: '1',
          name: 'Animal Welfare Society',
          logo: '/api/placeholder/100/100',
          description: 'Dedicated to helping animals in need',
          categories: ['animal-health', 'environment'],
          location: {
            latitude: 12.9716,
            longitude: 77.5946,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          contact: {
            phone: '+91-9876543210',
            email: 'contact@animalwelfare.org',
            website: 'https://animalwelfare.org'
          },
          verified: true,
          rating: 4.8,
          responseTime: 2,
          active: true
        },
        {
          id: '2',
          name: 'Green Earth Foundation',
          logo: '/api/placeholder/100/100',
          description: 'Environmental conservation and tree planting',
          categories: ['environment', 'education'],
          location: {
            latitude: 12.9352,
            longitude: 77.6245,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          contact: {
            phone: '+91-9876543211',
            email: 'info@greenearth.org',
            website: 'https://greenearth.org'
          },
          verified: true,
          rating: 4.6,
          responseTime: 4,
          active: true
        },
        {
          id: '3',
          name: 'Hope for Children',
          logo: '/api/placeholder/100/100',
          description: 'Supporting underprivileged children',
          categories: ['children', 'education', 'poverty'],
          location: {
            latitude: 12.9784,
            longitude: 77.6408,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          contact: {
            phone: '+91-9876543212',
            email: 'help@hopeforchildren.org',
            website: 'https://hopeforchildren.org'
          },
          verified: true,
          rating: 4.9,
          responseTime: 1,
          active: true
        },
        {
          id: '4',
          name: 'Women Empowerment Network',
          logo: '/api/placeholder/100/100',
          description: 'Supporting women and girls',
          categories: ['women', 'education', 'healthcare'],
          location: {
            latitude: 12.9141,
            longitude: 77.6786,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          contact: {
            phone: '+91-9876543213',
            email: 'support@womenempowerment.org',
            website: 'https://womenempowerment.org'
          },
          verified: true,
          rating: 4.7,
          responseTime: 3,
          active: true
        },
        {
          id: '5',
          name: 'Elderly Care Foundation',
          logo: '/api/placeholder/100/100',
          description: 'Caring for senior citizens',
          categories: ['elderly', 'healthcare', 'poverty'],
          location: {
            latitude: 12.9716,
            longitude: 77.5946,
            address: 'Bangalore, Karnataka',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
          },
          contact: {
            phone: '+91-9876543214',
            email: 'care@elderlycare.org',
            website: 'https://elderlycare.org'
          },
          verified: true,
          rating: 4.5,
          responseTime: 6,
          active: true
        }
      ];

      // Filter NGOs by category and distance
      const nearbyNGOs = mockNGOs.filter(ngo => {
        const distance = this.calculateDistance(
          location.latitude,
          location.longitude,
          ngo.location.latitude,
          ngo.location.longitude
        );
        
        return (
          ngo.active &&
          ngo.categories.includes(category) &&
          distance <= radiusKm
        );
      });

      // Sort by distance and rating
      return nearbyNGOs.sort((a, b) => {
        const distanceA = this.calculateDistance(
          location.latitude,
          location.longitude,
          a.location.latitude,
          a.location.longitude
        );
        const distanceB = this.calculateDistance(
          location.latitude,
          location.longitude,
          b.location.latitude,
          b.location.longitude
        );
        
        // Prioritize by distance, then by rating
        if (Math.abs(distanceA - distanceB) < 5) {
          return b.rating - a.rating;
        }
        return distanceA - distanceB;
      });

    } catch (error) {
      console.error('Error fetching nearby NGOs:', error);
      return [];
    }
  }

  // Send notifications to nearby NGOs
  async notifyNGOs(postData: PostData): Promise<NotificationData[]> {
    try {
      const nearbyNGOs = await this.getNearbyNGOs(postData.location, postData.category);
      
      const notifications: NotificationData[] = nearbyNGOs.map(ngo => ({
        id: `${postData.id}-${ngo.id}-${Date.now()}`,
        postId: postData.id,
        ngoId: ngo.id,
        ngoName: ngo.name,
        ngoLogo: ngo.logo,
        message: `New ${postData.category} request in your area: "${postData.title || 'Help needed'}"`,
        timestamp: new Date(),
        status: 'sent',
        responseType: undefined,
        responseMessage: undefined
      }));

      // In a real app, you would send these notifications via:
      // - Push notifications
      // - Email
      // - SMS
      // - In-app notifications
      
      console.log(`Sent notifications to ${notifications.length} NGOs:`, notifications);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return notifications;
      
    } catch (error) {
      console.error('Error sending notifications:', error);
      return [];
    }
  }

  // Get notifications for a specific post
  async getPostNotifications(postId: string): Promise<NotificationData[]> {
    try {
      // In a real app, this would fetch from your database
      const mockNotifications: NotificationData[] = [
        {
          id: `${postId}-1-${Date.now()}`,
          postId,
          ngoId: '1',
          ngoName: 'Animal Welfare Society',
          ngoLogo: '/api/placeholder/100/100',
          message: 'We can help with this animal issue. Our vet team is available.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: 'responded',
          responseType: 'interested',
          responseMessage: 'Our team will reach the location within 2 hours. Please keep the animal safe.'
        },
        {
          id: `${postId}-2-${Date.now()}`,
          postId,
          ngoId: '2',
          ngoName: 'Green Earth Foundation',
          ngoLogo: '/api/placeholder/100/100',
          message: 'We can assist with environmental issues in your area.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          status: 'read',
          responseType: 'interested',
          responseMessage: 'Our environmental team will assess the situation and provide assistance.'
        }
      ];

      return mockNotifications;
      
    } catch (error) {
      console.error('Error fetching post notifications:', error);
      return [];
    }
  }

  // Update notification status
  async updateNotificationStatus(
    notificationId: string, 
    status: 'read' | 'responded',
    responseType?: 'interested' | 'not-interested' | 'completed',
    responseMessage?: string
  ): Promise<boolean> {
    try {
      // In a real app, this would update the database
      console.log('Updating notification:', {
        notificationId,
        status,
        responseType,
        responseMessage
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
      
    } catch (error) {
      console.error('Error updating notification status:', error);
      return false;
    }
  }

  // Get NGO response statistics
  async getNGOStats(ngoId: string): Promise<{
    totalRequests: number;
    respondedRequests: number;
    completedRequests: number;
    averageResponseTime: number;
    rating: number;
  }> {
    try {
      // In a real app, this would fetch from your database
      const mockStats = {
        totalRequests: 156,
        respondedRequests: 142,
        completedRequests: 128,
        averageResponseTime: 3.2, // hours
        rating: 4.7
      };

      return mockStats;
      
    } catch (error) {
      console.error('Error fetching NGO stats:', error);
      return {
        totalRequests: 0,
        respondedRequests: 0,
        completedRequests: 0,
        averageResponseTime: 0,
        rating: 0
      };
    }
  }

  // Send push notification (mock implementation)
  async sendPushNotification(
    ngoId: string, 
    title: string, 
    message: string, 
    data?: any
  ): Promise<boolean> {
    try {
      // In a real app, you would integrate with:
      // - Firebase Cloud Messaging (FCM)
      // - Apple Push Notification Service (APNs)
      // - Web Push API
      
      console.log('Sending push notification:', {
        ngoId,
        title,
        message,
        data
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
      
    } catch (error) {
      console.error('Error sending push notification:', error);
      return false;
    }
  }

  // Get user's notification preferences
  async getUserNotificationPreferences(userId: string): Promise<{
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    categories: string[];
    radius: number;
  }> {
    try {
      // In a real app, this would fetch from your database
      const mockPreferences = {
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        categories: ['animal-health', 'environment', 'children'],
        radius: 25 // km
      };

      return mockPreferences;
      
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      return {
        pushNotifications: true,
        emailNotifications: false,
        smsNotifications: false,
        categories: [],
        radius: 50
      };
    }
  }
}

export const notificationService = new NotificationService();
