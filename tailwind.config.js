import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#d5e3fd",
        "primary-container": "#0f172a",
        "on-primary-fixed": "#131b2e",
        "on-secondary": "#003824",
        "on-primary-container": "#798098",
        "on-tertiary-container": "#eb4141",
        "inverse-primary": "#565e74",
        "surface-container-highest": "#273649",
        "on-surface-variant": "#c6c6cd",
        "surface-variant": "#273649",
        "on-secondary-container": "#00311f",
        "tertiary-fixed": "#ffdad7",
        "primary-fixed": "#dae2fd",
        "error": "#ffb4ab",
        "surface-bright": "#2c3a4e",
        "primary": "#bec6e0",
        "surface": "#051426",
        "tertiary-container": "#390003",
        "surface-dim": "#051426",
        "on-tertiary-fixed": "#410004",
        "outline-variant": "#45464d",
        "on-surface": "#d5e3fd",
        "on-background": "#d5e3fd",
        "error-container": "#93000a",
        "inverse-on-surface": "#233144",
        "surface-container": "#122033",
        "secondary": "#4edea3",
        "surface-container-low": "#0d1c2f",
        "on-primary-fixed-variant": "#3f465c",
        "on-secondary-fixed-variant": "#005236",
        "on-tertiary-fixed-variant": "#930013",
        "on-primary": "#283044",
        "surface-container-lowest": "#010f21",
        "tertiary": "#ffb3ad",
        "surface-container-high": "#1c2b3e",
        "on-tertiary": "#68000a",
        "primary-fixed-dim": "#bec6e0",
        "surface-tint": "#bec6e0",
        "on-error-container": "#ffdad6",
        "secondary-fixed-dim": "#4edea3",
        "tertiary-fixed-dim": "#ffb3ad",
        "outline": "#909097",
        "on-secondary-fixed": "#002113",
        "on-error": "#690005",
        "secondary-container": "#00a572",
        "secondary-fixed": "#6ffbbe",
        "background": "#051426"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      fontFamily: {
        "body-base":["Inter"],
        "label-caps": ["Inter"],
        "bid-amount-lg": ["Inter"],
        "lot-id-display": ["Inter"],
        "headline-md": ["Inter"],
        "data-tabular": ["Inter"]
      },
      fontSize: {
        "body-base":["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "label-caps":["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700" }],
        "bid-amount-lg":["36px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "lot-id-display":["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md":["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "data-tabular":["14px", { "lineHeight": "20px", "fontWeight": "500" }]
      }
    },
  },
  plugins:[
    forms,
    containerQueries
  ],
}