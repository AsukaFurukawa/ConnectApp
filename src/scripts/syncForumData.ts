#!/usr/bin/env tsx

import { ForumDataService } from '../services/forumDataService'
import { NewsApiService } from '../services/newsApiService'
import { GovernmentDataService } from '../services/governmentDataService'

async function syncForumData() {
  console.log('🚀 Starting comprehensive forum data sync...')
  
  try {
    // Sync all data sources
    console.log('📊 Syncing NGO data...')
    const ngoData = await ForumDataService.fetchRealNGOData()
    console.log(`✅ Fetched ${ngoData.length} NGO records`)
    
    console.log('📰 Syncing news data...')
    const newsData = await NewsApiService.convertNewsToForumPosts()
    console.log(`✅ Fetched ${newsData.length} news articles`)
    
    console.log('🏛️ Syncing government data...')
    const govData = await GovernmentDataService.convertGovernmentDataToForumPosts()
    console.log(`✅ Fetched ${govData.length} government records`)
    
    console.log('🌍 Syncing social issues data...')
    const socialData = await ForumDataService.fetchSocialIssuesData()
    console.log(`✅ Fetched ${socialData.length} social issues`)
    
    // Combine all data
    const allData = [...ngoData, ...newsData, ...govData, ...socialData]
    console.log(`📈 Total records: ${allData.length}`)
    
    // Store in database
    console.log('💾 Storing data in database...')
    await ForumDataService.storePostsInDB(allData)
    console.log('✅ Data stored successfully')
    
    // Generate summary
    const summary = {
      totalRecords: allData.length,
      ngoRecords: ngoData.length,
      newsRecords: newsData.length,
      governmentRecords: govData.length,
      socialIssuesRecords: socialData.length,
      categories: [...new Set(allData.map(item => item.category))],
      locations: [...new Set(allData.map(item => item.location))],
      sources: [...new Set(allData.map(item => item.source))],
      timestamp: new Date().toISOString()
    }
    
    console.log('📋 Sync Summary:')
    console.log(JSON.stringify(summary, null, 2))
    
    console.log('🎉 Forum data sync completed successfully!')
    
  } catch (error) {
    console.error('❌ Error during forum data sync:', error)
    process.exit(1)
  }
}

// Run the sync
if (require.main === module) {
  syncForumData()
}

export { syncForumData }
