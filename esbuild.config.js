const esbuild = require("esbuild");
const autoprefixer = require("autoprefixer");
const postCSSPlugin = require("esbuild-plugin-postcss2").default;

const watch = process.argv.includes("--watch") && {
  onRebuild(error) {
    if (error) console.error("[watch] build failed", error);
    else console.log("[watch] build finished");
  },
};

esbuild.build({
  entryPoints: ["app/javascript/application.js"],
  bundle: true,
  outdir: "app/assets/builds",
  watch: watch,
  plugins: [
    postCSSPlugin({
      plugins: [autoprefixer, require("tailwindcss")],
    }),
  ],
})
.catch(() => process.exit(1));
