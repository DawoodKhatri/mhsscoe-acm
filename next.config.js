/** @type {import('next').NextConfig} */

// process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release`;

const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // Add native-addon-loader for handling native addons
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     loader: "native-addon-loader",
  //   });

  //   // If the issue persists only on the server side, you may need to exclude canvas from server-side bundling
  //   if (isServer) {
  //     config.externals.push("canvas");
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
