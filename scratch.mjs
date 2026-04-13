import { google } from 'googleapis';

const DRIVE_FOLDER_ID = '1ZMO2upGMLds2wN8iYBZg6I9sPy3l16GK';

async function run() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    console.log("Fetching files from Drive...");
    const response = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, hasThumbnail)',
    });

    response.data.files.forEach(f => {
      console.log(`File: ${f.name} | Has Thumbnail: ${f.hasThumbnail} | Link: ${f.thumbnailLink}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
