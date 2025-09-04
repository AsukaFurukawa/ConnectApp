import { RealNGODataService } from '../services/realNGODataService'

async function syncNGOData() {
  try {
    console.log('🔄 Starting NGO data sync...')

    // Sync data from all sources
    await RealNGODataService.syncAllNGOData()

    console.log('✅ NGO data sync completed successfully!')
  } catch (error) {
    console.error('❌ Error syncing NGO data:', error)
    process.exit(1)
  }
}

// Run the sync function
if (require.main === module) {
  syncNGOData()
    .then(() => {
      console.log('🎉 Sync completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Sync failed:', error)
      process.exit(1)
    })
}

export default syncNGOData
