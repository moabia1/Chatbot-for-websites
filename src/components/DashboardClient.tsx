import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Spinner } from "./ui/spinner";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSetting = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });
      console.log(res.data);
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const res = await axios.post("/api/settings/get", {
            ownerId,
          });
          console.log(res.data);
          setBusinessName(res.data.businessName)
          setKnowledge(res.data.knowledge)
          setSupportEmail(res.data.supportEmail)
        } catch (error) {
          console.log(error);
        }
      };
      handleGetDetails();
    }
  }, [ownerId]);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 right-0 left-0 z-30">
        <header className="h-16 border-b bg-background py-4">
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
            <Logo />

            <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
              <Link href="/" className="text-foreground-muted text-sm">
                Home
              </Link>
              <Link href="/" className="text-foreground-muted text-sm">
                Pricing
              </Link>
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
              <Button>Embed Chat</Button>
            </div>
          </div>
        </header>
      </div>

      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-3xl rounded-2xl shadow-xl p-10">
          <div className="mb-12">
            <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your AI chatbot knowledge and business details
            </p>
          </div>

          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <div className="space-y-4">
              <input
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
                type="text"
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Business Name"
              />
              <input
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                type="text"
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Support Email"
              />
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge Base</h1>
            <p className="text-sm mb-4 text-muted-foreground">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>
            <div className="space-y-4">
              <textarea
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
                className="w-full h-54 rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Example:
                • Refund policy: 7 days
                • Delivery time: 3–5 business days
                • Cash on delivery: Available
                • Support hours: 10 AM – 6 PM (Mon–Sat)
                `}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Button
              disabled={loading}
              onClick={handleSetting}
              className="active:scale-105"
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
            {saved && (
              <span className="text-sm font-medium text-primary">
                ✓ Setting saved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
