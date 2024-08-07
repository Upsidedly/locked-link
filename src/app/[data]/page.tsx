"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { decodeData } from "@/lib/serialization";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinkPage({ params }: { params: { data: string } }) {
  const data = JSON.parse(decodeData(params.data));
  console.log(data);
  const router = useRouter();
  const [password, setPassword] = useState<string>();
  const [isIncorrect, setIsIncorrect] = useState(false);

  useEffect(() => {
    if (isIncorrect) {
      setTimeout(() => setIsIncorrect(false), 2000);
    }
  }, [isIncorrect]);

  function onGo() {
    if (password !== data.password) {
      setIsIncorrect(true);
      return;
    }
    router.replace(data.url);
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col pt-[38vh] items-center"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onGo();
        }
      }}
    >
      <Image src="/icon.svg" width={200} height={200} className="w-[60px] mb-5" alt="logo" />
      <p>This link is locked! Enter a password to proceed.</p>
      <div className="flex gap-2 mt-5">
        <Input name="password" type="password" id="password" className="w-max" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onGo}>Go</Button>
      </div>
      {isIncorrect && <p className="mt-2 text-sm text-red-700 italic">Incorrect password.</p>}
    </div>
  );
}
