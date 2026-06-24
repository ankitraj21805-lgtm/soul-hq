"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TryoutForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/tryouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error ?? "Tryout submit nahi ho paya.");
      return;
    }

    setStatus("success");
    setMessage("Tryout request submitted. Admin dashboard me show hoga.");
    const form = document.getElementById("tryout-form") as HTMLFormElement | null;
    form?.reset();
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <form id="tryout-form" action={onSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder="Real name" required />
          <Input name="game_name" placeholder="Game name" required />
          <Input name="instagram_id" placeholder="Instagram ID" required />
          <Input name="active_time" placeholder="Active time, e.g. 9 PM - 12 AM" />
          <Input name="driving_skill" type="number" min="0" max="100" placeholder="Driving skill 0-100" />
          <Input name="game_skill" type="number" min="0" max="100" placeholder="Game skill 0-100" />
        </div>
        <Textarea name="message" placeholder="Why do you want to join SOUL?" />
        <Button disabled={status === "loading"}>{status === "loading" ? "Submitting..." : "Submit Tryout"}</Button>
        {message ? (
          <p className={status === "success" ? "text-emerald-300" : "text-red-300"}>{message}</p>
        ) : null}
      </form>
    </Card>
  );
}
