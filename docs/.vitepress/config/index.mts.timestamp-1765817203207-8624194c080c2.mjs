// .vitepress/config/index.mts
import { withPwa } from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/@vite-pwa+vitepress@1.0.0_v_5f52dc0c7727ae53c18733dfc84186df/node_modules/@vite-pwa/vitepress/dist/index.mjs";
import { defineConfigWithTheme } from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_40c18f336a6c0b46e37cb881fdc97f0a/node_modules/vitepress/dist/node/index.js";

// .vitepress/config/en.mts
import { defineConfig } from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_40c18f336a6c0b46e37cb881fdc97f0a/node_modules/vitepress/dist/node/index.js";

// ../package.json
var version = "5.5.9";

// .vitepress/config/en.mts
var en = defineConfig({
  description: "Vben Admin & Enterprise level management system framework",
  lang: "en-US",
  themeConfig: {
    darkModeSwitchLabel: "Theme",
    darkModeSwitchTitle: "Switch to Dark Mode",
    docFooter: {
      next: "Next Page",
      prev: "Previous Page"
    },
    editLink: {
      pattern: "https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path",
      text: "Edit this page on GitHub"
    },
    footer: {
      copyright: `Copyright \xA9 2020-${(/* @__PURE__ */ new Date()).getFullYear()} Vben`,
      message: "Released under the MIT License."
    },
    langMenuLabel: "Language",
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      },
      text: "Last updated on"
    },
    lightModeSwitchTitle: "Switch to Light Mode",
    nav: nav(),
    outline: {
      label: "Navigate"
    },
    returnToTopLabel: "Back to top",
    sidebar: {
      "/en/commercial/": {
        base: "/en/commercial/",
        items: sidebarCommercial()
      },
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() }
    }
  }
});
function sidebarGuide() {
  return [
    {
      collapsed: false,
      text: "Introduction",
      items: [
        {
          link: "introduction/vben",
          text: "About Vben Admin"
        },
        {
          link: "introduction/why",
          text: "Why Choose Us?"
        },
        { link: "introduction/quick-start", text: "Quick Start" },
        { link: "introduction/thin", text: "Lite Version" }
      ]
    },
    {
      text: "Basics",
      items: [
        { link: "essentials/concept", text: "Basic Concepts" },
        { link: "essentials/development", text: "Local Development" },
        { link: "essentials/route", text: "Routing and Menu" },
        { link: "essentials/settings", text: "Configuration" },
        { link: "essentials/icons", text: "Icons" },
        { link: "essentials/styles", text: "Styles" },
        { link: "essentials/external-module", text: "External Modules" },
        { link: "essentials/build", text: "Build and Deployment" },
        { link: "essentials/server", text: "Server Interaction and Data Mock" }
      ]
    },
    {
      text: "Advanced",
      items: [
        { link: "in-depth/login", text: "Login" },
        { link: "in-depth/theme", text: "Theme" },
        { link: "in-depth/access", text: "Access Control" },
        { link: "in-depth/locale", text: "Internationalization" },
        { link: "in-depth/features", text: "Common Features" },
        { link: "in-depth/check-updates", text: "Check Updates" },
        { link: "in-depth/loading", text: "Global Loading" },
        { link: "in-depth/ui-framework", text: "UI Framework Switching" }
      ]
    },
    {
      text: "Engineering",
      items: [
        { link: "project/standard", text: "Standards" },
        { link: "project/cli", text: "CLI" },
        { link: "project/dir", text: "Directory Explanation" },
        { link: "project/test", text: "Unit Testing" },
        { link: "project/tailwindcss", text: "Tailwind CSS" },
        { link: "project/changeset", text: "Changeset" },
        { link: "project/vite", text: "Vite Config" }
      ]
    },
    {
      text: "Others",
      items: [
        { link: "other/project-update", text: "Project Update" },
        { link: "other/remove-code", text: "Remove Code" },
        { link: "other/faq", text: "FAQ" }
      ]
    }
  ];
}
function sidebarCommercial() {
  return [
    {
      link: "community",
      text: "Community"
    },
    {
      link: "technical-support",
      text: "Technical-support"
    },
    {
      link: "customized",
      text: "Customized"
    }
  ];
}
function nav() {
  return [
    {
      activeMatch: "^/en/(guide|components)/",
      text: "Doc",
      items: [
        {
          activeMatch: "^/en/guide/",
          link: "/en/guide/introduction/vben",
          text: "Guide"
        },
        // {
        //   activeMatch: '^/en/components/',
        //   link: '/en/components/introduction',
        //   text: 'Components',
        // },
        {
          text: "Historical Versions",
          items: [
            {
              link: "https://doc.vvbin.cn",
              text: "2.x Version Documentation"
            }
          ]
        }
      ]
    },
    {
      text: "Demo",
      items: [
        {
          text: "Vben Admin",
          items: [
            {
              link: "https://www.vben.pro",
              text: "Demo Version"
            },
            {
              link: "https://ant.vben.pro",
              text: "Ant Design Vue Version"
            },
            {
              link: "https://naive.vben.pro",
              text: "Naive Version"
            },
            {
              link: "https://ele.vben.pro",
              text: "Element Plus Version"
            }
          ]
        },
        {
          text: "Others",
          items: [
            {
              link: "https://vben.vvbin.cn",
              text: "Vben Admin 2.x"
            }
          ]
        }
      ]
    },
    {
      text: version,
      items: [
        {
          link: "https://github.com/vbenjs/vue-vben-admin/releases",
          text: "Changelog"
        },
        {
          link: "https://github.com/orgs/vbenjs/projects/5",
          text: "Roadmap"
        },
        {
          link: "https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md",
          text: "Contribution"
        }
      ]
    },
    {
      link: "/commercial/technical-support",
      text: "\u{1F984} Tech Support"
    },
    {
      link: "/sponsor/personal",
      text: "\u2728 Sponsor"
    },
    {
      link: "/commercial/community",
      text: "\u{1F468}\u200D\u{1F466}\u200D\u{1F466} Community"
    }
    // {
    //   link: '/friend-links/',
    //   text: '🤝 Friend Links',
    // },
  ];
}

// .vitepress/config/shared.mts
import { resolve } from "node:path";
import {
  viteArchiverPlugin,
  viteVxeTableImportsPlugin
} from "file:///E:/VsCodeProjects/vue-vben-admin/internal/vite-config/dist/index.mjs";
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/@nolebase+vitepress-plugin-_36859a79f7e1bca5faf2bd4ba5836b6f/node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite/index.mjs";
import tailwind from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/tailwindcss@3.4.17/node_modules/tailwindcss/lib/index.js";
import { defineConfig as defineConfig2, postcssIsolateStyles } from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_40c18f336a6c0b46e37cb881fdc97f0a/node_modules/vitepress/dist/node/index.js";
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/vitepress-plugin-group-icon_83c6decc24c41b79a5dde4a41171f1aa/node_modules/vitepress-plugin-group-icons/dist/index.js";

// .vitepress/config/plugins/demo-preview.ts
import crypto from "node:crypto";
import { readdirSync } from "node:fs";
import { join } from "node:path";
var rawPathRegexp = (
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/strict
  /^(.+?(?:\.([\da-z]+))?)(#[\w-]+)?(?: ?{(\d+(?:[,-]\d+)*)? ?(\S+)?})? ?(?:\[(.+)])?$/
);
function rawPathToToken(rawPath) {
  const [
    filepath = "",
    extension = "",
    region = "",
    lines = "",
    lang = "",
    rawTitle = ""
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1);
  const title = rawTitle || filepath.split("/").pop() || "";
  return { extension, filepath, lang, lines, region, title };
}
var demoPreviewPlugin = (md) => {
  md.core.ruler.after("inline", "demo-preview", (state) => {
    const insertComponentImport = (importString) => {
      const index = state.tokens.findIndex(
        (i) => i.type === "html_block" && i.content.match(/<script setup>/g)
      );
      if (index === -1) {
        const importComponent = new state.Token("html_block", "", 0);
        importComponent.content = `<script setup>
${importString}
</script>
`;
        state.tokens.splice(0, 0, importComponent);
      } else {
        if (state.tokens[index]) {
          const content = state.tokens[index].content;
          state.tokens[index].content = content.replace(
            "</script>",
            `${importString}
</script>`
          );
        }
      }
    };
    const regex = /<DemoPreview[^>]*\sdir="([^"]*)"/g;
    state.src = state.src.replaceAll(regex, (_match, dir) => {
      const componentDir = join(process.cwd(), "src", dir).replaceAll(
        "\\",
        "/"
      );
      let childFiles = [];
      let dirExists = true;
      try {
        childFiles = readdirSync(componentDir, {
          encoding: "utf8",
          recursive: false,
          withFileTypes: false
        }) || [];
      } catch {
        dirExists = false;
      }
      if (!dirExists) {
        return "";
      }
      const uniqueWord = generateContentHash(componentDir);
      const ComponentName = `DemoComponent_${uniqueWord}`;
      insertComponentImport(
        `import ${ComponentName} from '${componentDir}/index.vue'`
      );
      const { path: _path } = state.env;
      const index = state.tokens.findIndex((i) => i.content.match(regex));
      if (!state.tokens[index]) {
        return "";
      }
      const firstString = "index.vue";
      childFiles = childFiles.sort((a, b) => {
        if (a === firstString) return -1;
        if (b === firstString) return 1;
        return a.localeCompare(b, "en", { sensitivity: "base" });
      });
      state.tokens[index].content = `<DemoPreview files="${encodeURIComponent(JSON.stringify(childFiles))}" ><${ComponentName}/>
        `;
      const _dummyToken = new state.Token("", "", 0);
      const tokenArray = [];
      childFiles.forEach((filename) => {
        const templateStart = new state.Token("html_inline", "", 0);
        templateStart.content = `<template #${filename}>`;
        tokenArray.push(templateStart);
        const resolvedPath = join(componentDir, filename);
        const { extension, filepath, lang, lines, title } = rawPathToToken(resolvedPath);
        const token = new state.Token("fence", "code", 0);
        token.info = `${lang || extension}${lines ? `{${lines}}` : ""}${title ? `[${title}]` : ""}`;
        token.content = `<<< ${filepath}`;
        token.src = [resolvedPath];
        tokenArray.push(token);
        const templateEnd = new state.Token("html_inline", "", 0);
        templateEnd.content = "</template>";
        tokenArray.push(templateEnd);
      });
      const endTag = new state.Token("html_inline", "", 0);
      endTag.content = "</DemoPreview>";
      tokenArray.push(endTag);
      state.tokens.splice(index + 1, 0, ...tokenArray);
      return "";
    });
  });
};
function generateContentHash(input, length = 10) {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  return Number.parseInt(hash, 16).toString(36).slice(0, length);
}

