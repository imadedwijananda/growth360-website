# Growth360 Agency — Company Profile

Static company-profile site for Growth360 Agency, the custom-software unit of PT. Solusi Era Digital in Bali. The copy follows the Growth360 company profile, Edisi 2026. The page is in Indonesian.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:47321](http://127.0.0.1:47321).

## Build

```bash
npm install
npm run build
```

`npm run build` writes a fully static site to `dist/` and checks that the built page still contains the profile facts and none of the excluded claims. Deploy the contents of `dist/` to any static host. Asset paths are relative, so the folder can live at a domain root or in a subpath.

Preview the build:

```bash
npm run preview
```

Or from the output folder:

```bash
python3 -m http.server 47321 --directory dist
```

## Content boundaries

Only statements that appear in the company profile are published. The build check rejects pages that add client logos or claims that are not in the profile, including Gojek, BCA, Pertamina, and any “IDR 8,5 T” figure. Prices, client testimonials, team size, founding year, a street address, and named technology vendors are omitted because the profile does not give them.
