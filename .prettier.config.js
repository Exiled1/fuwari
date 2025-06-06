// prettier.config.js
module.exports = {
	tailwindConfig: "./tailwind.config.cjs",
	plugins: [require("prettier-plugin-tailwindcss"), "prettier-plugin-astro"],
	overrides: [
		{
			files: ["**/*.astro"],
			options: {
				parser: "astro",
			},
		},
	],
};
