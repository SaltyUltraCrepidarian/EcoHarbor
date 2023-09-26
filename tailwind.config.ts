import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      primary: 'Lato',
      secondary: 'Roboto',
    },
    container: {
      padding: {
        DEFAULT: '16px',
      },
    },
    screens: {
      xs: '279px',
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    xtend: {
      colors: {
        primary: '#80B918',
        secondary:'#EFF1F3',
        third:'#55A630',
        fourth:'#F9F7F3',
        accent: '#2F8C05',
      },
      backgroundImage: {
        site: "url('../app/assets/pattern.png')",
        
      },
    
      plugins: [],
    },
  },
};
export default config;
