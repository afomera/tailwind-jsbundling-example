const fs = require("fs");
const esbuild = require("esbuild");
const autoprefixer = require("autoprefixer");
const postCSSPlugin = require("esbuild-plugin-postcss2").default;

const watch = process.argv.includes("--watch") && {
  onRebuild(error) {
    if (error) console.error("[watch] build failed", error);
    else console.log("[watch] build finished");
  },
};

// Write PID so Rails can skip building during a request
const pidPath = "tmp/pids/esbuild.pid"
if (fs.existsSync(pidPath)) {
  console.log(`An esbuild is already running. Check ${pidPath}`)
  process.exit(1)
} else {
  fs.writeFileSync(pidPath, process.pid.toString());
}
function cleanupPid() {
  if (fs.existsSync(pidPath)) {
    fs.rmSync(pidPath)
  }
}
process.on('exit', () => {
  cleanupPid()
})
process.on('SIGINT', () => {
  cleanupPid()
})
process.on('SIGTERM', () => {
  cleanupPid()
})

esbuild.build({
  entryPoints: ["app/javascript/application.js"],
  bundle: true,
  outdir: "app/assets/builds",
  watch: watch,
  plugins: [
    postCSSPlugin({
      plugins: [autoprefixer, require("postcss-nested"), require("tailwindcss")],
    }),
  ],
})
.catch(() => {
  cleanupPid()
});
