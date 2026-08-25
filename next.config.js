// GitHub Pages serves this as a project site at /FI-website/, but the local
// dev server should still run at the root — same split vite.config.js used
// to do with `command === 'build'`.
const isProd = process.env.NODE_ENV === 'production'
const repoBasePath = '/FI-website'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? repoBasePath : '',
  assetPrefix: isProd ? repoBasePath : '',
  images: {
    unoptimized: true,
    // Every component imports images/icons and passes the import straight to
    // a plain <img src={...}>, the same way Vite handled them (a raw URL
    // string) — without this, Next wraps the import in a StaticImageData
    // object instead, breaking every one of those call sites.
    disableStaticImages: true,
  },
  webpack(config) {
    // disableStaticImages above removes Next's own image loader entirely
    // rather than just changing its output shape, so these extensions are
    // left with no loader at all — this re-adds plain asset handling
    // (emit the file, default-export its URL as a string) in its place.
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif|ico|bmp)$/i,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig
