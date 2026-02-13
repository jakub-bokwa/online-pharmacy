# Pharmacy Online

A full stack web app which allows the visitor to browse different medication, sort it by price, search using a bar and filter through different manufacturers.

## How to run

**Development**

Install dependencies in both folders:

    cd frontend && pnpm install
    cd backend && pnpm install

Then start both servers (in separate terminals):

    cd backend && pnpm dev
    cd frontend && pnpm dev

The frontend runs on http://localhost:5173 and proxies API requests to the backend on port 3000.

**Production**

Build the frontend and the backend:

    cd frontend && pnpm build
    cd backend && pnpm build

Then start the server:

    cd backend && pnpm start

The app will be available on http://localhost:3000. Express serves both the API and the built frontend files.

**Tests**

    cd frontend && pnpm test

## Tech stack

**Frontend**
(! DISCLAIMER !) - The instruction suggested to use the Create-React-App template, but I decided to go for Vite+Typescript as CRA got deprecated over the last few years and contains a lot of unnecessary bloat.

Tech stack is then as follows:

- React 19 with TypeScript
- Vite as the build tool and dev server
- Tailwind CSS + daisyUI for styling
- Heroicons library for the icons
- Vitest + React Testing Library for tests

**Backend**

- Node.js with Express 5
- Serves the API and the built frontend in production

## Approach

Throughout the project I tried to follow good programming practices and keep the code clean. The priority was always readability first, then maintainability, then "clever solutions". I followed the DRY principle where it made sense, but I deviated off the rule to a small degree in places where extracting an abstraction would worsen the readability or added unnecessary mental burden in place where things could have been kept simple.

I also kept scope in check. The instructions specifically mention scope reduction and focusing on core functionalities, so I tried to keep in line with that requirement and not over-implement things which could look nicer, but were not asked for. Every piece of code exists because a requirement asked for it and if something wasn't specified, I didn't build too deep into it (although I very often wanted to!). I imagined a situation of me being a developer and you being the client, so the first rule was to keep things simple and then suggest possible improvements later, as long as the core functionality works, since every extra effort in business setting costs time and money. Thus there will be a list of possible improvements, extensions, ways of scaling the project, in the latter part of this document.

The codebase is linted with ESLint and formatted with Prettier to keep the style consistent across files. TypeScript is also used to minimize the risk of bugs due to type oversight.

## Architecture

### Component structure and naming

Each component has a single responsibility:

- **Navbar** - app header with the logo and title
- **Content** - layout wrapper for the main content area
- **SearchBar** - text input for searching by name and description
- **ManufacturerFilter** - dropdown with checkboxes for each manufacturer
- **SortDropdown** - dropdown with the three sort options
- **ProductList** - owns the grid layout and iterates over products
- **ProductItem** - renders a single product as a card

All components use index file exporting to make the the import lists shorter and take less space at the top of the file. It is also my preference because all files are there in the index.ts file and can be tracked a bit more thoroughly, in my experience. Components are small, I tried to keep the HTML minimal, otherwise split the code into smaller components with clearly separated responsibilities and logical structure.

### Pure utility functions for sorting and filtering

Sorting and filtering logic lives in separate utility files under utils/. These are pure functions and I extracted them because they are reusable and independently testable. The event handlers that wire them to React state stay in App.tsx because they are component-specific glue code and aren't worth extracting on their own.

### Type organization

Types are grouped by domain in the types/ folder - one file for product-related types, one for sorting and one for filtering. I started with one file per type but that was too granular. I also tried one big types file but that gets messy as it grows. Grouping by domain felt like the right compromise, with a small exception - trivial types that are only used in one place are placed inline in their component file.

### Filtering approach

The instructions ask for filtering by name, description, and manufacturer. I could have made three separate text inputs, but that would be terrible UX-wise and users would need to know exact manufacturer names to type them in. Instead:

- Name and description share a single search bar, since both are text fields. The search is case-insensitive and checks both fields at once.

- Manufacturers get their own dropdown with checkboxes, since there is a small number of them. All manufacturers start checked and unchecking one excludes that manufacturer's products.

Although not specified, I took the liberty of displaying the number of currently browsed manufacturers, to give a valuable information even when the manufacturer filter is closed.

### Manufacturer list derived from data

The list of manufacturers is not hardcoded. It's computed from the product data dynamically, sorted alphabetically. If the data changes (different products, different manufacturers), the filter updates automatically without touching any code.

### Set for selected manufacturers

Selected manufacturers are stored as a Set rather than in an array. For 10 manufacturers it doesn't matter performance-wise, but it's quick to implement, doesn't cost any extra effort and it would scale well for a bigger set of manufacturers.

### Sort dropdown over toggle

I considered a 3-way toggle button (click cycles through default, ascending, descending price sorting) but went with a dropdown instead. A toggle forces the user to cycle through all options to reach the one they want and a dropdown gives direct access to any sort mode in one click. I also think this is the standard everywhere and discarded the initial idea as impractical.

### Express on the backend

