# House of Wander / Casa Cabane - Deployment Update

Prepared for: Joey & Jo; House of Wander team: Maaike & Laurens; Artificial Monks support  
Date: May 26, 2026  
Status: GitHub pushed, Vercel production deployment live, Casa Cabane video web-optimized

## Live Links

- Production site: https://houseofwander.vercel.app
- Casa Cabane prototype: https://houseofwander.vercel.app/casa-cabane
- GitHub repository: https://github.com/ArtificialMonks/houseofwander
- Vercel deployment ID: `dpl_4dtA5ecTW9JmnMmf7z7jcP83quZ3`
- Vercel project: `houseofwander`

The deployment is currently under the Vercel scope available on this machine:
`thomaslambrechts-2858s-projects`. This scope already contains several
Artificial Monks-related projects. If there is a separate formal Artificial
Monks Vercel team, the project should be transferred or re-linked once that team
access is available.

## What Is Now Published

- House of Wander collection gateway at `/`.
- Casa Cabane guided stay prototype at `/casa-cabane`.
- Fullscreen guided walkthrough with Exit, Collection, Airbnb, Previous,
  Play/Pause, Next, chapter filmstrip, and timecode controls.
- Amigo guide UI prototype as a scripted front-end layer.
- Airbnb-informed Casa Cabane detail sections for practical review.
- Mobile and tablet responsive layout.
- Optimized Casa Cabane walkthrough video committed for deployment.

## GitHub Status

Latest pushed commits on `main`:

- `a238959` - Add Vercel deploy ignore rules
- `df9f14d` - Add deployable Casa Cabane video

The canonical project folder remains:

```text
/Users/wezienwel/Library/CloudStorage/Dropbox-We-zien-wel/Thomas Lambrechts/JJ - AI/ArtificialMonks/Projects/houseofwander
```

`/Users/wezienwel/houseofwander` is only a local symlink shortcut.

## Video Handling

The user-supplied higher-quality Casa Cabane master was preserved locally as:

```text
public/media/casa-cabane-walkthrough-master-local.mp4
```

That file is about 581 MB and is intentionally ignored by Git and Vercel.

The deployed site uses a web-ready encode at:

```text
public/media/casa-cabane-walkthrough.mp4
```

Current deployed video properties:

- 720 x 1280 portrait
- 30 fps
- 254.4 seconds
- about 63 MB
- H.264 MP4 with fast-start metadata

Recommendation for a later production pass: move video delivery to Git LFS,
Vercel Blob, S3, Cloudflare R2, Mux, or another media/CDN path before public
marketing traffic.

## Verification Completed

- GitHub push to `ArtificialMonks/houseofwander` succeeded.
- Vercel production deployment completed successfully.
- `vercel inspect houseofwander.vercel.app` shows deployment status `Ready`.
- `/` returns HTTP 200.
- `/casa-cabane` returns HTTP 200.
- `/media/casa-cabane-walkthrough.mp4` returns HTTP 200 with video/mp4 and a
  65,917,408 byte content length.
- Browser check: collection gateway opens.
- Browser check: Casa Cabane opens from the collection.
- Browser check: Enter walkthrough opens the fullscreen guided experience.
- Browser check: Next advances from Arrival to Exterior.
- Browser check: Exit closes the walkthrough and returns to the Casa Cabane page.
- Browser check: All Stays returns to the collection gateway.
- Mobile check at 390 x 844: no horizontal overflow, Enter/Exit/Next/Collection
  controls present.
- Tablet check at 768 x 1024: no horizontal overflow, Enter and All Stays
  controls present.

## Current Limits

- The live deployment is good for team review, not yet a final public launch.
- The Amigo layer is scripted UI only; no backend agent, booking automation, or
  Airbnb communication workflow is connected yet.
- Airbnb remains the active transaction path.
- The Casa Cabane detail data should still be checked by Maaike & Laurens before
  treating it as final public copy.
- The current Vercel scope name is not branded as Artificial Monks, even though
  it contains AM-related projects.

## Next Decisions Needed

- Confirm whether `houseofwander.vercel.app` is acceptable for team review or
  whether a private/custom domain should be added.
- Confirm whether the Vercel project should stay in the current scope or move to
  a dedicated Artificial Monks team.
- Confirm whether the 63 MB web video is acceptable for review, or whether a
  second encode should target a smaller file size.
- Confirm final brand/founder spelling in all public copy: House of Wander,
  Maaike & Laudi / Maaike & Laurens, Casa Cabane.
- Confirm what Airbnb facts, photos, review snippets, and host details may be
  reused outside Airbnb.
- Decide the next sprint: Casa Cabane copy/detail polish, collection expansion,
  Amigo agent design, or booking/direct inquiry architecture.

## Recommended Next Work

Keep the next sprint focused on Casa Cabane as the model stay. Make the guided
walkthrough, mobile performance, factual property detail, and Amigo guide
interaction feel solid before expanding into the full collection or independent
direct-booking system.
