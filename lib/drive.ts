import { google } from 'googleapis';
import stream from 'stream';

// The Folder ID the user provided
const DRIVE_FOLDER_ID = '1ZMO2upGMLds2wN8iYBZg6I9sPy3l16GK';

/**
 * Helper to initialize the Google Drive API client using personal OAuth Refresh Token.
 */
function getDriveClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google OAuth credentials in .env.local (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)");
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function getGalleryItems() {
  try {
    const drive = getDriveClient();
    
    const response = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webContentLink, webViewLink, thumbnailLink, createdTime)',
      orderBy: 'createdTime desc'
    });

    const files = response.data.files || [];

    return files.map(file => {
      const name = file.name as string;
      
      // MAGIC FEATURE: Treat specific files as YouTube links!
      // Format: YOUTUBE_[VIDEO_ID].txt
      if (name.startsWith('YOUTUBE_')) {
        let videoId = name.replace('YOUTUBE_', '').trim();
        if (videoId.endsWith('.txt')) {
          videoId = videoId.slice(0, -4);
        }
        return {
          id: file.id as string,
          name: `YouTube Video`,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`, 
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          embedLink: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
          mimeType: "video/youtube"
        };
      }

      // Standard Google Drive File
      return {
        id: file.id as string,
        name: name,
        videoUrl: file.webContentLink || file.webViewLink || "", 
        thumbnail: file.thumbnailLink?.replace('=s220', '=s800') || "",
        embedLink: file.webViewLink || "",
        mimeType: file.mimeType || ""
      };
    });
  } catch (error) {
    console.log("Drive Fetch Error Context:", error);
    return [];
  }
}

export async function uploadToDrive(fileBuffer: Buffer, filename: string, mimeType: string) {
  try {
    const drive = getDriveClient();
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const response = await drive.files.create({
      requestBody: {
        name: filename,
        parents: [DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: mimeType,
        body: bufferStream,
      },
      fields: 'id'
    });

    return response.data.id;
  } catch (error: any) {
    console.error("Upload failed (Check if OAuth scopes and Tokens are valid):", error);
    throw new Error("Drive upload failed via OAuth");
  }
}

export async function addYouTubeLinkToDrive(youtubeUrl: string) {
  try {
    const drive = getDriveClient();
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    const videoId = (match && match[8].length === 11) ? match[8] : null;
    
    if (!videoId) throw new Error("Invalid YouTube URL");

    // Create an empty text file in Drive to act as our database tracker
    const filename = `YOUTUBE_${videoId}.txt`;
    
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        parents: [DRIVE_FOLDER_ID],
        mimeType: 'text/plain'
      },
      media: {
        mimeType: 'text/plain',
        body: stream.Readable.from(["YouTube Marker File"]),
      },
      fields: 'id'
    });

    console.log("YouTube link saved to Drive successfully!");
    return response.data.id;
  } catch (error) {
    console.error("Failed to add YouTube link", error);
    throw new Error("YouTube Link failed");
  }
}

export function parseFilename(filename: string) {
  if (filename === 'YouTube Video') return filename;
  return filename.replace(/\.[^/.]+$/, "").split('_').join(' ');
}
