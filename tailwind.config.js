// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// //   theme: {
// //     extend: {
// //       colors: {
// //         primaryBG: {
// //           DEFAULT: "#125667",
// //           dark: "#125667",
// //           light: "#125667",
// //         },
// //         secondaryBG: {
// //           DEFAULT: "#C3D14F",
// //           dark: "#C3D14F",
// //           light: "#C3D14F",
// //         },

// //         GreidentColor2: {
// //           DEFAULT: "#15B7FF",
// //           dark: "#15B7FF",
// //           light: "#15B7FF",
// //         },
// //         GreidentColor: {
// //           DEFAULT: "#cce9ed",
// //           dark: "#cce9ed",
// //           light: "#cce9ed",
// //         },
// //         TextPrimaryColor: {
// //           DEFAULT: "#125667",
// //           dark: "#125667",
// //           light: "#125667",
// //         },
// //       },
// //     },
// //   },

// //   plugins: [
// //     require("@tailwindcss/aspect-ratio"), // Add this line to include the aspect-ratio plugin
// //   ],
// //   darkMode: "class",
// // };
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primaryBG: {
//           DEFAULT: "#125667",
//           dark: "#125667",
//           light: "#125667",
//         },
//         secondaryBG: {
//           DEFAULT: "#C3D14F",
//           dark: "#C3D14F",
//           light: "#C3D14F",
//         },

//         GreidentColor2: {
//           DEFAULT: "#15B7FF",
//           dark: "#15B7FF",
//           light: "#15B7FF",
//         },
//         GreidentColor: {
//           DEFAULT: "#cce9ed",
//           dark: "#cce9ed",
//           light: "#cce9ed",
//         },
//         TextPrimaryColor: {
//           DEFAULT: "#125667",
//           dark: "#125667",
//           light: "#125667",
//         },
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/aspect-ratio'), // Add this line to include the aspect-ratio plugin
//   ],
//   darkMode: "class",
// };
/** @type {import('tailwindcss').Config} */
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBG: {
          DEFAULT: "#125667",
          dark: "#125667",
          light: "#125667",
        },
        secondaryBG: {
          DEFAULT: "#C3D14F",
          dark: "#C3D14F",
          light: "#C3D14F",
        },
        GreidentColor2: {
          DEFAULT: "#15B7FF",
          dark: "#15B7FF",
          light: "#15B7FF",
        },
        GreidentColor: {
          DEFAULT: "#cce9ed",
          dark: "#cce9ed",
          light: "#cce9ed",
        },
        TextPrimaryColor: {
          DEFAULT: "#125667",
          dark: "#125667",
          light: "#125667",
        },
      },
    },
  },
  plugins: [aspectRatio], // Use ES module syntax for importing the aspect-ratio plugin
  darkMode: "class",
};
