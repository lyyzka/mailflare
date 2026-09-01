import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { getSecurityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
	turbopack: {
		root: import.meta.dirname,
	},
  allowedDevOrigins: ['mail.dev'],
	typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete
    // even if your project has type errors.
    ignoreBuildErrors: true,
	  },
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: getSecurityHeaders(),
			},
		];
	},
};

export default nextConfig;

// Only initialize the local Cloudflare dev shim for `next dev`.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
