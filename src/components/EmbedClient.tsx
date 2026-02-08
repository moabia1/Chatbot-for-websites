"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function EmbedClient({ ownerId }: { ownerId: string | null }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const embedCode =
  `<script 
    src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" 
    data-org-id="${ownerId}">
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Logo />
          </div>
          <div className="flex-1 flex items-center justify-end gap-4">
            <Button
              className="relative rounded-full h-8 w-8"
              variant={"outline"}
              size={"icon"}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              <SunIcon
                className={cn(
                  "absolute h-5 w-5 transition",
                  isDark ? "scale-100" : "scale-0",
                )}
              />
              <MoonIcon
                className={cn(
                  "absolute h-5 w-5 transition",
                  isDark ? "scale-0" : "scale-100",
                )}
              />
            </Button>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-4xl rounded-2xl shadow-xl p-10">
          <h1 className="text-2xl font-semibold mb-2">Embed Chatbot</h1>
          <p>
            Copy and paste this code before <code>&lt;/body&gt;</code> in your
            HTML file:
          </p>
          <div className="relative bg-primary rounded-xl p-5 text-sm text-white! mb-10">
            <pre>{embedCode}</pre>
            <Button
              onClick={handleCopy}
              className=" bg-white text-black! hover:bg-zinc-400 absolute top-3 right-3 text-xs font-medium rounded-lg transition"
            >
              {copied ? "copied ✓" : "copy"}
            </Button>
          </div>

          <ol className="list-decimal list-inside space-y-3">
            <li>Copy the embed code above.</li>
            <li>
              Paste it before the closing {`</body>`} tag in your HTML file.
            </li>
            <li>Save and reload your webpage to see the chatbot in action!</li>
          </ol>

          <div className="mt-14">
            <h1>Live Preview</h1>
            <p className="text-sm m-6">
              This is how your chatbot will appear on your website.
            </p>

            <div className="border rounded-xl shadow-md overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-9 border-b bg-muted">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="ml-4 text-xs">your-website.com</span>
              </div>
              <div className="relative h-64 sm:h-72 p-6 text-sm">
                Your website goes here
                <div className="absolute bottom-24 right-6 w-64 bg-white rounded-xl shadow-xl border overflow-hidden">
                  <div className="bg-black text-white text-xs px-3 py-2 flex justify-between items-center">
                    <span>Customer Support</span>
                    <span>✖️</span>
                  </div>

                  <div className="p-3 space-y-3 bg-zinc-50">
                    <div className="bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit">
                      hi! how can I help you?
                    </div>
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit">
                      What is the return policy?
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl cursor-pointer animate-bounce">
                  💬
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmbedClient;
