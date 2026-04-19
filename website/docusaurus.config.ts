import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Commune de Collorec',
  tagline: 'Vie locale, services et agenda communal',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://collorec.bzh',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pocman', // Usually your GitHub org/user name.
  projectName: 'collorec.bzh', // Usually your repo name.

  onBrokenLinks: 'throw',

  headTags: [
    // Preconnect to Google Fonts domains to reduce critical path latency
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs - this is a campaign website
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'daily',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/collorec-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Commune de Collorec',
      logo: {
        alt: 'Collorec Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/ape', label: 'APE', position: 'left'},
        {to: '/marche-des-marguerites', label: 'Marché des Marguerites', position: 'left'},
        {to: '/entreprises', label: 'Entreprises', position: 'left'},
        {to: '/associations', label: 'Associations', position: 'left'},
        {to: '/programme', label: 'Programme Municipal', position: 'right'},
        {to: '/equipe', label: 'Équipe Municipale', position: 'right'},
        {
          href: 'https://www.facebook.com/profile.php?id=61588640097787',
          label: 'Facebook',
          position: 'right',
        },
        {to: '/contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Vie Locale',
          items: [
            {
              label: 'APE de Collorec',
              to: '/ape',
            },
            {
              label: 'Associations',
              to: '/associations',
            },
            {
              label: 'Entreprises',
              to: '/entreprises',
            },
          ],
        },
        {
          title: 'Commune',
          items: [
            {
              label: 'Page Facebook de la liste municipale',
              href: 'https://www.facebook.com/people/Collorec-terre-de-liens/61588640097787/',
            },
            {
              label: 'Page Facebook de la commune',
              href: 'https://www.facebook.com/p/Commune-de-Collorec-100064358790738/',
            },
            {
              label: 'Site du département du Finistère',
              href: 'https://www.finistere.fr/',
            },
            {
              label: 'Site de la Communauté de communes de Haute Cornouaille',
              href: 'https://haute-cornouaille.bzh/',
            }
          ],
        },
        {
          title: 'GitHub',
          items: [
            {
              label: 'Modifier cette page sur GitHub',
              href: 'https://github.com/pocman/collorec.bzh/edit/main/website/',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Commune de Collorec`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
