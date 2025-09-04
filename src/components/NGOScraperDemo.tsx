'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ExternalLink, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Search,
  Eye,
  Users,
  Heart,
  DollarSign
} from 'lucide-react';

interface ScrapedData {
  ngoName: string;
  logo: string;
  activities: any[];
  volunteerOpportunities: any[];
  fundraisers: any[];
  error?: string;
}

interface SupportedWebsite {
  name: string;
  url: string;
  category: string;
  description: string;
}

const NGOScraperDemo = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<string>('');
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportedWebsites, setSupportedWebsites] = useState<SupportedWebsite[]>([]);

  // Load supported websites on component mount
  useState(() => {
    const loadSupportedWebsites = async () => {
      try {
        const response = await fetch('/api/scrape-website');
        const data = await response.json();
        if (data.success) {
          setSupportedWebsites(data.supportedWebsites);
        }
      } catch (error) {
        console.error('Error loading supported websites:', error);
      }
    };
    loadSupportedWebsites();
  });

  const handleScrapeWebsite = async () => {
    if (!selectedWebsite) {
      setError('Please select a website to scrape');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScrapedData(null);

    try {
      const response = await fetch('/api/scrape-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: selectedWebsite,
          selectors: {
            // In a real implementation, you would define CSS selectors here
            title: 'h1, h2, .title',
            description: '.description, .content',
            images: 'img',
            links: 'a'
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setScrapedData(data.data);
      } else {
        setError(data.error || 'Failed to scrape website');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2E7D32] mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          NGO Website Scraper Demo
        </h2>
        <p className="text-gray-600">
          Test the web scraping functionality with real NGO websites. This demonstrates how we can extract 
          activities, volunteer opportunities, and fundraisers from NGO websites.
        </p>
      </div>

      {/* Website Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select NGO Website to Scrape:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {supportedWebsites.map((website) => (
            <button
              key={website.url}
              onClick={() => setSelectedWebsite(website.url)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedWebsite === website.url
                  ? 'border-[#4CAF50] bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{website.name}</h3>
                  <p className="text-sm text-gray-600">{website.description}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {website.category}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scrape Button */}
      <div className="mb-6">
        <button
          onClick={handleScrapeWebsite}
          disabled={isLoading || !selectedWebsite}
          className="w-full py-3 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scraping Website...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Scrape NGO Data
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error:</span>
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {/* Scraped Data Display */}
      {scrapedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* NGO Header */}
          <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E0F2F1] p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <img 
                src={scrapedData.logo} 
                alt={scrapedData.ngoName}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/64/64';
                }}
              />
              <div>
                <h3 className="text-2xl font-bold text-[#2E7D32]">{scrapedData.ngoName}</h3>
                <p className="text-[#66BB6A]">Data scraped from official website</p>
              </div>
            </div>
          </div>

          {/* Activities */}
          {scrapedData.activities && scrapedData.activities.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-500" />
                Recent Activities ({scrapedData.activities.length})
              </h4>
              <div className="space-y-4">
                {scrapedData.activities.map((activity, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>📅 {activity.date}</span>
                      <span>🎯 {activity.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Opportunities */}
          {scrapedData.volunteerOpportunities && scrapedData.volunteerOpportunities.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Volunteer Opportunities ({scrapedData.volunteerOpportunities.length})
              </h4>
              <div className="space-y-4">
                {scrapedData.volunteerOpportunities.map((opportunity, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-gray-800">{opportunity.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{opportunity.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>👥 {opportunity.volunteersNeeded} volunteers needed</span>
                      <span>⏱️ {opportunity.duration}</span>
                      <span>🛠️ {opportunity.skills?.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fundraisers */}
          {scrapedData.fundraisers && scrapedData.fundraisers.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-500" />
                Active Fundraisers ({scrapedData.fundraisers.length})
              </h4>
              <div className="space-y-4">
                {scrapedData.fundraisers.map((fundraiser, index) => (
                  <div key={index} className="border-l-4 border-yellow-500 pl-4">
                    <h5 className="font-semibold text-gray-800">{fundraiser.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{fundraiser.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>💰 ₹{fundraiser.raisedAmount?.toLocaleString()} / ₹{fundraiser.targetAmount?.toLocaleString()}</span>
                      <span>📅 Ends: {fundraiser.endDate}</span>
                      <span>📊 {Math.round((fundraiser.raisedAmount / fundraiser.targetAmount) * 100)}% funded</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Data Successfully Scraped!</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              This data was extracted from the NGO's official website and can be integrated into the main NGO Activities page.
            </p>
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">How This Works:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Select an NGO website from the supported list</li>
          <li>• Click "Scrape NGO Data" to extract information</li>
          <li>• The scraper extracts activities, volunteer opportunities, and fundraisers</li>
          <li>• This data can be integrated into the main NGO Activities page</li>
          <li>• In production, this would use real web scraping with Puppeteer or similar tools</li>
        </ul>
      </div>
    </div>
  );
};

export default NGOScraperDemo;
