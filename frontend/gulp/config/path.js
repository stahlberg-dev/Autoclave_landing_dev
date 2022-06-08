import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `../public`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        video: `${buildFolder}/video`,
        fonts: `${buildFolder}/fonts/`,
        favicon: `${buildFolder}/favicon/`,
        ico: `${buildFolder}/`,
        api: `${buildFolder}/api/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.+(png|jpg|jpeg|gif|webp)`,
        video: `${srcFolder}/video/**/*.+(mp4|webm|ogv|swf)`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        svg: `${srcFolder}/img/**/*.svg`,
        favicon: `${srcFolder}/favicon/**/*.*`,
        ico: `${srcFolder}/*.ico`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        api: `${srcFolder}/api/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.+(png|jpg|jpeg|svg|ico|gif|webp)`,
        video: `${srcFolder}/video/**/*.+(mp4|webm|ogv|swf)`,
        favicon: `${srcFolder}/favicon/**/*.*`,
        ico: `${srcFolder}/*.ico`,
        api: `${srcFolder}/api/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
};