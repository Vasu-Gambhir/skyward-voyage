# ✈️ Flight Booker — A Google Flights Clone

A responsive, full-featured flight search application inspired by Google Flights. Built with **React**, powered by the **Sky-Scrapper API** (via RapidAPI), and backed by **Supabase** for user authentication and data storage.

![screenshot-placeholder](https://via.placeholder.com/1200x600?text=App+Screenshot)

---

## 🚀 Features

- 🔍 **Flight Search** – by origin, destination, and travel dates
- ✈️ **Auto-suggestions** – smart airport name autocompletion
- 🧰 **Filters** – by airline, number of stops, departure/arrival time
- 🔄 **Sort Options** – by price, flight duration, and timing
- 📋 **Flight Details View** – see all legs and carrier info
- 🔐 **User Authentication** – sign up/login using Supabase
- 🕘 **Recent Searches & History**
- ❤️ **Favorite Routes or Airports**
- 💹 **Price Tracker / Alerts**
- 🌐 **Multi-city & Round-trip Support**
- 💱 **Currency Selector**
- 💡 **Theme Toggle** – Light & Dark Mode
- 📱 **Fully Responsive** – Works beautifully on desktop & mobile

---

## 🧰 Tech Stack

| Tech                 | Description                           |
| -------------------- | ------------------------------------- |
| **React**            | Frontend framework                    |
| **Supabase**         | Auth & backend (PostgreSQL + storage) |
| **Sky-Scrapper API** | Real-time flight data via RapidAPI    |
| **Tailwind CSS**     | Styling & responsiveness              |
| **React Router**     | Client-side routing                   |
| **TypeScript**       | Type-safe development                 |
| **React Query**      | API caching & state management        |

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/flight-booker.git
cd flight-booker
npm install
```

**Set up environment variables in `.env`:**

```env
VITE_RAPIDAPI_KEY=your_rapidapi_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run the app:

```bash
npm run dev
```

---

## 🔐 Authentication

User auth is handled via [Supabase](https://supabase.com/), allowing:

- Secure sign-up and login
- Storing user preferences
- Saving favorite routes

---

## 🗃️ API Integration

The app uses the **[Sky-Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper)** to:

- Fetch airport suggestions
- Search for flights
- Get carrier/price/duration info

Debounced input prevents excessive API requests during search.

---

## 🧪 Features You Can Extend

✅ Already Implemented  
🔜 Potential Future Additions

| Feature                 | Status |
| ----------------------- | ------ |
| Flight Search           | ✅     |
| Airport Suggestions     | ✅     |
| Filters & Sorting       | ✅     |
| User Authentication     | ✅     |
| Recent Searches         | ✅     |
| Favorites               | ✅     |
| Price Alerts            | ✅     |
| Currency Selector       | ✅     |
| Round Trip & Multi-city | ✅     |
| Routing                 | ✅     |
| Responsive Design       | ✅     |
| Light/Dark Mode         | ✅     |

---

## 📸 Screenshots

_Coming soon — you can add screenshots or GIFs here._

---

## 🧠 Learnings

- Deep integration with 3rd party APIs (Sky-Scrapper)
- Debounced input handling for API-heavy components
- Advanced filtering, sorting, and pagination logic
- Supabase auth and storage management
- Performance optimizations with React Query

---

## 📄 License

This project is open-source and free to use. Feel free to fork or build on top of it.
