module.exports = {
  title: "Wisemuffin Documentation",
  tagline: "My memory is shocking",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "wisemuffin", // Usually your GitHub org/user name.
  projectName: "wisemuffin", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Wisemuffin Documentation",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      links: [
        { to: "docs/about", label: "Docs", position: "left" },
        {
          href: "http://wisemuffin.com",
          label: "Wisemuffin",
          position: "left",
        },
        {
          href: "https://github.com/wisemuffin",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "About",
              to: "docs/about",
            },
            {
              label: "How i built these Data Visualisations",
              to: "docs/visualisation",
            },
            {
              label: "Continous Integration & Deployment",
              to: "docs/ci_cd",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/wisemuffin",
            },
            // {
            //   label: "Twitter",
            //   href: "https://twitter.com/docusaurus"
            // }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
