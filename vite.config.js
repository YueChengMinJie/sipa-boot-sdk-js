const path = require("path")
const typescript = require("@rollup/plugin-typescript")
const { defineConfig } = require("vite")
const copyPlugin = require("rollup-plugin-copy")

const libName = "sipa-boot-sdk-js"
const bundlePrefix = "index"

// 入口
const entry = path.resolve(__dirname, "src/index.ts")

module.exports = defineConfig({
  plugins: [
    typescript({
      target: "es5",
      include: ["src/**/*.ts"],
      esModuleInterop: true,
      module: "esnext",
    }),
  ],
  build: {
    sourcemap: true,
    outDir: "dist",
    minify: "esbuild",
    lib: {
      entry,
      name: libName,
      formats: ["umd", "cjs", "es"],
      fileName: (format) => {
        if (format === "umd") {
          return `${bundlePrefix}.js`
        }
        if (format === 'es') {
          return `${bundlePrefix}.mjs`
        }
        if (format === 'cjs') {
          return `${bundlePrefix}.cjs`
        }
        return `${bundlePrefix}.${format}.js`
      },
    },
    rollupOptions: {
      input: entry,
      output: {
        exports: "auto",
      },
      plugins: [
        copyPlugin({
          targets: [{ src: "package.json", dest: "public/" }],
        }),
      ],
    },
  },
  server: {
    host: "0.0.0.0",
  },
})