// .vitepress/config/shared.mts
var shared = defineConfig2({
  appearance: "dark",
  head: head(),
  markdown: {
    preConfig(md) {
      md.use(demoPreviewPlugin);
      md.use(groupIconMdPlugin);
    }
  },
  pwa: pwa(),
  srcDir: "src",
  themeConfig: {
    i18nRouting: true,
    logo: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp",
    siteTitle: "GK ZAP",
    socialLinks: [
      { icon: "github", link: "https://github.com/vbenjs/vue-vben-admin" }
    ]
  },
  title: "GK ZAP",
  vite: {
    build: {
      chunkSizeWarningLimit: Infinity,
      minify: "terser"
    },
    css: {
      postcss: {
        plugins: [
          tailwind(),
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })
        ]
      },
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    },
    json: {
      stringify: true
    },
    plugins: [
      GitChangelog({
        mapAuthors: [
          {
            mapByNameAliases: ["Vben"],
            name: "vben",
            username: "anncwb"
          },
          {
            name: "vince",
            username: "vince292007"
          },
          {
            name: "Li Kui",
            username: "likui628"
          }
        ],
        repoURL: () => "https://github.com/vbenjs/vue-vben-admin"
      }),
      GitChangelogMarkdownSection(),
      viteArchiverPlugin({ outputDir: ".vitepress" }),
      groupIconVitePlugin(),
      await viteVxeTableImportsPlugin()
    ],
    server: {
      fs: {
        allow: ["../.."]
      },
      host: true,
      port: 6173
    },
    ssr: {
      external: ["@vue/repl"]
    }
  }
});
function head() {
  return [
    ["meta", { content: "Vbenjs Team", name: "author" }],
    [
      "meta",
      {
        content: "vben, vitejs, vite, shacdn-ui, vue",
        name: "keywords"
      }
    ],
    ["link", { href: "/favicon.ico", rel: "icon", type: "image/svg+xml" }],
    [
      "meta",
      {
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        name: "viewport"
      }
    ],
    ["meta", { content: "vben admin docs", name: "keywords" }],
    ["link", { href: "/favicon.ico", rel: "icon" }]
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.tailwindcss.com',
    //   },
    // ],
  ];
}
function pwa() {
  return {
    includeManifestIcons: false,
    manifest: {
      description: "GK ZAP is a modern admin dashboard template based on Vue 3. ",
      icons: [
        {
          sizes: "192x192",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/pwa-icon-192.png",
          type: "image/png"
        },
        {
          sizes: "512x512",
          src: "https://unpkg.com/@vbenjs/static-source@0.1.7/source/pwa-icon-512.png",
          type: "image/png"
        }
      ],
      id: "/",
      name: "GK ZAP Doc",
      short_name: "vben_admin_doc",
      theme_color: "#ffffff"
    },
    outDir: resolve(process.cwd(), ".vitepress/dist"),
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    }
  };
}

// .vitepress/config/zh.mts
import { defineConfig as defineConfig3 } from "file:///E:/VsCodeProjects/vue-vben-admin/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_40c18f336a6c0b46e37cb881fdc97f0a/node_modules/vitepress/dist/node/index.js";
var zh = defineConfig3({
  description: "Vben Admin & \u4F01\u4E1A\u7EA7\u7BA1\u7406\u7CFB\u7EDF\u6846\u67B6",
  lang: "zh-Hans",
  themeConfig: {
    darkModeSwitchLabel: "\u4E3B\u9898",
    darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",
    docFooter: {
      next: "\u4E0B\u4E00\u9875",
      prev: "\u4E0A\u4E00\u9875"
    },
    editLink: {
      pattern: "https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path",
      text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875\u9762"
    },
    footer: {
      copyright: `Copyright \xA9 2020-${(/* @__PURE__ */ new Date()).getFullYear()} Vben`,
      message: "\u57FA\u4E8E MIT \u8BB8\u53EF\u53D1\u5E03."
    },
    langMenuLabel: "\u591A\u8BED\u8A00",
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      },
      text: "\u6700\u540E\u66F4\u65B0\u4E8E"
    },
    lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",
    nav: nav2(),
    outline: {
      label: "\u9875\u9762\u5BFC\u822A"
    },
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    sidebar: {
      "/commercial/": { base: "/commercial/", items: sidebarCommercial2() },
      "/components/": { base: "/components/", items: sidebarComponents() },
      "/guide/": { base: "/guide/", items: sidebarGuide2() }
    },
    sidebarMenuLabel: "\u83DC\u5355"
  }
});
function sidebarGuide2() {
  return [
    {
      collapsed: false,
      text: "\u7B80\u4ECB",
      items: [
        {
          link: "introduction/vben",
          text: "\u5173\u4E8E Vben Admin"
        },
        {
          link: "introduction/why",
          text: "\u4E3A\u4EC0\u4E48\u9009\u62E9\u6211\u4EEC?"
        },
        { link: "introduction/quick-start", text: "\u5FEB\u901F\u5F00\u59CB" },
        { link: "introduction/thin", text: "\u7CBE\u7B80\u7248\u672C" },
        {
          base: "/",
          link: "components/introduction",
          text: "\u7EC4\u4EF6\u6587\u6863"
        }
      ]
    },
    {
      text: "\u57FA\u7840",
      items: [
        { link: "essentials/concept", text: "\u57FA\u7840\u6982\u5FF5" },
        { link: "essentials/development", text: "\u672C\u5730\u5F00\u53D1" },
        { link: "essentials/route", text: "\u8DEF\u7531\u548C\u83DC\u5355" },
        { link: "essentials/settings", text: "\u914D\u7F6E" },
        { link: "essentials/icons", text: "\u56FE\u6807" },
        { link: "essentials/styles", text: "\u6837\u5F0F" },
        { link: "essentials/external-module", text: "\u5916\u90E8\u6A21\u5757" },
        { link: "essentials/build", text: "\u6784\u5EFA\u4E0E\u90E8\u7F72" },
        { link: "essentials/server", text: "\u670D\u52A1\u7AEF\u4EA4\u4E92\u4E0E\u6570\u636EMock" }
      ]
    },
    {
      text: "\u6DF1\u5165",
      items: [
        { link: "in-depth/login", text: "\u767B\u5F55" },
        // { link: 'in-depth/layout', text: '布局' },
        { link: "in-depth/theme", text: "\u4E3B\u9898" },
        { link: "in-depth/access", text: "\u6743\u9650" },
        { link: "in-depth/locale", text: "\u56FD\u9645\u5316" },
        { link: "in-depth/features", text: "\u5E38\u7528\u529F\u80FD" },
        { link: "in-depth/check-updates", text: "\u68C0\u67E5\u66F4\u65B0" },
        { link: "in-depth/loading", text: "\u5168\u5C40loading" },
        { link: "in-depth/ui-framework", text: "\u7EC4\u4EF6\u5E93\u5207\u6362" }
      ]
    },
    {
      text: "\u5DE5\u7A0B",
      items: [
        { link: "project/standard", text: "\u89C4\u8303" },
        { link: "project/cli", text: "CLI" },
        { link: "project/dir", text: "\u76EE\u5F55\u8BF4\u660E" },
        { link: "project/test", text: "\u5355\u5143\u6D4B\u8BD5" },
        { link: "project/tailwindcss", text: "Tailwind CSS" },
        { link: "project/changeset", text: "Changeset" },
        { link: "project/vite", text: "Vite Config" }
      ]
    },
    {
      text: "\u5176\u4ED6",
      items: [
        { link: "other/project-update", text: "\u9879\u76EE\u66F4\u65B0" },
        { link: "other/remove-code", text: "\u79FB\u9664\u4EE3\u7801" },
        { link: "other/faq", text: "\u5E38\u89C1\u95EE\u9898" }
      ]
    }
  ];
}
function sidebarCommercial2() {
  return [
    {
      link: "community",
      text: "\u4EA4\u6D41\u7FA4"
    },
    {
      link: "technical-support",
      text: "\u6280\u672F\u652F\u6301"
    },
    {
      link: "customized",
      text: "\u5B9A\u5236\u5F00\u53D1"
    }
  ];
}
function sidebarComponents() {
  return [
    {
      text: "\u7EC4\u4EF6",
      items: [
        {
          link: "introduction",
          text: "\u4ECB\u7ECD"
        }
      ]
    },
    {
      collapsed: false,
      text: "\u5E03\u5C40\u7EC4\u4EF6",
      items: [
        {
          link: "layout-ui/page",
          text: "Page \u9875\u9762"
        }
      ]
    },
    {
      collapsed: false,
      text: "\u901A\u7528\u7EC4\u4EF6",
      items: [
        {
          link: "common-ui/vben-api-component",
          text: "ApiComponent Api\u7EC4\u4EF6\u5305\u88C5\u5668"
        },
        {
          link: "common-ui/vben-alert",
          text: "Alert \u8F7B\u91CF\u63D0\u793A\u6846"
        },
        {
          link: "common-ui/vben-modal",
          text: "Modal \u6A21\u6001\u6846"
        },
        {
          link: "common-ui/vben-drawer",
          text: "Drawer \u62BD\u5C49"
        },
        {
          link: "common-ui/vben-form",
          text: "Form \u8868\u5355"
        },
        {
          link: "common-ui/vben-vxe-table",
          text: "Vxe Table \u8868\u683C"
        },
        {
          link: "common-ui/vben-count-to-animator",
          text: "CountToAnimator \u6570\u5B57\u52A8\u753B"
        },
        {
          link: "common-ui/vben-ellipsis-text",
          text: "EllipsisText \u7701\u7565\u6587\u672C"
        }
      ]
    }
  ];
}
function nav2() {
  return [
    {
      activeMatch: "^/(guide|components)/",
      text: "\u6587\u6863",
      items: [
        {
          activeMatch: "^/guide/",
          link: "/guide/introduction/vben",
          text: "\u6307\u5357"
        },
        {
          activeMatch: "^/components/",
          link: "/components/introduction",
          text: "\u7EC4\u4EF6"
        },
        {
          text: "\u5386\u53F2\u7248\u672C",
          items: [
            {
              link: "https://doc.vvbin.cn",
              text: "2.x\u7248\u672C\u6587\u6863"
            }
          ]
        }
      ]
    },
    {
      text: "\u6F14\u793A",
      items: [
        {
          text: "Vben Admin",
          items: [
            {
              link: "https://www.vben.pro",
              text: "\u6F14\u793A\u7248\u672C"
            },
            {
              link: "https://ant.vben.pro",
              text: "Ant Design Vue \u7248\u672C"
            },
            {
              link: "https://naive.vben.pro",
              text: "Naive \u7248\u672C"
            },
            {
              link: "https://ele.vben.pro",
              text: "Element Plus\u7248\u672C"
            }
          ]
        },
        {
          text: "\u5176\u4ED6",
          items: [
            {
              link: "https://vben.vvbin.cn",
              text: "Vben Admin 2.x"
            }
          ]
        }
      ]
    },
    {
      text: version,
      items: [
        {
          link: "https://github.com/vbenjs/vue-vben-admin/releases",
          text: "\u66F4\u65B0\u65E5\u5FD7"
        },
        {
          link: "https://github.com/orgs/vbenjs/projects/5",
          text: "\u8DEF\u7EBF\u56FE"
        },
        {
          link: "https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md",
          text: "\u8D21\u732E"
        }
      ]
    },
    {
      link: "/commercial/technical-support",
      text: "\u{1F984} \u6280\u672F\u652F\u6301"
    },
    {
      link: "/sponsor/personal",
      text: "\u2728 \u8D5E\u52A9"
    },
    {
      link: "/commercial/community",
      text: "\u{1F468}\u200D\u{1F466}\u200D\u{1F466} \u4EA4\u6D41\u7FA4"
      // items: [
      //   {
      //     link: 'https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=22ySzj7pKiw&businessType=9&from=246610&biz=ka&mainSourceId=share&subSourceId=others&jumpsource=shorturl#/pc',
      //     text: 'QQ频道',
      //   },
      //   {
      //     link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=mjZmlhgVzzUxvdxllB6C1vHpX8O8QRL0&authKey=DBdFbBwERmfaKY95JvRWqLCJIRGJAmKyZbrpzZ41EKDMZ5SR6MfbjOBaaNRN73fr&noverify=0&group_code=4286109',
      //     text: 'QQ群',
      //   },
      //   {
      //     link: 'https://discord.gg/VU62jTecad',
      //     text: 'Discord',
      //   },
      // ],
    }
    // {
    //   link: '/friend-links/',
    //   text: '🤝 友情链接',
    // },
  ];
}

