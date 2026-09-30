# TAARAA OS: OOH Ad Network

Build a polished, responsive multi-page web app called TAARAA OS, based closely on the attached “TAARAA OS MVP MOCK APP” PDF. Treat the PDF as the visual and product reference. Reproduce the page designs, navigation, dialogs, and user journeys described below; don’t replace them with a generic SaaS dashboard.

PRODUCT
TAARAA OS is an operating system for out-of-home (OOH) advertising. It connects agencies, brands, media partners, fabricators, printers, logistics providers, installers, asset owners, and buyers.

VISUAL DIRECTION
- Create a clean, bright, desktop-first B2B platform. Use a white or very pale blue-gray canvas, deep navy text and navigation, thin cool-gray borders, subtle shadows, and small lime-green accents for active states and success actions.
- Use a consistent top navigation bar on authenticated screens: TAARAA OS wordmark on the left; agency/account selector, search, relevant utility icons, and profile menu on the right.
- Use centered page headings, compact breadcrumb navigation, rounded cards, clearly labeled tabs, and restrained icons. Keep tables and forms compact and legible.
- Match the mockup’s visual hierarchy and spacing. Avoid oversized marketing-style cards in the dashboard.
- Use a consistent modern sans-serif font. Give the logo a simple text treatment if no brand asset is supplied.
- Build responsive layouts: preserve the desktop composition at wide sizes, then stack cards and allow tables to scroll horizontally on smaller screens.
- Use realistic sample data and image placeholders for OOH billboards, storefront products, and partner records. Use supplied project assets if available.
- Make all main controls functional with sensible demo behavior. Persist demo-created records in browser storage or the available project backend so the flows remain usable after navigation.

ROUTES AND SCREENS

1. Registration and authentication
- `/` — welcome / Agency Control Center landing page. Place the TAARAA OS logo and the tagline “Plan. Execute. Verify. Settle.” above a centered sign-in card, with a soft city-and-billboard illustration in the background. Include Register Agency, Sign In, and Need assistance? actions.
- `/register` — agency registration form with agency name, business details, office address, contact person, mobile number, email, and GST details. Include Continue.
- `/register/review` — review submitted agency details, confirmation checkboxes for mobile, email, and terms/privacy, then Create Agency Account.
- `/register/success` — account-created success screen with generated agency code and Copy Agency Code, Download / Save Code, and Continue to Sign In buttons.
- `/signin` — email and password fields, password visibility toggle, Sign In, Forgot password?, and Register Agency.
- `/agency/profile` — Agency Profile details with Back to Home and Edit Profile.

2. Home
- `/home` — welcome dashboard with “Welcome, TAARAA OS™”, a global search input, and two prominent module cards: OOH Ad Exchange (“Create and process your AD”) and OOH Media Bazaar (“Stakeholder and Partner Market”). Include the common top bar.

3. OOH Ad Exchange
- `/ooh-ad-exchange` — tabbed workspace: Brands, Create Campaign, Approval Status, In-Live Campaign, Completed.
- Brands tab: searchable brand list with Edit actions and a Create Brand button.
- Create Brand: form for brand name, email, GST details, contact person, phone number, and associated agency details. Show a clear success confirmation after saving.
- Create Campaign tab: campaign form for brand, campaign name, asset selection, location, channel, campaign dates/duration, campaign budget, net amount, GST, and processing fee. Include notification preference controls and a Review Campaign action.
- Select Asset opens a modal listing available OOH inventory, with category tabs/filters, search, asset/location details, prices, and Add actions.
- Select Participants opens a modal with tabs for Fabricators, Printers, Logistics, and Installers. Include name/location search, participant cards with price information, and add/remove controls. Show selected participants on the campaign form.
- Campaign review screen (`/campaigns/:id/review`): brand and campaign summary, selected assets, location and duration, price breakdown, creative upload area, Revert Campaign, and Pay Now.
- Campaign states: submitted for brand review, sent for rework, approved, paid, scheduled/in-live, and completed. Show realistic status badges and status-specific controls across the tabs.
- Payment method modal: total amount, UPI, Google Pay, PhonePe, and bank transfer choices, checkbox to agree to terms, Cancel and Proceed to Pay. Simulate successful payment and show a success modal.
- Approval Status tab: campaign cards with brand, campaign name, summary, approval badge, expandable details, and actions such as View, Approve, or Push Live when the state permits.
- In-Live Campaign tab: searchable campaigns with status, progress/duration, and live details.
- Completed tab: completed campaign cards with Report actions.
- Include campaign-rework and payment-success confirmation dialogs matching the mockup’s compact centered modal style.
- `/campaigns/:id/monitor` — campaign pipeline / brand monitor. Show campaign status stages (Live, Printing, Logistics, Installing, Campaign Live, Completed), campaign days/calendar, and a campaign creative/status preview. Include a clear “page pushed in mail” or notification state.

