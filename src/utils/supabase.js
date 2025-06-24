import { createClient } from '@supabase/supabase-js'
import { encryptInvitation, decryptInvitation, encryptFormData } from './encryption.js'

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not found in environment variables. Running in demo mode.')
}

// Initialize Supabase client (will be null if credentials are missing)
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Database operations
export const createInvitation = async (invitationData) => {
  try {
    console.log('💾 Creating invitation in Supabase...')
    console.log('📊 Data to save (before encryption):', invitationData)
    
    // Encrypt sensitive data before storing (now async)
    const encryptedData = await encryptFormData(invitationData);
    console.log('🔒 Data encrypted for storage')
    
    const { data, error } = await supabase
      .from('invitations')
      .insert([{
        ...encryptedData,
        rsvp_status: 'pending',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      }])
      .select()
    
    if (error) {
      console.error('❌ Supabase error:', error)
      throw error
    }
    
    console.log('✅ Invitation created successfully')
    return data[0]
  } catch (error) {
    console.error('💥 Error creating invitation:', error)
    throw error
  }
}

export const getInvitation = async (id) => {
  try {
    console.log('🔍 Fetching invitation from Supabase, ID:', id)
    
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('❌ Supabase fetch error:', error)
      throw error
    }
    
    // Check if expired
    const now = new Date()
    const expiresAt = new Date(data.expires_at)
    
    if (now > expiresAt) {
      throw new Error('This invitation has expired')
    }
    
    console.log('✅ Invitation fetched successfully')
    
    // Decrypt sensitive data after fetching (now async)
    const decryptedData = await decryptInvitation(data);
    console.log('🔓 Data decrypted')
    
    // Map Supabase field names to component-expected field names
    const mappedData = {
      id: decryptedData.id,
      to: decryptedData.to_name,
      from: decryptedData.from_name,
      time: decryptedData.event_time,
      event: decryptedData.event_description,
      message: decryptedData.message,
      theme: decryptedData.theme,
      youtubeUrl: decryptedData.youtube_url,
      youtubeVideoId: decryptedData.youtube_video_id,
      rsvpStatus: decryptedData.rsvp_status,
      createdAt: decryptedData.created_at,
      expiresAt: decryptedData.expires_at
    }
    
    console.log('🔄 Mapped invitation data ready for display')
    return mappedData
  } catch (error) {
    console.error('💥 Error fetching invitation:', error)
    throw error
  }
}

export const updateRsvp = async (id, status) => {
  try {
    console.log('📝 Updating RSVP in Supabase, ID:', id, 'Status:', status)
    
    const { data, error } = await supabase
      .from('invitations')
      .update({ 
        rsvp_status: status,
        rsvp_updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('❌ Supabase RSVP update error:', error)
      throw error
    }
    
    console.log('✅ RSVP updated successfully:', data[0])
    return data[0]
  } catch (error) {
    console.error('💥 Error updating RSVP:', error)
    throw error
  }
}
