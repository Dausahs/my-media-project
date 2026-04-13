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
  
  // Set the refresh token so it can mint access tokens indefinitely on the fly
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

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

    return files.map(file => ({
      id: file.id as string,
      name: file.name as string,
      videoUrl: file.webContentLink || file.webViewLink || "", 
      thumbnail: file.thumbnailLink?.replace('=s220', '=s800') || "",
      embedLink: file.webViewLink || "",
      mimeType: file.mimeType || ""
    }));
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
      fields: 'id, name, webContentLink, webViewLink'
    });

    console.log("SUCCESSFULLY UPLOADED AS OWNER!", response.data.id);
    return response.data.id;
  } catch (error: any) {
    console.error("Upload failed (Check if OAuth scopes and Tokens are valid):", error);
    throw new Error("Drive upload failed via OAuth");
  }
}

export function parseFilename(filename: string) {
  return filename
    .replace(/\.[^/.]+$/, "") 
    .split('_')
    .join(' ');
}
