module.exports = {
  apps: [
    {
      name: "next-app",
      script: "yarn",
      args: "dev",
      cwd: "/path/to/your/nextjs/app",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
