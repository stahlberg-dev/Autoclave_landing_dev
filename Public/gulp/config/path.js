import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        favicon: `${buildFolder}/favicon/`,
        ico: `${buildFolder}/`,
        json: `${buildFolder}/json/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.+(png|jpg|jpeg|gif|webp)`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        svg: `${srcFolder}/img/**/*.svg`,
        favicon: `${srcFolder}/favicon/**/*.*`,
        ico: `${srcFolder}/*.ico`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        json: `${srcFolder}/json/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.+(png|jpg|jpeg|svg|ico|gif|webp)`,
        favicon: `${srcFolder}/favicon/**/*.*`,
        ico: `${srcFolder}/*.ico`,
        json: `${srcFolder}/json/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
};