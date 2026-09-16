# 🩺 Medicare Hub - Medical Booking Application

A modern, responsive, and feature-rich medical appointment booking web application built with **React**. Designed to connect patients with elite medical specialists, featuring advanced state management, smooth UI themes, and seamless navigation.

---

## 🚀 Features Implemented

- **Doctors Directory & Filtering:** Browse specialist doctors with real-time search and category filtering.
- **Dynamic Routing:** Multi-page layout including Home/Doctors, Doctor Details (`/doctors/:id`), Booking, Appointments Management, Profile, and a custom 404 Not Found page.
- **Appointment CRUD Operations:** 
  - **Create:** Book new appointments using **React Hook Form** with strict validation.
  - **Read:** Fetch and display active appointments list.
  - **Update:** Reschedule or edit existing appointments.
  - **Delete:** Cancel/delete appointments with instant UI feedback.
- **Global State Management (Zustand):** Manages Dark/Light mode and favorite doctors persistence.
- **Advanced UI/UX:** Built with **Tailwind CSS**, supporting smooth light and dark mode transitions, custom color palettes (Teal accents), and responsive design for mobile and desktop.
- **API Integration:** Powered by **Axios** for clean and modular REST API requests.

---

## 🛠️ Technologies Used

- **React.js** (Functional Components, Hooks)
- **React Router** (Navigation & Dynamic Routes)
- **Zustand** (Global State Management)
- **Axios** (HTTP Client for API requests)
- **React Hook Form** (Form Validation)
- **Tailwind CSS** (Styling & Responsive Design)
- **Lucide React** (Modern Icons)
- **json-server / Retool** (REST API Backend)

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable components (Navbar, Footer, Cards, etc.)
├── pages/               # Main application pages (Doctors, Details, Booking, Appointments, Profile, 404)
├── services/            # Axios API configuration & endpoints
├── stores/              # Zustand global stores (Theme, Favorites)
├── routes/              # React Router configuration
├── App.jsx              # Root component
└── main.jsx             # Application entry point



⚙️ Installation & Setup
Follow these steps to run the project locally on your machine:

Clone the repository:

Bash
git clone [https://github.com/YOUR_USERNAME/medical-booking-app.git](https://github.com/YOUR_USERNAME/medical-booking-app.git)
cd medical-booking-app
Install dependencies:

Bash
npm install
Start the Mock API (json-server):
If you are using json-server, make sure your backend is running on the designated port (e.g., http://localhost:3000):

Bash
json-server --watch db.json --port 3000
Run the React development server:

Bash
npm run dev
Open in your browser:
Open http://localhost:5173 to view the application.

📸 Screenshots
(Add your project screenshots or GIFs here)

🌐 Live Demo
Deployed Frontend: View Live App (Add your Vercel or Netlify link here)

👤 Author
Name: رحاب عبد العزيز ابو القاسم

Institution: جامعة الفيوم التكنولوجية (ITI Fayoum - React Summer Training)