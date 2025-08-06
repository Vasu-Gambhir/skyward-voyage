# ✈️ Flight Booker — A Google Flights Clone

A responsive, full-featured flight search application inspired by Google Flights. Built with **React**, powered by the **Sky-Scrapper API** (via RapidAPI), and backed by **Supabase** for user authentication and data storage.

-- 

## URLs
- Live URL - https://skyward-voyage.vercel.app/
- Loom URL - https://www.loom.com/share/ddb19fc8afba4d11882f9a55de788bdb?sid=85c80db5-3bce-40f2-b34c-78393e650807
---

## 🚀 Features

- 🔍 **Flight Search** – by origin, destination, and travel dates
- ✈️ **Auto-suggestions** – smart airport name autocompletion
- 🧰 **Filters** – by airline, number of stops, departure/arrival time
- 🔄 **Sort Options** – by price, flight duration, and timing
- 📋 **Flight Details View** – see all legs and carrier info
- 🔐 **User Authentication** – sign up/login using Supabase
- 🌐 **Multi-city & Round-trip Support**
- 📱 **Fully Responsive** – Works beautifully on desktop & mobile

---

## Coming Soon
- 🕘 **Recent Searches & History**
- ❤️ **Favorite Routes or Airports**
- 💹 **Price Tracker / Alerts**
- 💱 **Currency Selector**
- 💡 **Theme Toggle** – Light & Dark Mode
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
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_HOST="sky-scrapper.p.rapidapi.com"
VITE_BASEURL="https://sky-scrapper.p.rapidapi.com/api"
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
| Recent Searches         | 🔜     |
| Favorites               | 🔜     |
| Price Alerts            | 🔜     |
| Currency Selector       | 🔜     |
| Round Trip & Multi-city | ✅     |
| Routing                 | ✅     |
| Responsive Design       | ✅     |
| Light/Dark Mode         | 🔜     |

---

## 📸 Screenshots

<img width="1900" height="909" alt="image" src="https://github.com/user-attachments/assets/a76a9b4c-f0c3-47fa-bead-364f5cdd47a6" />
<img width="1901" height="906" alt="image" src="https://github.com/user-attachments/assets/b7ba1cb1-bc7f-4175-9ebe-c8bf03259558" />
<img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/f826b5ac-06b5-4d79-964e-afe5ad9d6f0c" />


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
