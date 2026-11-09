# TravelTrucks
### Landing page

![Landing page](docs/home.png)

TravelTrucks is a camper rental web application. Users can browse a catalog of campers, filter them by location, camper form, engine and transmission, view detailed information with a photo gallery and reviews, and send a booking request.

**Live demo:** (https://travel-trucks-eight-teal.vercel.app/) <br>
**Repository:** (https://github.com/YuliyaZakrepa/travel-trucks) <br>

## Features

- **Landing page** with a full-screen hero block and a call-to-action button to the catalog.
- **Catalog** of campers with server-side filtering by location, camper form, engine type and transmission, plus a "Load more" option.
- **Camper details page** with a photo gallery, price, rating, location, description, vehicle features and specifications.
- **Reviews** section for each camper.
- **Booking form** with validation (Formik) and a success/error toast notification after sending the request to the backend.
- **Loading, error and empty states** for all data requests.
- **404 page** for non-existing routes and campers.
- **SEO:** unified metadata through a `buildMetadata` helper, Open Graph and Twitter cards, canonical URLs, dynamic metadata for every camper page, favicon.
- **Accessible UI:** semantic markup, `aria-hidden` for decorative icons, visible focus states.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [Axios](https://axios-http.com/) for HTTP requests
- [Formik](https://formik.org/) (with Yup validation) for forms
- [react-hot-toast](https://react-hot-toast.com/) for notifications
- [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/) for loaders
- [Swiper](https://swiperjs.com/) for the photo slider and gallery
- [Raty](https://github.com/wbotelhos/raty) (`raty-js`) for interactive star ratings
- CSS Modules with global design tokens (CSS variables)
- ESLint and Prettier

## Project Structure

```
app/                  # routes, layouts, metadata
├── layout.tsx        # global layout and metadata
├── page.tsx          # landing page
├── catalog/
│   ├── page.tsx      # catalog
│   └── [id]/page.tsx # camper details
├── loading.tsx       # global loading state
├── error.tsx         # error boundary
└── not-found.tsx     # 404 page
components/           # reusable UI components (Button, Icon, CamperCard, Gallery, Reviews, ContactForm, ...)
lib/
├── api/              # API requests (campers, filters, reviews, bookings)
└── store/seo.ts      # site constants and buildMetadata helper
types/                # TypeScript types
public/               # static assets, SVG sprite, Open Graph image
```

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm (comes with Node.js)

### Installation

```bash
git clone git@github.com:YuliyaZakrepa/travel-trucks.git
cd travel-trucks
npm install
```

### Environment variables

Create a `.env` file in the project root (see `.env.example`):

### Run

```bash
npm run dev      # development server at http://localhost:3000
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint the code
npm run format   # format the code with Prettier
```

## API

The app communicates with a REST backend:

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| GET    | `/campers`                        | List of campers with filters |
| GET    | `/campers/filters`                | Available filter options     |
| GET    | `/campers/:id`                    | Camper details               |
| GET    | `/campers/:id/reviews`            | Camper reviews               |
| POST   | `/campers/:id/booking-requests`   | Send a booking request       |

## Code Quality

- **DRY:** shared logic is extracted into reusable pieces: `Icon`, `Button`, `buildMetadata`, form field components.
- **Design tokens:** colors, spacing, radii and typography are defined as CSS variables in `globals.css`.
- **Formatting:** Prettier with format-on-save and `npm run format:check`.

## Deployment

The project is deployed on [Vercel](https://vercel.com/). Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL` in the project environment variables.

## Author

Yuliya Zakrepa — [GitHub](https://github.com/YuliyaZakrepa))
