# FINAL CLIENT QA — LadiBDS

## Source hierarchy
1. Visual Master 728×2048 = source of truth for the entire main landing layout and visible typography.
2. Uploaded Sun Galaxy Complex PDF = source of truth for floorplans, product facts, business categories and click-state reference pages.
3. No invented unit list, price, area, category, or project fact is added outside those sources.

## Final fixes
- Main landing is rendered from the approved Visual Master, split into two local WebP assets: eliminates browser font corruption and missing remote images.
- Dynamic modal text uses Arial/Helvetica with UTF-8; PDF text is shown as page imagery, so Vietnamese diacritics do not depend on web fonts.
- Shop/Penthouse/gallery areas are visually filled by the approved master.
- Click states use local PDF page images: p22 Spana, p27 Cora, p33 business categories, p39 S-Light, p40 Duplex, p42 Penthouse.
- “Xem tất cả mặt bằng” opens only these source-backed pages; no fake card areas or invented floorplans.
- Lead form is frontend-only demo and explicitly does not pretend to save/send data.

## Acceptance
No blank black/gray image placeholders. No external image/font dependency in the client-facing landing.