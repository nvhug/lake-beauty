# Lake beauty Landing Page

## Development

```bash
npm install
npm run dev
```

## Production and Cloudflare Pages

```bash
npm run build
npm run start -- -l 3000
```

Cloudflare Pages settings:
- Build command: `npm run build`
- Build output directory: `out`
- Node version: `22`

Business content lives in `data/`. Read `docs/CONTENT_SCHEMA.md` and `docs/ASSET_MAP.md` before adding any result, review, statistic, treatment claim or image.