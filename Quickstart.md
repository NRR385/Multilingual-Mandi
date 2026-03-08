# Multilingual Mandi Quickstart Guide

Get **Multilingual Mandi** up and running in a few minutes!

---

## 🚀 Run Locally (Development)
Fastest way to explore the app without any external services.

1. **Clone the repository**
   ```bash
   git clone https://github.com/NRR385/Multilingual-Mandi
   cd "Multilingual Mandi"
   ```

2. **Install dependencies**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Start the backend server**
   ```bash
   cd ../backend
   node server.js
   ```
   By default the API listens on `http://localhost:5000/`.

4. **Run the frontend in dev mode**
   ```bash
   cd ../frontend
   npm run dev
   ```
   Open `http://localhost:3000` in your browser and you should see the dashboard.

5. **Try the features**
   - Enter some text and select a language to see translations.
   - Use the price assistant controls to simulate negotiation/price discovery.

📝 The frontend automatically talks to the locally running backend, no extra configuration needed.


---

## 🎯 What to Try

- Translate between Hindi, English, and other supported languages in real time.
- Enter price data and see suggestions for minimum/average/recommended.
- Check console logs for backend API responses.
- Modify a React component in `frontend/src` and watch Vite hot‑reload.

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won’t start | Ensure Node.js 18+ is installed and run `npm install` again. |
| Frontend throws errors | `cd frontend && npm run lint` to see code issues.
| CORS errors | Confirm backend is running and update `cors` origin configuration in `backend/server.js`. |
| Build fails | Delete `node_modules` and `package-lock.json` then reinstall. |

---

## 📚 Next Steps

- Read `README.md` for full overview and project goals.
- Explore `frontend/src` and `backend` for code structure.
- Add new languages or extend the price assistant logic.
- Set up CI/CD, tests, or deploy to a cloud provider.



Happy translating! 