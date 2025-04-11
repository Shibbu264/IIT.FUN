
import discordInstance from "../axiosInstances/discordInstance";
import twitterInstance from "../axiosInstances/twitterInstance";

/**
 * Checks if the currently authenticated user has joined a specific Discord guild/server
 * 
 * @param {string} guildId - The Discord guild/server ID to check
 * @returns {Promise<boolean>} - True if user is a member of the guild, false otherwise
 */
export const checkUserJoinedChannel = async (guildId:any): Promise<boolean> => {
  try {
    // Fetch the current user's guilds using the authenticated Discord instance
    const response = await discordInstance.get("/users/@me/guilds");
    
    // Check if the specified guild is in the user's guild list
    const isGuildMember = response.data.some((guild:any) => guild.id === guildId);
    
    return isGuildMember;
  } catch (error:any) {
    // Log the error for debugging
    console.log("Discord guild membership check failed:", error);
    
    // // Show toast notification using the error handling from your instance
    // if (error.response && error.response.status === 401) {
    //   toast.error("Please reconnect your Discord account");
    // }
    
    // Return false on any error since we couldn't verify membership
    return false;
  }
};

export const checkUserFollowsAccount = async (targetUserId: string): Promise<boolean> => {
    try {
      // First get the authenticated user's ID
      const userResponse = await twitterInstance.get("/users/me");
      const userId = userResponse.data.data.id;
      
      // Then check following relationship
      // Note: Twitter API v2 endpoint for following
      const followingResponse = await twitterInstance.get(
        `/users/${userId}/following`, {
          params: {
            "user.fields": "id,username",
            "max_results": 2000 // Adjust as needed, pagination may be required for users following many accounts
          }
        }
      );
      
      // Check if target user is in the following list
      const isFollowing = followingResponse.data.data.some(
        (user: any) => user.id === targetUserId
      );
      
      return isFollowing;
    } catch (error: any) {
      // Log the error for debugging
      console.error("Twitter following check failed:", error);
      
      // Return false on any error since we couldn't verify the following status
      return false;
    }
  };

  export function connectDiscord(user:any) {
    const state = encodeURIComponent(JSON.stringify({ email: user?.email }));
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI as string);
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=guilds+identify&state=${state}`;

    // Redirect user to Discord for authorization
    window.location.href = discordAuthUrl;
}

export function connectTwitter(user:any) {
    const state = encodeURIComponent(JSON.stringify({ email: user?.email })); // Replace user?.email with actual user email
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI as string);
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
    const scope = encodeURIComponent("tweet.read users.read offline.access");


    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

    // Redirect user to Twitter for authorization
    window.location.href = twitterAuthUrl;
}