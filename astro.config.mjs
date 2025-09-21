// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://magmaon.github.io',
    base: `/magmaon-viz/`,
    scopedStyleStrategy: 'class'
});
