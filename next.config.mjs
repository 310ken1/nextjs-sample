/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Exports
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: "export",
  // Output index.html
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash
  trailingSlash: true,
  // source maps
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/productionBrowserSourceMaps
  productionBrowserSourceMaps: true,
};

export default nextConfig;