4. OOH Media Bazaar
- `/ooh-media-bazaar` — module landing page with three cards: OOH Partner, Eye Store, and OOH Bazaar. Each card has a short description and navigates to its module.
- `/ooh-partners` — OOH Partners management page with category tabs: Fabricators, Printers, Logistics, Installers, Asset. Include search, Add, Edit, and a table/list appropriate to each category.
- Add/edit partner dialogs should use fields appropriate to each type:
  - Fabricator: partner name, contact person, mobile number, email, location, pincode, GST number, fabrication service, service rate, location link.
  - Printer: printer name, contact person, mobile number, email, location, pincode, GST number, print service, print service rate, location link.
  - Logistics: logistics partner name, contact person, mobile number, email, location, pincode, GST number, transport coverage, rate type, location link.
  - Installer: installer name, contact person, mobile number, email, location, pincode, GST number, rate per sq ft, location link.
  - Asset: asset code, brand name, location, pincode, base rate, pay day count, location link, asset image upload, and asset type.
- Show save confirmations for partner and asset creation.

5. OOH Bazaar
- `/ooh-bazaar` — OOH Asset Store with Buy and Sell tabs and a List New Asset action.
- Buy view: searchable/filterable physical billboard inventory with location, area, price, and sort controls. Use listing cards with billboard image, location, size, price, View Details, and Manage Listing or Buy Now actions as appropriate.
- Sell view: seller’s listings and controls to create or manage a listing.
- `/ooh-bazaar/list` — listing form with an automatically generated asset ID, brand/asset details, location, pincode, base rate, pay-day count, asset image upload, listing preview, Save Draft, and Publish Listing.
- Show a success modal after publishing, with View Listing and Done actions.
- Buy flow: asset detail and payment dialog with price summary, buyer/contact details, and payment method options. Simulate payment and show an order-placed confirmation with order ID, asset code, payment status, amount paid, order date, View Order, and Done.
- Use realistic billboard thumbnails and listing data consistent with the PDF.

6. Eye Store
- `/eye-store` — retail page for TAARAA OS products: iStake™, iBox™, iTag™, and iSticker™. Use a dark photographic product banner followed by product cards with image, short description, price, quantity controls, and Add to Cart.
- Include View Cart and a clear cart/order summary.
- Checkout/payment modal: order summary, receiver details, delivery address, mobile number, selectable payment methods (UPI, Google Pay, PhonePe, bank transfer), Cancel, and Pay.
- After simulated successful payment, show an order placed confirmation with order ID, product/code, payment status, amount paid, order date, View Order, and Done.

INTERACTION REQUIREMENTS
- Add working navigation between every module and screen above. Provide breadcrumbs or a clear way back to the parent module.
- Tabs must switch content; search and filters must update visible records; forms must validate required fields and show clear inline errors.
- Modal dialogs must open and close through their buttons, with sensible handling for cancel, save, payment, and confirmation.
- Provide realistic demo journeys from registration → sign in → home → create brand → create campaign → choose assets/participants → review → payment → approval/live monitoring.
- Provide a second journey from home → Media Bazaar → add partner or asset → browse listings / buy.
- Provide an Eye Store journey from product selection → cart → checkout → order confirmation.
- Make payment, email notifications, file uploads, and external communication simulated unless real integrations are explicitly configured. Clearly show demo success/failure states without implying that a real payment or email was sent.
- Use consistent empty, loading, success, and error states. Keep entered data and demo state during in-app navigation.

IMPLEMENTATION
- Build with React, TypeScript, Tailwind, and reusable components.
- Use a consistent component system for the top bar, page header, tabs, tables, cards, form fields, status badges, modals, and success states.
- Use the routing and backend options available in this Lovable project. If no backend is connected, create a realistic frontend demo with local persistence.
- Keep the app organized by module and screen; do not put the entire UI into one oversized component.
- Start by implementing the shared shell and visual system, then all routes and journeys above. Ensure the result is navigable and usable, not a static screenshot.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://taaraa-os-hq.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a8fdd443-2a65-4e89-9d48-8bfc2efd2c19).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
