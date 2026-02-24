#!/usr/bin/env node
/**
 * Google Calendar OAuth setup script.
 * Run once to authorize and save tokens.
 * Usage: node auth.js
 */

const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'gcp-oauth.keys.json');
const TOKEN_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'token.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar.events'];
const PORT = 3847;

async function authorize() {
  const content = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = content.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    `http://localhost:${PORT}/callback`
  );

  // Check if we already have a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    console.log('Already authorized! Token found at:', TOKEN_PATH);
    console.log('To re-authorize, delete the token file and run again.');
    process.exit(0);
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  console.log('\n=== Google Calendar Authorization ===\n');
  console.log('Open this URL in your browser:\n');
  console.log(authUrl);
  console.log('\nWaiting for authorization...\n');

  // Start local server to receive the callback
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const query = url.parse(req.url, true).query;
        if (query.code) {
          const { tokens } = await oAuth2Client.getToken(query.code);
          oAuth2Client.setCredentials(tokens);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>Authorization successful!</h1><p>You can close this window.</p>');

          console.log('Authorization successful! Token saved to:', TOKEN_PATH);
          server.close();
          resolve(oAuth2Client);
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Authorization failed: ' + err.message);
        reject(err);
        server.close();
      }
    });

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT} for OAuth callback...`);
    });

    // Auto-open the URL on macOS
    require('child_process').exec(`open "${authUrl}"`);
  });
}

authorize().catch(console.error);
