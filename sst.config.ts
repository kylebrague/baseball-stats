/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "baseball-stats",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("baseball-stats-bucket", {
      access: "public",
    });
    new sst.aws.SvelteKit("baseball-stats-web", {
      link: [bucket],
    });
  },
});
