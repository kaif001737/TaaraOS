<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- TAARAA OS demo records live in a shared browser-storage React context; no Cloud backend is connected, and this keeps cross-route journeys functional without implying live transactions.
- Content screens are separate TanStack file routes with shared module views; this preserves direct links and route-specific metadata.
- PDF-specific demo journeys use expanded shared browser records and interactive modals rather than static mock pages, preserving cross-route continuity.
- Campaign Job Codes are stored on shared campaign records and reused across agency and brand views; this keeps edits and payment-gated status changes consistent without duplicate campaigns.
- The shared All Screens menu is mounted on welcome and workspace headers; this replaces duplicated module and stakeholder entry lists while keeping direct links available.
