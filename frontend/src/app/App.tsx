import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { RouterProvider } from "react-router";
import { router } from "./routes";

const API = import.meta.env.VITE_BACKEND_URL;

// Register user in backend
async function registerUser(user: any) {
  try {
    await fetch(`${API}/api/register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      }),
    });
  } catch (err) {
    console.error("Register user failed:", err);
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User detected:", user.email);

        // Sync with backend
        await registerUser(user);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Prevent app loading before auth sync
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}