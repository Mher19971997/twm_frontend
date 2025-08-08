// import type { NextConfig } from 'next';
// import path from 'path';

// const nextConfig: NextConfig = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   i18n: {
//     locales: ['en', 'hy'],
//     defaultLocale: 'en',
//     localeDetection: true, // Optional
//   },
// };

// export default nextConfig;



// import path from 'path';

// const nextConfig = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   i18n: {
//     locales: ['en', 'hy', 'ru'],
//     defaultLocale: 'en',
//     localeDetection: true,
//   },
// };

// export default nextConfig;


import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});

const config: NextConfig = {};

export default withNextIntl(config);