In production, the Express server does two things, it serves the API endpoint (returns the product data from a JSON file) and also serves the built frontend files as static assets. A catch-all route serves index.html for any non-API path, which is the standard approach for single-page apps.

### Loading, error, and empty states

The app fetches product data on mount. During the fetch there's a centered loading spinner. If the fetch fails, an error alert is shown with the error message. If the data loads fine but the current filters match nothing, a warning says "No products match your current filters." These are three separate early returns in App.tsx before the main render. I didn't use an extra library like React-query for that as I thought it would not be necessary in such a small app.

### Responsive product grid

Products are displayed in a grid that adapts to screen width - 1 column on mobile, 2 on tablet, 3 on desktop. I also considered showing a list of products instead of a grid but I thought it would be going over the scope, as it was not specified. I thought about paginating the results on the front-end to avoid showing all 100 at once, but also decided it is not important for a project of such small scale and would be deviating off the main goal.

### State management with useState

The app uses plain useState for all state. I considered useReducer, which would group the related state transitions together, but all the handlers are simple and only set a single value. A reducer would add boilerplate (action types, switch cases, dispatch calls) without actually making anything clearer. I could also consider state management libraries like Zustand or Redux, but this app has one screen with a handful of controls - there's no deeply nested component tree, no shared global state, no complex async flows. UseState was in my opinion the best value to the required effort.

If the app grew to have multiple pages, shared state across routes, or complex interdependent updates, I would consider a different state management strategy.

### Testing

Tests live in the frontend only and it was a conscious decision to keep things simple. The backend is a thin layer - one route that reads a JSON file and returns it. There's no business logic there worth testing in isolation, and the integration tests on the frontend already cover the full fetch and render flow by mocking the fetch call.

I used three libraries: Vitest as the test runner (integrates natively with Vite, same config, fast), React Testing Library for rendering components and simulating user interactions, and jsdom to simulate a browser environment in Node. For mocking the API call I used Vitest built-in mocking.

The test suite has 23 tests across 4 files:

- sorting tests - verify that ascending and descending sort functions return the correct order, and that they don't mutate the original array
- filtering tests - verify filtering by name, by description, by manufacturer, combined filters, and edge cases like an empty manufacturer selection
- component tests - verify that each component renders the right content given its props, and that callbacks fire correctly on user interaction

- integration tests - render the full App, mock the fetch, and verify the main user flows: data loads and appears, searching filters the list, empty results show a warning, and a failed fetch shows an error

The focus was on testing the actual logic (sorting, filtering) thoroughly since that's where bugs are most likely, and then verifying that the components work together correctly. I didn't add snapshot tests because the project is small, and if it was maintained, would probably change the UI very frequently.

## Possible improvements and extensions of the project for the future

Things I would consider if the app needed to grow beyond a demo.

### Architecture

- Database instead of a JSON file

- Server-side filtering and sorting - currently all the logic runs in the browser. That works fine for 100 products but scales poorly. Moving the filtering and sorting to the backend would be a proper scaling solution.

- Pagination - currently all 100 products render at once. For a larger dataset I would add pagination or infinite scroll so the browser doesn't have to render everything upfront.

- React Router - the app is a single page right now. If it needed a product detail page, a cart, or an about page, I would add routing. This would also be the point where I would reconsider state management - shared state across routes might call for something like Zustand or React context.

- useReducer or a state library - as mentioned in the previous section, useState is fine for now. But if the number of related state values kept growing or the update logic got more complex, useReducer or a lightweight library like Zustand would be a better fit.

- Environment variables - the API URL and port are hardcoded. In a real setup these would come from environment variables so the same code can run in different environments without changes.

- End-to-end tests - Playwright or Cypress to test the full flow in an actual browser. This is the natural next step after unit and integration tests, especially once there are multiple pages or user flows.

- CI/CD pipeline - run linting, type checking, and tests automatically on every push. Block merges if anything fails.

### Frontend / UX

- Product detail page - clicking a product could open a dedicated page with more information, images, dosage instructions, etc.

- Shopping cart - let users add products to a cart and see a summary. This is the obvious next feature for anything that resembles a pharmacy.

- Dark mode - daisyUI supports themes out of the box, so adding a theme toggle would be straightforward.

- List/grid view toggle - let the user switch between the card grid and a compact list or table view. I considered this during development but it was not in the requirements.

- Debounced search - the search currently filters on every keystroke. For a larger dataset or server-side filtering, I would debounce the input so it waits until the user stops typing before making a request.

- URL-based filter state - store the current search, manufacturer selection, and sort mode in the URL query string. This way users can bookmark or share a filtered view, and the browser back button works as expected.

- Accessibility improvements - keyboard navigation for the dropdowns, proper ARIA labels, screen reader testing. The daisyUI components cover the basics but there is always room to do more.

- Skeleton loading - instead of a single spinner, show placeholder cards in the grid while the data loads. Feels snappier and gives the user a sense of the layout before the content arrives.

- I18n to hold the text (perhaps in multiple languages as well) instead of hard-coded English text directly inside the code.
