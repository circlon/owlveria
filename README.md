# Owlveria

Illustrated books for seven language editions. Readers can open a story online or download its EPUB. The production site is [owlveria.com](https://owlveria.com).

## Update a book

1. Edit the story and its sources in `editions.js`. The shelf labels and cover titles live in `library.js`. Store new illustrations as transparent PNGs under `assets/art` or `assets/vignettes`. The cover compositions are in `publishing/jackets.js`.
2. Run `python3 publishing/rebuild.py` to regenerate covers, text contours and all EPUBs. The local press uses Python with Pillow, Node.js with Playwright, and Chrome.
3. Run `python3 publishing/build_site.py`. It checks each downloadable book against the web edition and prepares the public files. Run `python3 preview.py` for a local reading copy.
4. Commit the edited sources, art and regenerated downloads together and push to `main`. The [Publish Owlveria workflow](https://github.com/circlon/owlveria/actions/workflows/pages.yml) checks the EPUBs and publishes `public/` to GitHub Pages after the checks pass. If a check fails, the previous edition stays online.

GitHub Pages serves `owlveria.com`. Cloudflare manages the DNS records for the domain and its `www` alias.

The channel profile can keep the same address across releases. A story can also be linked directly, for example [Liberty’s copper coat](https://owlveria.com/#en/libertys-copper-coat).
