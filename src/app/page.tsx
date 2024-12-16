'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logOut } from "@/services/auth";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

      }
      else {
        router.push('/signIn');
      }
    });
    return () => unsubscribe();
  }
    , [router]);

  const handleLogOut = async () => {
    await logOut();
    router.push('/signIn');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-full max-w-md shawdow-xl bg-white p-6">
        <CardHeader className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.email || "User"}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-6 text-center">
            This is your dashboard, you can do whatever you want here.
          </p>
          <div className="text-center">
            <Button
              onPress={handleLogOut}
              color="danger"
              size="lg"
              className="w-full"
            >
              Log Out
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
