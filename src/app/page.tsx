"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { encodeData } from "@/lib/serialization";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState<string>();
  function onLinkCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation()
    const data = event.target as unknown as { url: { value: string }; password: { value: string } };
    setLink('/' + encodeData(JSON.stringify({ url: data.url.value, password: data.password.value })));
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-3 flex-col">
      <h1 className="text-3xl">Link Locker</h1>
      <p>Put a password on your links</p>
      <fieldset className="border border-white px-8 py-5 rounded-md md:w-max sm:w-[300px] w-[90vw]">
        <legend className="px-2">Create a new locked link</legend>
        <form onSubmit={onLinkCreate} className="space-y-5">
          <div>
            <Label htmlFor="url">URL</Label>
            <Input name="url" type="url" id="url"></Input>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" id="password"></Input>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </fieldset>
      {link && <a href={link}>{link}</a>}
    </div>
  );
}