// .vitepress/config/index.mts
var index_default = withPwa(
  defineConfigWithTheme({
    ...shared,
    locales: {
      en: {
        label: "English",
        lang: "en",
        link: "/en/",
        ...en
      },
      root: {
        label: "\u7B80\u4F53\u4E2D\u6587",
        lang: "zh-CN",
        ...zh
      }
    }
  })
);
export {
  index_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgubXRzIiwgIi52aXRlcHJlc3MvY29uZmlnL2VuLm10cyIsICIuLi9wYWNrYWdlLmpzb24iLCAiLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLm10cyIsICIudml0ZXByZXNzL2NvbmZpZy9wbHVnaW5zL2RlbW8tcHJldmlldy50cyIsICIudml0ZXByZXNzL2NvbmZpZy96aC5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGluZGV4Lm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVnNDb2RlUHJvamVjdHMvdnVlLXZiZW4tYWRtaW4vZG9jcy8udml0ZXByZXNzL2NvbmZpZy9pbmRleC5tdHNcIjtpbXBvcnQgeyB3aXRoUHdhIH0gZnJvbSAnQHZpdGUtcHdhL3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBlbiB9IGZyb20gJy4vZW4ubXRzJztcbmltcG9ydCB7IHNoYXJlZCB9IGZyb20gJy4vc2hhcmVkLm10cyc7XG5pbXBvcnQgeyB6aCB9IGZyb20gJy4vemgubXRzJztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcbiAgZGVmaW5lQ29uZmlnV2l0aFRoZW1lKHtcbiAgICAuLi5zaGFyZWQsXG4gICAgbG9jYWxlczoge1xuICAgICAgZW46IHtcbiAgICAgICAgbGFiZWw6ICdFbmdsaXNoJyxcbiAgICAgICAgbGFuZzogJ2VuJyxcbiAgICAgICAgbGluazogJy9lbi8nLFxuICAgICAgICAuLi5lbixcbiAgICAgIH0sXG4gICAgICByb290OiB7XG4gICAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgICAgbGFuZzogJ3poLUNOJyxcbiAgICAgICAgLi4uemgsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcVnNDb2RlUHJvamVjdHNcXFxcdnVlLXZiZW4tYWRtaW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcVnNDb2RlUHJvamVjdHNcXFxcdnVlLXZiZW4tYWRtaW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxlbi5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1ZzQ29kZVByb2plY3RzL3Z1ZS12YmVuLWFkbWluL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvZW4ubXRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IGVuID0gZGVmaW5lQ29uZmlnKHtcbiAgZGVzY3JpcHRpb246ICdWYmVuIEFkbWluICYgRW50ZXJwcmlzZSBsZXZlbCBtYW5hZ2VtZW50IHN5c3RlbSBmcmFtZXdvcmsnLFxuICBsYW5nOiAnZW4tVVMnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdUaGVtZScsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBEYXJrIE1vZGUnLFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgbmV4dDogJ05leHQgUGFnZScsXG4gICAgICBwcmV2OiAnUHJldmlvdXMgUGFnZScsXG4gICAgfSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vZWRpdC9tYWluL2RvY3Mvc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjAtJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IFZiZW5gLFxuICAgICAgbWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxuICAgIH0sXG4gICAgbGFuZ01lbnVMYWJlbDogJ0xhbmd1YWdlJyxcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdzaG9ydCcsXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bScsXG4gICAgICB9LFxuICAgICAgdGV4dDogJ0xhc3QgdXBkYXRlZCBvbicsXG4gICAgfSxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBMaWdodCBNb2RlJyxcbiAgICBuYXY6IG5hdigpLFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnTmF2aWdhdGUnLFxuICAgIH0sXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ0JhY2sgdG8gdG9wJyxcbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2VuL2NvbW1lcmNpYWwvJzoge1xuICAgICAgICBiYXNlOiAnL2VuL2NvbW1lcmNpYWwvJyxcbiAgICAgICAgaXRlbXM6IHNpZGViYXJDb21tZXJjaWFsKCksXG4gICAgICB9LFxuICAgICAgJy9lbi9ndWlkZS8nOiB7IGJhc2U6ICcvZW4vZ3VpZGUvJywgaXRlbXM6IHNpZGViYXJHdWlkZSgpIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBzaWRlYmFyR3VpZGUoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdBYm91dCBWYmVuIEFkbWluJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24vd2h5JyxcbiAgICAgICAgICB0ZXh0OiAnV2h5IENob29zZSBVcz8nLFxuICAgICAgICB9LFxuICAgICAgICB7IGxpbms6ICdpbnRyb2R1Y3Rpb24vcXVpY2stc3RhcnQnLCB0ZXh0OiAnUXVpY2sgU3RhcnQnIH0sXG4gICAgICAgIHsgbGluazogJ2ludHJvZHVjdGlvbi90aGluJywgdGV4dDogJ0xpdGUgVmVyc2lvbicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQmFzaWNzJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvY29uY2VwdCcsIHRleHQ6ICdCYXNpYyBDb25jZXB0cycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9kZXZlbG9wbWVudCcsIHRleHQ6ICdMb2NhbCBEZXZlbG9wbWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9yb3V0ZScsIHRleHQ6ICdSb3V0aW5nIGFuZCBNZW51JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3NldHRpbmdzJywgdGV4dDogJ0NvbmZpZ3VyYXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvaWNvbnMnLCB0ZXh0OiAnSWNvbnMnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc3R5bGVzJywgdGV4dDogJ1N0eWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9leHRlcm5hbC1tb2R1bGUnLCB0ZXh0OiAnRXh0ZXJuYWwgTW9kdWxlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9idWlsZCcsIHRleHQ6ICdCdWlsZCBhbmQgRGVwbG95bWVudCcgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zZXJ2ZXInLCB0ZXh0OiAnU2VydmVyIEludGVyYWN0aW9uIGFuZCBEYXRhIE1vY2snIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0FkdmFuY2VkJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvZ2luJywgdGV4dDogJ0xvZ2luJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC90aGVtZScsIHRleHQ6ICdUaGVtZScgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvYWNjZXNzJywgdGV4dDogJ0FjY2VzcyBDb250cm9sJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2NhbGUnLCB0ZXh0OiAnSW50ZXJuYXRpb25hbGl6YXRpb24nIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2ZlYXR1cmVzJywgdGV4dDogJ0NvbW1vbiBGZWF0dXJlcycgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvY2hlY2stdXBkYXRlcycsIHRleHQ6ICdDaGVjayBVcGRhdGVzJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC9sb2FkaW5nJywgdGV4dDogJ0dsb2JhbCBMb2FkaW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC91aS1mcmFtZXdvcmsnLCB0ZXh0OiAnVUkgRnJhbWV3b3JrIFN3aXRjaGluZycgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnRW5naW5lZXJpbmcnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9zdGFuZGFyZCcsIHRleHQ6ICdTdGFuZGFyZHMnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvY2xpJywgdGV4dDogJ0NMSScgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9kaXInLCB0ZXh0OiAnRGlyZWN0b3J5IEV4cGxhbmF0aW9uJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3Rlc3QnLCB0ZXh0OiAnVW5pdCBUZXN0aW5nJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3RhaWx3aW5kY3NzJywgdGV4dDogJ1RhaWx3aW5kIENTUycgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC9jaGFuZ2VzZXQnLCB0ZXh0OiAnQ2hhbmdlc2V0JyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L3ZpdGUnLCB0ZXh0OiAnVml0ZSBDb25maWcnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ090aGVycycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IGxpbms6ICdvdGhlci9wcm9qZWN0LXVwZGF0ZScsIHRleHQ6ICdQcm9qZWN0IFVwZGF0ZScgfSxcbiAgICAgICAgeyBsaW5rOiAnb3RoZXIvcmVtb3ZlLWNvZGUnLCB0ZXh0OiAnUmVtb3ZlIENvZGUnIH0sXG4gICAgICAgIHsgbGluazogJ290aGVyL2ZhcScsIHRleHQ6ICdGQVEnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJDb21tZXJjaWFsKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBsaW5rOiAnY29tbXVuaXR5JyxcbiAgICAgIHRleHQ6ICdDb21tdW5pdHknLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJ3RlY2huaWNhbC1zdXBwb3J0JyxcbiAgICAgIHRleHQ6ICdUZWNobmljYWwtc3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnY3VzdG9taXplZCcsXG4gICAgICB0ZXh0OiAnQ3VzdG9taXplZCcsXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gbmF2KCk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi8oZ3VpZGV8Y29tcG9uZW50cykvJyxcbiAgICAgIHRleHQ6ICdEb2MnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9lbi9ndWlkZS8nLFxuICAgICAgICAgIGxpbms6ICcvZW4vZ3VpZGUvaW50cm9kdWN0aW9uL3ZiZW4nLFxuICAgICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBhY3RpdmVNYXRjaDogJ14vZW4vY29tcG9uZW50cy8nLFxuICAgICAgICAvLyAgIGxpbms6ICcvZW4vY29tcG9uZW50cy9pbnRyb2R1Y3Rpb24nLFxuICAgICAgICAvLyAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIaXN0b3JpY2FsIFZlcnNpb25zJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2MudnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnMi54IFZlcnNpb24gRG9jdW1lbnRhdGlvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0RlbW8nLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdWYmVuIEFkbWluJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly93d3cudmJlbi5wcm8nLFxuICAgICAgICAgICAgICB0ZXh0OiAnRGVtbyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2FudC52YmVuLnBybycsXG4gICAgICAgICAgICAgIHRleHQ6ICdBbnQgRGVzaWduIFZ1ZSBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL25haXZlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ05haXZlIFZlcnNpb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZWxlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0VsZW1lbnQgUGx1cyBWZXJzaW9uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPdGhlcnMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL3ZiZW4udnZiaW4uY24nLFxuICAgICAgICAgICAgICB0ZXh0OiAnVmJlbiBBZG1pbiAyLngnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IHZlcnNpb24sXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vcmVsZWFzZXMnLFxuICAgICAgICAgIHRleHQ6ICdDaGFuZ2Vsb2cnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vcmdzL3ZiZW5qcy9wcm9qZWN0cy81JyxcbiAgICAgICAgICB0ZXh0OiAnUm9hZG1hcCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC90ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgICB0ZXh0OiAnXHVEODNFXHVERDg0IFRlY2ggU3VwcG9ydCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnL3Nwb25zb3IvcGVyc29uYWwnLFxuICAgICAgdGV4dDogJ1x1MjcyOCBTcG9uc29yJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC9jb21tdW5pdHknLFxuICAgICAgdGV4dDogJ1x1RDgzRFx1REM2OFx1MjAwRFx1RDgzRFx1REM2Nlx1MjAwRFx1RDgzRFx1REM2NiBDb21tdW5pdHknLFxuICAgIH0sXG4gICAgLy8ge1xuICAgIC8vICAgbGluazogJy9mcmllbmQtbGlua3MvJyxcbiAgICAvLyAgIHRleHQ6ICdcdUQ4M0VcdUREMUQgRnJpZW5kIExpbmtzJyxcbiAgICAvLyB9LFxuICBdO1xufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidmJlbi1hZG1pbi1tb25vcmVwb1wiLFxuICBcInZlcnNpb25cIjogXCI1LjUuOVwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJtb25vcmVwb1wiLFxuICAgIFwidHVyYm9cIixcbiAgICBcInZiZW5cIixcbiAgICBcInZiZW4gYWRtaW5cIixcbiAgICBcInZiZW4gcHJvXCIsXG4gICAgXCJ2dWVcIixcbiAgICBcInZ1ZSBhZG1pblwiLFxuICAgIFwidnVlIHZiZW4gYWRtaW5cIixcbiAgICBcInZ1ZSB2YmVuIGFkbWluIHByb1wiLFxuICAgIFwidnVlM1wiXG4gIF0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluXCIsXG4gIFwiYnVnc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4vaXNzdWVzXCIsXG4gIFwicmVwb3NpdG9yeVwiOiBcInZiZW5qcy92dWUtdmJlbi1hZG1pbi5naXRcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJ2YmVuXCIsXG4gICAgXCJlbWFpbFwiOiBcImFubi52YmVuQGdtYWlsLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FubmN3YlwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJjcm9zcy1lbnYgTk9ERV9PUFRJT05TPS0tbWF4LW9sZC1zcGFjZS1zaXplPTgxOTIgdHVyYm8gYnVpbGRcIixcbiAgICBcImJ1aWxkOmFuYWx5emVcIjogXCJ0dXJibyBidWlsZDphbmFseXplXCIsXG4gICAgXCJidWlsZDpkb2NrZXJcIjogXCIuL3NjcmlwdHMvZGVwbG95L2J1aWxkLWxvY2FsLWRvY2tlci1pbWFnZS5zaFwiLFxuICAgIFwiYnVpbGQ6ZG9jc1wiOiBcInBucG0gcnVuIGJ1aWxkIC0tZmlsdGVyPUB2YmVuL2RvY3NcIixcbiAgICBcImJ1aWxkOm5haXZlXCI6IFwicG5wbSBydW4gYnVpbGQgLS1maWx0ZXI9QHZiZW4vd2ViLW5haXZlXCIsXG4gICAgXCJjaGFuZ2VzZXRcIjogXCJwbnBtIGV4ZWMgY2hhbmdlc2V0XCIsXG4gICAgXCJjaGVja1wiOiBcInBucG0gcnVuIGNoZWNrOmNpcmN1bGFyICYmIHBucG0gcnVuIGNoZWNrOmRlcCAmJiBwbnBtIHJ1biBjaGVjazp0eXBlICYmIHBucG0gY2hlY2s6Y3NwZWxsXCIsXG4gICAgXCJjaGVjazpjaXJjdWxhclwiOiBcInZzaCBjaGVjay1jaXJjdWxhclwiLFxuICAgIFwiY2hlY2s6Y3NwZWxsXCI6IFwiY3NwZWxsIGxpbnQgKiovKi50cyAqKi9SRUFETUUubWQgLmNoYW5nZXNldC8qLm1kIC0tbm8tcHJvZ3Jlc3NcIixcbiAgICBcImNoZWNrOmRlcFwiOiBcInZzaCBjaGVjay1kZXBcIixcbiAgICBcImNoZWNrOnR5cGVcIjogXCJ0dXJibyBydW4gdHlwZWNoZWNrXCIsXG4gICAgXCJjbGVhblwiOiBcIm5vZGUgLi9zY3JpcHRzL2NsZWFuLm1qc1wiLFxuICAgIFwiY29tbWl0XCI6IFwiY3pnXCIsXG4gICAgXCJkZXZcIjogXCJ0dXJiby1ydW4gZGV2XCIsXG4gICAgXCJkZXY6ZG9jc1wiOiBcInBucG0gLUYgQHZiZW4vZG9jcyBydW4gZGV2XCIsXG4gICAgXCJkZXY6bmFpdmVcIjogXCJwbnBtIC1GIEB2YmVuL3dlYi1uYWl2ZSBydW4gZGV2XCIsXG4gICAgXCJmb3JtYXRcIjogXCJ2c2ggbGludCAtLWZvcm1hdFwiLFxuICAgIFwibGludFwiOiBcInZzaCBsaW50XCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInBucG0gLXIgcnVuIHN0dWIgLS1pZi1wcmVzZW50XCIsXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwicHJldmlld1wiOiBcInR1cmJvLXJ1biBwcmV2aWV3XCIsXG4gICAgXCJwdWJsaW50XCI6IFwidnNoIHB1YmxpbnRcIixcbiAgICBcInJlaW5zdGFsbFwiOiBcInBucG0gY2xlYW4gLS1kZWwtbG9jayAmJiBwbnBtIGluc3RhbGxcIixcbiAgICBcInRlc3Q6dW5pdFwiOiBcInZpdGVzdCBydW4gLS1kb21cIixcbiAgICBcInRlc3Q6ZTJlXCI6IFwidHVyYm8gcnVuIHRlc3Q6ZTJlXCIsXG4gICAgXCJ1cGRhdGU6ZGVwc1wiOiBcIm5weCB0YXplIC1yIC13XCIsXG4gICAgXCJ2ZXJzaW9uXCI6IFwicG5wbSBleGVjIGNoYW5nZXNldCB2ZXJzaW9uICYmIHBucG0gaW5zdGFsbCAtLW5vLWZyb3plbi1sb2NrZmlsZVwiLFxuICAgIFwiY2F0YWxvZ1wiOiBcInBucHggY29kZW1vZCBwbnBtL2NhdGFsb2dcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY2hhbmdlc2V0cy9jaGFuZ2Vsb2ctZ2l0aHViXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkBjaGFuZ2VzZXRzL2NsaVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJAcGxheXdyaWdodC90ZXN0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB2YmVuL2NvbW1pdGxpbnQtY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL2VzbGludC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vcHJldHRpZXItY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3N0eWxlbGludC1jb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZiZW4vdGFpbHdpbmQtY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3RzY29uZmlnXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2YmVuL3R1cmJvLXJ1blwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi92aXRlLWNvbmZpZ1wiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAdmJlbi92c2hcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiQHZ1ZS90ZXN0LXV0aWxzXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwiY3NwZWxsXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcImhhcHB5LWRvbVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJpcy1jaVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJsZWZ0aG9va1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJwbGF5d3JpZ2h0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInJpbXJhZlwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0dXJib1wiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInVuYnVpbGRcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidml0ZVwiOiBcImNhdGFsb2c6XCIsXG4gICAgXCJ2aXRlc3RcIjogXCJjYXRhbG9nOlwiLFxuICAgIFwidnVlXCI6IFwiY2F0YWxvZzpcIixcbiAgICBcInZ1ZS10c2NcIjogXCJjYXRhbG9nOlwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0yMC4xMC4wXCIsXG4gICAgXCJwbnBtXCI6IFwiPj05LjEyLjBcIlxuICB9LFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUAxMC4yMi4wK3NoYTUxMi5iZjA0OWVmZTk5NWIyOGY1MjdmZDJiNDFhZTA0NzRjZTI5MTg2ZjdlZGNiM2JmNTQ1MDg3YmQ2MWZiYmViYjJiZjc1MzYyZDEzMDdmZGEwOWMyZDI4OGUxZTQ5OTc4N2FjMTJkNGZjYjYxN2E5NzQ3MThhNjA1MWYyZWVlNzQxY1wiLFxuICBcInBucG1cIjoge1xuICAgIFwicGVlckRlcGVuZGVuY3lSdWxlc1wiOiB7XG4gICAgICBcImFsbG93ZWRWZXJzaW9uc1wiOiB7XG4gICAgICAgIFwiZXNsaW50XCI6IFwiKlwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm92ZXJyaWRlc1wiOiB7XG4gICAgICBcIkBhc3QtZ3JlcC9uYXBpXCI6IFwiY2F0YWxvZzpcIixcbiAgICAgIFwiQGN0cmwvdGlueWNvbG9yXCI6IFwiY2F0YWxvZzpcIixcbiAgICAgIFwiY2xzeFwiOiBcImNhdGFsb2c6XCIsXG4gICAgICBcImVzYnVpbGRcIjogXCIwLjI1LjNcIixcbiAgICAgIFwicGluaWFcIjogXCJjYXRhbG9nOlwiLFxuICAgICAgXCJ2dWVcIjogXCJjYXRhbG9nOlwiXG4gICAgfSxcbiAgICBcIm5ldmVyQnVpbHREZXBlbmRlbmNpZXNcIjogW1xuICAgICAgXCJjYW52YXNcIixcbiAgICAgIFwibm9kZS1neXBcIlxuICAgIF1cbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHNoYXJlZC5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1ZzQ29kZVByb2plY3RzL3Z1ZS12YmVuLWFkbWluL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLm10c1wiO2ltcG9ydCB0eXBlIHsgUHdhT3B0aW9ucyB9IGZyb20gJ0B2aXRlLXB3YS92aXRlcHJlc3MnO1xuaW1wb3J0IHR5cGUgeyBIZWFkQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcblxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmltcG9ydCB7XG4gIHZpdGVBcmNoaXZlclBsdWdpbixcbiAgdml0ZVZ4ZVRhYmxlSW1wb3J0c1BsdWdpbixcbn0gZnJvbSAnQHZiZW4vdml0ZS1jb25maWcnO1xuXG5pbXBvcnQge1xuICBHaXRDaGFuZ2Vsb2csXG4gIEdpdENoYW5nZWxvZ01hcmtkb3duU2VjdGlvbixcbn0gZnJvbSAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4tZ2l0LWNoYW5nZWxvZy92aXRlJztcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHBvc3Rjc3NJc29sYXRlU3R5bGVzIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCB7XG4gIGdyb3VwSWNvbk1kUGx1Z2luLFxuICBncm91cEljb25WaXRlUGx1Z2luLFxufSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zJztcblxuaW1wb3J0IHsgZGVtb1ByZXZpZXdQbHVnaW4gfSBmcm9tICcuL3BsdWdpbnMvZGVtby1wcmV2aWV3JztcblxuZXhwb3J0IGNvbnN0IHNoYXJlZCA9IGRlZmluZUNvbmZpZyh7XG4gIGFwcGVhcmFuY2U6ICdkYXJrJyxcbiAgaGVhZDogaGVhZCgpLFxuICBtYXJrZG93bjoge1xuICAgIHByZUNvbmZpZyhtZCkge1xuICAgICAgbWQudXNlKGRlbW9QcmV2aWV3UGx1Z2luKTtcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbik7XG4gICAgfSxcbiAgfSxcbiAgcHdhOiBwd2EoKSxcbiAgc3JjRGlyOiAnc3JjJyxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBpMThuUm91dGluZzogdHJ1ZSxcbiAgICBsb2dvOiAnaHR0cHM6Ly91bnBrZy5jb20vQHZiZW5qcy9zdGF0aWMtc291cmNlQDAuMS43L3NvdXJjZS9sb2dvLXYxLndlYnAnLFxuICAgIHNpdGVUaXRsZTogJ0dLIFpBUCcsXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluJyB9LFxuICAgIF0sXG4gIH0sXG4gIHRpdGxlOiAnR0sgWkFQJyxcbiAgdml0ZToge1xuICAgIGJ1aWxkOiB7XG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IEluZmluaXR5LFxuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgdGFpbHdpbmQoKSxcbiAgICAgICAgICBwb3N0Y3NzSXNvbGF0ZVN0eWxlcyh7IGluY2x1ZGVGaWxlczogWy92cC1kb2NcXC5jc3MvXSB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhcGk6ICdtb2Rlcm4nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGpzb246IHtcbiAgICAgIHN0cmluZ2lmeTogdHJ1ZSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIEdpdENoYW5nZWxvZyh7XG4gICAgICAgIG1hcEF1dGhvcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtYXBCeU5hbWVBbGlhc2VzOiBbJ1ZiZW4nXSxcbiAgICAgICAgICAgIG5hbWU6ICd2YmVuJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiAnYW5uY3diJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd2aW5jZScsXG4gICAgICAgICAgICB1c2VybmFtZTogJ3ZpbmNlMjkyMDA3JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMaSBLdWknLFxuICAgICAgICAgICAgdXNlcm5hbWU6ICdsaWt1aTYyOCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVwb1VSTDogKCkgPT4gJ2h0dHBzOi8vZ2l0aHViLmNvbS92YmVuanMvdnVlLXZiZW4tYWRtaW4nLFxuICAgICAgfSksXG4gICAgICBHaXRDaGFuZ2Vsb2dNYXJrZG93blNlY3Rpb24oKSxcbiAgICAgIHZpdGVBcmNoaXZlclBsdWdpbih7IG91dHB1dERpcjogJy52aXRlcHJlc3MnIH0pLFxuICAgICAgZ3JvdXBJY29uVml0ZVBsdWdpbigpLFxuICAgICAgYXdhaXQgdml0ZVZ4ZVRhYmxlSW1wb3J0c1BsdWdpbigpLFxuICAgIF0sXG4gICAgc2VydmVyOiB7XG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogWycuLi8uLiddLFxuICAgICAgfSxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBwb3J0OiA2MTczLFxuICAgIH0sXG5cbiAgICBzc3I6IHtcbiAgICAgIGV4dGVybmFsOiBbJ0B2dWUvcmVwbCddLFxuICAgIH0sXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gaGVhZCgpOiBIZWFkQ29uZmlnW10ge1xuICByZXR1cm4gW1xuICAgIFsnbWV0YScsIHsgY29udGVudDogJ1ZiZW5qcyBUZWFtJywgbmFtZTogJ2F1dGhvcicgfV0sXG4gICAgW1xuICAgICAgJ21ldGEnLFxuICAgICAge1xuICAgICAgICBjb250ZW50OiAndmJlbiwgdml0ZWpzLCB2aXRlLCBzaGFjZG4tdWksIHZ1ZScsXG4gICAgICAgIG5hbWU6ICdrZXl3b3JkcycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydsaW5rJywgeyBocmVmOiAnL2Zhdmljb24uaWNvJywgcmVsOiAnaWNvbicsIHR5cGU6ICdpbWFnZS9zdmcreG1sJyB9XSxcbiAgICBbXG4gICAgICAnbWV0YScsXG4gICAgICB7XG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgJ3dpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEsbWluaW11bS1zY2FsZT0xLjAsbWF4aW11bS1zY2FsZT0xLjAsdXNlci1zY2FsYWJsZT1ubycsXG4gICAgICAgIG5hbWU6ICd2aWV3cG9ydCcsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydtZXRhJywgeyBjb250ZW50OiAndmJlbiBhZG1pbiBkb2NzJywgbmFtZTogJ2tleXdvcmRzJyB9XSxcbiAgICBbJ2xpbmsnLCB7IGhyZWY6ICcvZmF2aWNvbi5pY28nLCByZWw6ICdpY29uJyB9XSxcbiAgICAvLyBbXG4gICAgLy8gICAnc2NyaXB0JyxcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgc3JjOiAnaHR0cHM6Ly9jZG4udGFpbHdpbmRjc3MuY29tJyxcbiAgICAvLyAgIH0sXG4gICAgLy8gXSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gcHdhKCk6IFB3YU9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGluY2x1ZGVNYW5pZmVzdEljb25zOiBmYWxzZSxcbiAgICBtYW5pZmVzdDoge1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdHSyBaQVAgaXMgYSBtb2Rlcm4gYWRtaW4gZGFzaGJvYXJkIHRlbXBsYXRlIGJhc2VkIG9uIFZ1ZSAzLiAnLFxuICAgICAgaWNvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgc3JjOiAnaHR0cHM6Ly91bnBrZy5jb20vQHZiZW5qcy9zdGF0aWMtc291cmNlQDAuMS43L3NvdXJjZS9wd2EtaWNvbi0xOTIucG5nJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgc3JjOiAnaHR0cHM6Ly91bnBrZy5jb20vQHZiZW5qcy9zdGF0aWMtc291cmNlQDAuMS43L3NvdXJjZS9wd2EtaWNvbi01MTIucG5nJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBpZDogJy8nLFxuICAgICAgbmFtZTogJ0dLIFpBUCBEb2MnLFxuICAgICAgc2hvcnRfbmFtZTogJ3ZiZW5fYWRtaW5fZG9jJyxcbiAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgfSxcbiAgICBvdXREaXI6IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy52aXRlcHJlc3MvZGlzdCcpLFxuICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgIHdvcmtib3g6IHtcbiAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntjc3MsanMsaHRtbCxzdmcscG5nLGljbyx0eHQsd29mZjJ9J10sXG4gICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNSAqIDEwMjQgKiAxMDI0LFxuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFZzQ29kZVByb2plY3RzXFxcXHZ1ZS12YmVuLWFkbWluXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcVnNDb2RlUHJvamVjdHNcXFxcdnVlLXZiZW4tYWRtaW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxwbHVnaW5zXFxcXGRlbW8tcHJldmlldy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVnNDb2RlUHJvamVjdHMvdnVlLXZiZW4tYWRtaW4vZG9jcy8udml0ZXByZXNzL2NvbmZpZy9wbHVnaW5zL2RlbW8tcHJldmlldy50c1wiO2ltcG9ydCB0eXBlIHsgTWFya2Rvd25FbnYsIE1hcmtkb3duUmVuZGVyZXIgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5pbXBvcnQgY3J5cHRvIGZyb20gJ25vZGU6Y3J5cHRvJztcbmltcG9ydCB7IHJlYWRkaXJTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IGNvbnN0IHJhd1BhdGhSZWdleHAgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLXN1cGVyLWxpbmVhci1iYWNrdHJhY2tpbmcsIHJlZ2V4cC9zdHJpY3RcbiAgL14oLis/KD86XFwuKFtcXGRhLXpdKykpPykoI1tcXHctXSspPyg/OiA/eyhcXGQrKD86WywtXVxcZCspKik/ID8oXFxTKyk/fSk/ID8oPzpcXFsoLispXSk/JC87XG5cbmZ1bmN0aW9uIHJhd1BhdGhUb1Rva2VuKHJhd1BhdGg6IHN0cmluZykge1xuICBjb25zdCBbXG4gICAgZmlsZXBhdGggPSAnJyxcbiAgICBleHRlbnNpb24gPSAnJyxcbiAgICByZWdpb24gPSAnJyxcbiAgICBsaW5lcyA9ICcnLFxuICAgIGxhbmcgPSAnJyxcbiAgICByYXdUaXRsZSA9ICcnLFxuICBdID0gKHJhd1BhdGhSZWdleHAuZXhlYyhyYXdQYXRoKSB8fCBbXSkuc2xpY2UoMSk7XG5cbiAgY29uc3QgdGl0bGUgPSByYXdUaXRsZSB8fCBmaWxlcGF0aC5zcGxpdCgnLycpLnBvcCgpIHx8ICcnO1xuXG4gIHJldHVybiB7IGV4dGVuc2lvbiwgZmlsZXBhdGgsIGxhbmcsIGxpbmVzLCByZWdpb24sIHRpdGxlIH07XG59XG5cbmV4cG9ydCBjb25zdCBkZW1vUHJldmlld1BsdWdpbiA9IChtZDogTWFya2Rvd25SZW5kZXJlcikgPT4ge1xuICBtZC5jb3JlLnJ1bGVyLmFmdGVyKCdpbmxpbmUnLCAnZGVtby1wcmV2aWV3JywgKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgaW5zZXJ0Q29tcG9uZW50SW1wb3J0ID0gKGltcG9ydFN0cmluZzogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHN0YXRlLnRva2Vucy5maW5kSW5kZXgoXG4gICAgICAgIChpKSA9PiBpLnR5cGUgPT09ICdodG1sX2Jsb2NrJyAmJiBpLmNvbnRlbnQubWF0Y2goLzxzY3JpcHQgc2V0dXA+L2cpLFxuICAgICAgKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29uc3QgaW1wb3J0Q29tcG9uZW50ID0gbmV3IHN0YXRlLlRva2VuKCdodG1sX2Jsb2NrJywgJycsIDApO1xuICAgICAgICBpbXBvcnRDb21wb25lbnQuY29udGVudCA9IGA8c2NyaXB0IHNldHVwPlxcbiR7aW1wb3J0U3RyaW5nfVxcbjwvc2NyaXB0PlxcbmA7XG4gICAgICAgIHN0YXRlLnRva2Vucy5zcGxpY2UoMCwgMCwgaW1wb3J0Q29tcG9uZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdGF0ZS50b2tlbnNbaW5kZXhdKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IHN0YXRlLnRva2Vuc1tpbmRleF0uY29udGVudDtcbiAgICAgICAgICBzdGF0ZS50b2tlbnNbaW5kZXhdLmNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAnPC9zY3JpcHQ+JyxcbiAgICAgICAgICAgIGAke2ltcG9ydFN0cmluZ31cXG48L3NjcmlwdD5gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIERlZmluZSB0aGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHRoZSBkZXNpcmVkIHBhdHRlcm5cbiAgICBjb25zdCByZWdleCA9IC88RGVtb1ByZXZpZXdbXj5dKlxcc2Rpcj1cIihbXlwiXSopXCIvZztcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIE1hcmtkb3duIGNvbnRlbnQgYW5kIHJlcGxhY2UgdGhlIHBhdHRlcm5cbiAgICBzdGF0ZS5zcmMgPSBzdGF0ZS5zcmMucmVwbGFjZUFsbChyZWdleCwgKF9tYXRjaCwgZGlyKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnREaXIgPSBqb2luKHByb2Nlc3MuY3dkKCksICdzcmMnLCBkaXIpLnJlcGxhY2VBbGwoXG4gICAgICAgICdcXFxcJyxcbiAgICAgICAgJy8nLFxuICAgICAgKTtcblxuICAgICAgbGV0IGNoaWxkRmlsZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBsZXQgZGlyRXhpc3RzID0gdHJ1ZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY2hpbGRGaWxlcyA9XG4gICAgICAgICAgcmVhZGRpclN5bmMoY29tcG9uZW50RGlyLCB7XG4gICAgICAgICAgICBlbmNvZGluZzogJ3V0ZjgnLFxuICAgICAgICAgICAgcmVjdXJzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHdpdGhGaWxlVHlwZXM6IGZhbHNlLFxuICAgICAgICAgIH0pIHx8IFtdO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGRpckV4aXN0cyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRpckV4aXN0cykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVuaXF1ZVdvcmQgPSBnZW5lcmF0ZUNvbnRlbnRIYXNoKGNvbXBvbmVudERpcik7XG5cbiAgICAgIGNvbnN0IENvbXBvbmVudE5hbWUgPSBgRGVtb0NvbXBvbmVudF8ke3VuaXF1ZVdvcmR9YDtcbiAgICAgIGluc2VydENvbXBvbmVudEltcG9ydChcbiAgICAgICAgYGltcG9ydCAke0NvbXBvbmVudE5hbWV9IGZyb20gJyR7Y29tcG9uZW50RGlyfS9pbmRleC52dWUnYCxcbiAgICAgICk7XG4gICAgICBjb25zdCB7IHBhdGg6IF9wYXRoIH0gPSBzdGF0ZS5lbnYgYXMgTWFya2Rvd25FbnY7XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gc3RhdGUudG9rZW5zLmZpbmRJbmRleCgoaSkgPT4gaS5jb250ZW50Lm1hdGNoKHJlZ2V4KSk7XG5cbiAgICAgIGlmICghc3RhdGUudG9rZW5zW2luZGV4XSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBjb25zdCBmaXJzdFN0cmluZyA9ICdpbmRleC52dWUnO1xuICAgICAgY2hpbGRGaWxlcyA9IGNoaWxkRmlsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYSA9PT0gZmlyc3RTdHJpbmcpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGIgPT09IGZpcnN0U3RyaW5nKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiLCAnZW4nLCB7IHNlbnNpdGl2aXR5OiAnYmFzZScgfSk7XG4gICAgICB9KTtcbiAgICAgIHN0YXRlLnRva2Vuc1tpbmRleF0uY29udGVudCA9XG4gICAgICAgIGA8RGVtb1ByZXZpZXcgZmlsZXM9XCIke2VuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjaGlsZEZpbGVzKSl9XCIgPjwke0NvbXBvbmVudE5hbWV9Lz5cbiAgICAgICAgYDtcblxuICAgICAgY29uc3QgX2R1bW15VG9rZW4gPSBuZXcgc3RhdGUuVG9rZW4oJycsICcnLCAwKTtcbiAgICAgIGNvbnN0IHRva2VuQXJyYXk6IEFycmF5PHR5cGVvZiBfZHVtbXlUb2tlbj4gPSBbXTtcbiAgICAgIGNoaWxkRmlsZXMuZm9yRWFjaCgoZmlsZW5hbWUpID0+IHtcbiAgICAgICAgLy8gY29uc3Qgc2xvdE5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKGV4dG5hbWUoZmlsZW5hbWUpLCAnJyk7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVTdGFydCA9IG5ldyBzdGF0ZS5Ub2tlbignaHRtbF9pbmxpbmUnLCAnJywgMCk7XG4gICAgICAgIHRlbXBsYXRlU3RhcnQuY29udGVudCA9IGA8dGVtcGxhdGUgIyR7ZmlsZW5hbWV9PmA7XG4gICAgICAgIHRva2VuQXJyYXkucHVzaCh0ZW1wbGF0ZVN0YXJ0KTtcblxuICAgICAgICBjb25zdCByZXNvbHZlZFBhdGggPSBqb2luKGNvbXBvbmVudERpciwgZmlsZW5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHsgZXh0ZW5zaW9uLCBmaWxlcGF0aCwgbGFuZywgbGluZXMsIHRpdGxlIH0gPVxuICAgICAgICAgIHJhd1BhdGhUb1Rva2VuKHJlc29sdmVkUGF0aCk7XG4gICAgICAgIC8vIEFkZCBjb2RlIHRva2VucyBmb3IgZWFjaCBsaW5lXG4gICAgICAgIGNvbnN0IHRva2VuID0gbmV3IHN0YXRlLlRva2VuKCdmZW5jZScsICdjb2RlJywgMCk7XG4gICAgICAgIHRva2VuLmluZm8gPSBgJHtsYW5nIHx8IGV4dGVuc2lvbn0ke2xpbmVzID8gYHske2xpbmVzfX1gIDogJyd9JHtcbiAgICAgICAgICB0aXRsZSA/IGBbJHt0aXRsZX1dYCA6ICcnXG4gICAgICAgIH1gO1xuXG4gICAgICAgIHRva2VuLmNvbnRlbnQgPSBgPDw8ICR7ZmlsZXBhdGh9YDtcbiAgICAgICAgKHRva2VuIGFzIGFueSkuc3JjID0gW3Jlc29sdmVkUGF0aF07XG4gICAgICAgIHRva2VuQXJyYXkucHVzaCh0b2tlbik7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVFbmQgPSBuZXcgc3RhdGUuVG9rZW4oJ2h0bWxfaW5saW5lJywgJycsIDApO1xuICAgICAgICB0ZW1wbGF0ZUVuZC5jb250ZW50ID0gJzwvdGVtcGxhdGU+JztcbiAgICAgICAgdG9rZW5BcnJheS5wdXNoKHRlbXBsYXRlRW5kKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kVGFnID0gbmV3IHN0YXRlLlRva2VuKCdodG1sX2lubGluZScsICcnLCAwKTtcbiAgICAgIGVuZFRhZy5jb250ZW50ID0gJzwvRGVtb1ByZXZpZXc+JztcbiAgICAgIHRva2VuQXJyYXkucHVzaChlbmRUYWcpO1xuXG4gICAgICBzdGF0ZS50b2tlbnMuc3BsaWNlKGluZGV4ICsgMSwgMCwgLi4udG9rZW5BcnJheSk7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgLy8gICBzdGF0ZS5tZC5yZW5kZXJlci5yZW5kZXIoc3RhdGUudG9rZW5zLCBzdGF0ZT8ub3B0aW9ucyA/PyBbXSwgc3RhdGUuZW52KSxcbiAgICAgIC8vICk7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50SGFzaChpbnB1dDogc3RyaW5nLCBsZW5ndGg6IG51bWJlciA9IDEwKTogc3RyaW5nIHtcbiAgLy8gXHU0RjdGXHU3NTI4IFNIQS0yNTYgXHU3NTFGXHU2MjEwXHU1NEM4XHU1RTBDXHU1MDNDXG4gIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGlucHV0KS5kaWdlc3QoJ2hleCcpO1xuXG4gIC8vIFx1NUMwNlx1NTRDOFx1NUUwQ1x1NTAzQ1x1OEY2Q1x1NjM2Mlx1NEUzQSBCYXNlMzYgXHU3RjE2XHU3ODAxXHVGRjBDXHU1RTc2XHU1M0Q2XHU2MzA3XHU1QjlBXHU5NTdGXHU1RUE2XHU3Njg0XHU1QjU3XHU3QjI2XHU0RjVDXHU0RTNBXHU3RUQzXHU2NzlDXG4gIHJldHVybiBOdW1iZXIucGFyc2VJbnQoaGFzaCwgMTYpLnRvU3RyaW5nKDM2KS5zbGljZSgwLCBsZW5ndGgpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxWc0NvZGVQcm9qZWN0c1xcXFx2dWUtdmJlbi1hZG1pblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXHpoLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVnNDb2RlUHJvamVjdHMvdnVlLXZiZW4tYWRtaW4vZG9jcy8udml0ZXByZXNzL2NvbmZpZy96aC5tdHNcIjtpbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5cbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi8uLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgY29uc3QgemggPSBkZWZpbmVDb25maWcoe1xuICBkZXNjcmlwdGlvbjogJ1ZiZW4gQWRtaW4gJiBcdTRGMDFcdTRFMUFcdTdFQTdcdTdCQTFcdTc0MDZcdTdDRkJcdTdFREZcdTY4NDZcdTY3QjYnLFxuICBsYW5nOiAnemgtSGFucycsXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1NEUzQlx1OTg5OCcsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1x1NTIwN1x1NjM2Mlx1NTIzMFx1NkRGMVx1ODI3Mlx1NkEyMVx1NUYwRicsXG4gICAgZG9jRm9vdGVyOiB7XG4gICAgICBuZXh0OiAnXHU0RTBCXHU0RTAwXHU5ODc1JyxcbiAgICAgIHByZXY6ICdcdTRFMEFcdTRFMDBcdTk4NzUnLFxuICAgIH0sXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluL2VkaXQvbWFpbi9kb2NzL3NyYy86cGF0aCcsXG4gICAgICB0ZXh0OiAnXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcdTk3NjInLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjAtJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IFZiZW5gLFxuICAgICAgbWVzc2FnZTogJ1x1NTdGQVx1NEU4RSBNSVQgXHU4QkI4XHU1M0VGXHU1M0QxXHU1RTAzLicsXG4gICAgfSxcbiAgICBsYW5nTWVudUxhYmVsOiAnXHU1OTFBXHU4QkVEXHU4QTAwJyxcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdzaG9ydCcsXG4gICAgICAgIHRpbWVTdHlsZTogJ21lZGl1bScsXG4gICAgICB9LFxuICAgICAgdGV4dDogJ1x1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFx1NEU4RScsXG4gICAgfSxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1x1NTIwN1x1NjM2Mlx1NTIzMFx1NkQ0NVx1ODI3Mlx1NkEyMVx1NUYwRicsXG4gICAgbmF2OiBuYXYoKSxcblxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnXHU5ODc1XHU5NzYyXHU1QkZDXHU4MjJBJyxcbiAgICB9LFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdTU2REVcdTUyMzBcdTk4NzZcdTkwRTgnLFxuXG4gICAgc2lkZWJhcjoge1xuICAgICAgJy9jb21tZXJjaWFsLyc6IHsgYmFzZTogJy9jb21tZXJjaWFsLycsIGl0ZW1zOiBzaWRlYmFyQ29tbWVyY2lhbCgpIH0sXG4gICAgICAnL2NvbXBvbmVudHMvJzogeyBiYXNlOiAnL2NvbXBvbmVudHMvJywgaXRlbXM6IHNpZGViYXJDb21wb25lbnRzKCkgfSxcbiAgICAgICcvZ3VpZGUvJzogeyBiYXNlOiAnL2d1aWRlLycsIGl0ZW1zOiBzaWRlYmFyR3VpZGUoKSB9LFxuICAgIH0sXG4gICAgc2lkZWJhck1lbnVMYWJlbDogJ1x1ODNEQ1x1NTM1NScsXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gc2lkZWJhckd1aWRlKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgdGV4dDogJ1x1N0I4MFx1NEVDQicsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2ludHJvZHVjdGlvbi92YmVuJyxcbiAgICAgICAgICB0ZXh0OiAnXHU1MTczXHU0RThFIFZiZW4gQWRtaW4nLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2ludHJvZHVjdGlvbi93aHknLFxuICAgICAgICAgIHRleHQ6ICdcdTRFM0FcdTRFQzBcdTRFNDhcdTkwMDlcdTYyRTlcdTYyMTFcdTRFRUM/JyxcbiAgICAgICAgfSxcbiAgICAgICAgeyBsaW5rOiAnaW50cm9kdWN0aW9uL3F1aWNrLXN0YXJ0JywgdGV4dDogJ1x1NUZFQlx1OTAxRlx1NUYwMFx1NTlDQicgfSxcbiAgICAgICAgeyBsaW5rOiAnaW50cm9kdWN0aW9uL3RoaW4nLCB0ZXh0OiAnXHU3Q0JFXHU3QjgwXHU3MjQ4XHU2NzJDJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgYmFzZTogJy8nLFxuICAgICAgICAgIGxpbms6ICdjb21wb25lbnRzL2ludHJvZHVjdGlvbicsXG4gICAgICAgICAgdGV4dDogJ1x1N0VDNFx1NEVGNlx1NjU4N1x1Njg2MycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1x1NTdGQVx1Nzg0MCcsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL2NvbmNlcHQnLCB0ZXh0OiAnXHU1N0ZBXHU3ODQwXHU2OTgyXHU1RkY1JyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL2RldmVsb3BtZW50JywgdGV4dDogJ1x1NjcyQ1x1NTczMFx1NUYwMFx1NTNEMScgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9yb3V0ZScsIHRleHQ6ICdcdThERUZcdTc1MzFcdTU0OENcdTgzRENcdTUzNTUnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvc2V0dGluZ3MnLCB0ZXh0OiAnXHU5MTREXHU3RjZFJyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL2ljb25zJywgdGV4dDogJ1x1NTZGRVx1NjgwNycgfSxcbiAgICAgICAgeyBsaW5rOiAnZXNzZW50aWFscy9zdHlsZXMnLCB0ZXh0OiAnXHU2ODM3XHU1RjBGJyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL2V4dGVybmFsLW1vZHVsZScsIHRleHQ6ICdcdTU5MTZcdTkwRThcdTZBMjFcdTU3NTcnIH0sXG4gICAgICAgIHsgbGluazogJ2Vzc2VudGlhbHMvYnVpbGQnLCB0ZXh0OiAnXHU2Nzg0XHU1RUZBXHU0RTBFXHU5MEU4XHU3RjcyJyB9LFxuICAgICAgICB7IGxpbms6ICdlc3NlbnRpYWxzL3NlcnZlcicsIHRleHQ6ICdcdTY3MERcdTUyQTFcdTdBRUZcdTRFQTRcdTRFOTJcdTRFMEVcdTY1NzBcdTYzNkVNb2NrJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdcdTZERjFcdTUxNjUnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvbG9naW4nLCB0ZXh0OiAnXHU3NjdCXHU1RjU1JyB9LFxuICAgICAgICAvLyB7IGxpbms6ICdpbi1kZXB0aC9sYXlvdXQnLCB0ZXh0OiAnXHU1RTAzXHU1QzQwJyB9LFxuICAgICAgICB7IGxpbms6ICdpbi1kZXB0aC90aGVtZScsIHRleHQ6ICdcdTRFM0JcdTk4OTgnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2FjY2VzcycsIHRleHQ6ICdcdTY3NDNcdTk2NTAnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvY2FsZScsIHRleHQ6ICdcdTU2RkRcdTk2NDVcdTUzMTYnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2ZlYXR1cmVzJywgdGV4dDogJ1x1NUUzOFx1NzUyOFx1NTI5Rlx1ODBGRCcgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvY2hlY2stdXBkYXRlcycsIHRleHQ6ICdcdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjAnIH0sXG4gICAgICAgIHsgbGluazogJ2luLWRlcHRoL2xvYWRpbmcnLCB0ZXh0OiAnXHU1MTY4XHU1QzQwbG9hZGluZycgfSxcbiAgICAgICAgeyBsaW5rOiAnaW4tZGVwdGgvdWktZnJhbWV3b3JrJywgdGV4dDogJ1x1N0VDNFx1NEVGNlx1NUU5M1x1NTIwN1x1NjM2MicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnXHU1REU1XHU3QTBCJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgbGluazogJ3Byb2plY3Qvc3RhbmRhcmQnLCB0ZXh0OiAnXHU4OUM0XHU4MzAzJyB9LFxuICAgICAgICB7IGxpbms6ICdwcm9qZWN0L2NsaScsIHRleHQ6ICdDTEknIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvZGlyJywgdGV4dDogJ1x1NzZFRVx1NUY1NVx1OEJGNFx1NjYwRScgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC90ZXN0JywgdGV4dDogJ1x1NTM1NVx1NTE0M1x1NkQ0Qlx1OEJENScgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC90YWlsd2luZGNzcycsIHRleHQ6ICdUYWlsd2luZCBDU1MnIH0sXG4gICAgICAgIHsgbGluazogJ3Byb2plY3QvY2hhbmdlc2V0JywgdGV4dDogJ0NoYW5nZXNldCcgfSxcbiAgICAgICAgeyBsaW5rOiAncHJvamVjdC92aXRlJywgdGV4dDogJ1ZpdGUgQ29uZmlnJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdcdTUxNzZcdTRFRDYnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyBsaW5rOiAnb3RoZXIvcHJvamVjdC11cGRhdGUnLCB0ZXh0OiAnXHU5ODc5XHU3NkVFXHU2NkY0XHU2NUIwJyB9LFxuICAgICAgICB7IGxpbms6ICdvdGhlci9yZW1vdmUtY29kZScsIHRleHQ6ICdcdTc5RkJcdTk2NjRcdTRFRTNcdTc4MDEnIH0sXG4gICAgICAgIHsgbGluazogJ290aGVyL2ZhcScsIHRleHQ6ICdcdTVFMzhcdTg5QzFcdTk1RUVcdTk4OTgnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG59XG5cbmZ1bmN0aW9uIHNpZGViYXJDb21tZXJjaWFsKCk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBsaW5rOiAnY29tbXVuaXR5JyxcbiAgICAgIHRleHQ6ICdcdTRFQTRcdTZENDFcdTdGQTQnLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJ3RlY2huaWNhbC1zdXBwb3J0JyxcbiAgICAgIHRleHQ6ICdcdTYyODBcdTY3MkZcdTY1MkZcdTYzMDEnLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJ2N1c3RvbWl6ZWQnLFxuICAgICAgdGV4dDogJ1x1NUI5QVx1NTIzNlx1NUYwMFx1NTNEMScsXG4gICAgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gc2lkZWJhckNvbXBvbmVudHMoKTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRleHQ6ICdcdTdFQzRcdTRFRjYnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdpbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgIHRleHQ6ICdcdTRFQ0JcdTdFQ0QnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAnXHU1RTAzXHU1QzQwXHU3RUM0XHU0RUY2JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnbGF5b3V0LXVpL3BhZ2UnLFxuICAgICAgICAgIHRleHQ6ICdQYWdlIFx1OTg3NVx1OTc2MicsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIHRleHQ6ICdcdTkwMUFcdTc1MjhcdTdFQzRcdTRFRjYnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1hcGktY29tcG9uZW50JyxcbiAgICAgICAgICB0ZXh0OiAnQXBpQ29tcG9uZW50IEFwaVx1N0VDNFx1NEVGNlx1NTMwNVx1ODhDNVx1NTY2OCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tYWxlcnQnLFxuICAgICAgICAgIHRleHQ6ICdBbGVydCBcdThGN0JcdTkxQ0ZcdTYzRDBcdTc5M0FcdTY4NDYnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLW1vZGFsJyxcbiAgICAgICAgICB0ZXh0OiAnTW9kYWwgXHU2QTIxXHU2MDAxXHU2ODQ2JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1kcmF3ZXInLFxuICAgICAgICAgIHRleHQ6ICdEcmF3ZXIgXHU2MkJEXHU1QzQ5JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdjb21tb24tdWkvdmJlbi1mb3JtJyxcbiAgICAgICAgICB0ZXh0OiAnRm9ybSBcdTg4NjhcdTUzNTUnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLXZ4ZS10YWJsZScsXG4gICAgICAgICAgdGV4dDogJ1Z4ZSBUYWJsZSBcdTg4NjhcdTY4M0MnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGluazogJ2NvbW1vbi11aS92YmVuLWNvdW50LXRvLWFuaW1hdG9yJyxcbiAgICAgICAgICB0ZXh0OiAnQ291bnRUb0FuaW1hdG9yIFx1NjU3MFx1NUI1N1x1NTJBOFx1NzUzQicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnY29tbW9uLXVpL3ZiZW4tZWxsaXBzaXMtdGV4dCcsXG4gICAgICAgICAgdGV4dDogJ0VsbGlwc2lzVGV4dCBcdTc3MDFcdTc1NjVcdTY1ODdcdTY3MkMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdO1xufVxuXG5mdW5jdGlvbiBuYXYoKTogRGVmYXVsdFRoZW1lLk5hdkl0ZW1bXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgYWN0aXZlTWF0Y2g6ICdeLyhndWlkZXxjb21wb25lbnRzKS8nLFxuICAgICAgdGV4dDogJ1x1NjU4N1x1Njg2MycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgYWN0aXZlTWF0Y2g6ICdeL2d1aWRlLycsXG4gICAgICAgICAgbGluazogJy9ndWlkZS9pbnRyb2R1Y3Rpb24vdmJlbicsXG4gICAgICAgICAgdGV4dDogJ1x1NjMwN1x1NTM1NycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhY3RpdmVNYXRjaDogJ14vY29tcG9uZW50cy8nLFxuICAgICAgICAgIGxpbms6ICcvY29tcG9uZW50cy9pbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgIHRleHQ6ICdcdTdFQzRcdTRFRjYnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1NTM4Nlx1NTNGMlx1NzI0OFx1NjcyQycsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jLnZ2YmluLmNuJyxcbiAgICAgICAgICAgICAgdGV4dDogJzIueFx1NzI0OFx1NjcyQ1x1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1x1NkYxNFx1NzkzQScsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1ZiZW4gQWRtaW4nLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbms6ICdodHRwczovL3d3dy52YmVuLnBybycsXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTZGMTRcdTc5M0FcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vYW50LnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0FudCBEZXNpZ24gVnVlIFx1NzI0OFx1NjcyQycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9uYWl2ZS52YmVuLnBybycsXG4gICAgICAgICAgICAgIHRleHQ6ICdOYWl2ZSBcdTcyNDhcdTY3MkMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZWxlLnZiZW4ucHJvJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0VsZW1lbnQgUGx1c1x1NzI0OFx1NjcyQycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU1MTc2XHU0RUQ2JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly92YmVuLnZ2YmluLmNuJyxcbiAgICAgICAgICAgICAgdGV4dDogJ1ZiZW4gQWRtaW4gMi54JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiB2ZXJzaW9uLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdmJlbmpzL3Z1ZS12YmVuLWFkbWluL3JlbGVhc2VzJyxcbiAgICAgICAgICB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU2NUU1XHU1RkQ3JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vb3Jncy92YmVuanMvcHJvamVjdHMvNScsXG4gICAgICAgICAgdGV4dDogJ1x1OERFRlx1N0VCRlx1NTZGRScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92dWUtdmJlbi1hZG1pbi9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnLFxuICAgICAgICAgIHRleHQ6ICdcdThEMjFcdTczMkUnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxpbms6ICcvY29tbWVyY2lhbC90ZWNobmljYWwtc3VwcG9ydCcsXG4gICAgICB0ZXh0OiAnXHVEODNFXHVERDg0IFx1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMScsXG4gICAgfSxcbiAgICB7XG4gICAgICBsaW5rOiAnL3Nwb25zb3IvcGVyc29uYWwnLFxuICAgICAgdGV4dDogJ1x1MjcyOCBcdThENUVcdTUyQTknLFxuICAgIH0sXG4gICAge1xuICAgICAgbGluazogJy9jb21tZXJjaWFsL2NvbW11bml0eScsXG4gICAgICB0ZXh0OiAnXHVEODNEXHVEQzY4XHUyMDBEXHVEODNEXHVEQzY2XHUyMDBEXHVEODNEXHVEQzY2IFx1NEVBNFx1NkQ0MVx1N0ZBNCcsXG4gICAgICAvLyBpdGVtczogW1xuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbGluazogJ2h0dHBzOi8vcXVuLnFxLmNvbS9xcXdlYi9xdW5wcm8vc2hhcmU/X3d2PTMmX3d3dj0xMjgmYXBwQ2hhbm5lbD1zaGFyZSZpbnZpdGVDb2RlPTIyeVN6ajdwS2l3JmJ1c2luZXNzVHlwZT05JmZyb209MjQ2NjEwJmJpej1rYSZtYWluU291cmNlSWQ9c2hhcmUmc3ViU291cmNlSWQ9b3RoZXJzJmp1bXBzb3VyY2U9c2hvcnR1cmwjL3BjJyxcbiAgICAgIC8vICAgICB0ZXh0OiAnUVFcdTk4OTFcdTkwNTMnLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbGluazogJ2h0dHBzOi8vcW0ucXEuY29tL2NnaS1iaW4vcW0vcXI/X3d2PTEwMjcmaz1talptbGhnVnp6VXh2ZHhsbEI2QzF2SHBYOE84UVJMMCZhdXRoS2V5PURCZEZiQndFUm1mYUtZOTVKdlJXcUxDSklSR0pBbUt5WmJycHpaNDFFS0RNWjVTUjZNZmJqT0JhYU5STjczZnImbm92ZXJpZnk9MCZncm91cF9jb2RlPTQyODYxMDknLFxuICAgICAgLy8gICAgIHRleHQ6ICdRUVx1N0ZBNCcsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmdnL1ZVNjJqVGVjYWQnLFxuICAgICAgLy8gICAgIHRleHQ6ICdEaXNjb3JkJyxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIF0sXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICBsaW5rOiAnL2ZyaWVuZC1saW5rcy8nLFxuICAgIC8vICAgdGV4dDogJ1x1RDgzRVx1REQxRCBcdTUzQ0JcdTYwQzVcdTk0RkVcdTYzQTUnLFxuICAgIC8vIH0sXG4gIF07XG59XG5cbmV4cG9ydCBjb25zdCBzZWFyY2g6IERlZmF1bHRUaGVtZS5BbGdvbGlhU2VhcmNoT3B0aW9uc1snbG9jYWxlcyddID0ge1xuICByb290OiB7XG4gICAgcGxhY2Vob2xkZXI6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgIGJ1dHRvblRleHQ6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgICAgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIGVycm9yU2NyZWVuOiB7XG4gICAgICAgICAgaGVscFRleHQ6ICdcdTRGNjBcdTUzRUZcdTgwRkRcdTk3MDBcdTg5ODFcdTY4QzBcdTY3RTVcdTRGNjBcdTc2ODRcdTdGNTFcdTdFRENcdThGREVcdTYzQTUnLFxuICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXG4gICAgICAgIH0sXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHU1MjA3XHU2MzYyJyxcbiAgICAgICAgICBzZWFyY2hCeVRleHQ6ICdcdTY0MUNcdTdEMjJcdTYzRDBcdTRGOUJcdTgwMDUnLFxuICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTkwMDlcdTYyRTknLFxuICAgICAgICB9LFxuICAgICAgICBub1Jlc3VsdHNTY3JlZW46IHtcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU2MjdFXHU1MjMwXHU3NkY4XHU1MTczXHU3RUQzXHU2NzlDJyxcbiAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnXHU3MEI5XHU1MUZCXHU1M0NEXHU5OTg4JyxcbiAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c1RleHQ6ICdcdTRGNjBcdThCQTRcdTRFM0FcdThCRTVcdTY3RTVcdThCRTJcdTVFOTRcdThCRTVcdTY3MDlcdTdFRDNcdTY3OUNcdUZGMUYnLFxuICAgICAgICAgIHN1Z2dlc3RlZFF1ZXJ5VGV4dDogJ1x1NEY2MFx1NTNFRlx1NEVFNVx1NUMxRFx1OEJENVx1NjdFNVx1OEJFMicsXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaEJveDoge1xuICAgICAgICAgIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJ1x1NTNENlx1NkQ4OCcsXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1x1NTNENlx1NkQ4OCcsXG4gICAgICAgICAgcmVzZXRCdXR0b25BcmlhTGFiZWw6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxuICAgICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxuICAgICAgICB9LFxuICAgICAgICBzdGFydFNjcmVlbjoge1xuICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXG4gICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgIHJlY2VudFNlYXJjaGVzVGl0bGU6ICdcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgIHJlbW92ZUZhdm9yaXRlU2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY1MzZcdTg1Q0ZcdTRFMkRcdTc5RkJcdTk2NjQnLFxuICAgICAgICAgIHJlbW92ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyXHU0RTJEXHU3OUZCXHU5NjY0JyxcbiAgICAgICAgICBzYXZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRGRERcdTVCNThcdTgxRjNcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVYsU0FBUyxlQUFlO0FBQ2pYLFNBQVMsNkJBQTZCOzs7QUNDdEMsU0FBUyxvQkFBb0I7OztBQ0EzQixjQUFXOzs7QURJTixJQUFNLEtBQUssYUFBYTtBQUFBLEVBQzdCLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxJQUNYLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUNFO0FBQUEsTUFDRixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sV0FBVyx3QkFBb0Isb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUFBLE1BQ3ZELFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxXQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsTUFBTTtBQUFBLElBQ1I7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LFVBQ2IsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0w7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxZQUNSO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBZVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0Y7QUFDRjs7O0FMbFRBLElBQU8sZ0JBQVE7QUFBQSxFQUNiLHNCQUFzQjtBQUFBLElBQ3BCLEdBQUc7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixHQUFHO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIiwgIm5hdiIsICJzaWRlYmFyQ29tbWVyY2lhbCIsICJzaWRlYmFyR3VpZGUiXQp9Cg==
