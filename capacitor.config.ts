import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.topomer.topomer',
  appName: 'new',
  webDir: 'www',
  plugins: {
  GoogleAuth: {
    scopes: ['profile', 'email'],
    serverClientId: '311031680675-dbmohqlmnuts55vltmkji6cruadi4vt8.apps.googleusercontent.com',
    forceCodeForRefreshToken: true
  },
},
 
  
};

export default config;
