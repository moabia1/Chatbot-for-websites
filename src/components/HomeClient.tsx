"use client"
import React from 'react'
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import { MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeClient = () => {

  const router = useRouter();

  const {isSignedIn} = useUser();
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <div className="relative overflow-hidden pt-28">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
            <div className="space-y-3">
              <h1 className="text-center font-semibold text-3xl tracking-tight sm:text-5xl ">
                AI Customer supports for <br className="md:hidden" />
                <span className="text-primary">Modern Website</span>
              </h1>
              <p className="mx-auto max-w-2xl text-center font-medium text-foreground leading-relaxed sm:text-lg">
                Add an AI chatbot to your website in minutes — instant answers
                powered by your business knowledge.
              </p>
            </div>
            <div className="flex w-full max-w-3xl flex-col items-center gap-8 relative z-50">
              <div className="w-full flex items-center flex-col gap-5">
                <div className="rounded-2xl shadow-2xl border p-6 w-2/3 mt-5">
                  <div className="text-sm text-muted-foreground mb-3">
                    Live chat preview
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                      Do you offer cash on delivery ?
                    </div>
                    <div className="bg-secondary-foreground text-primary-foreground rounded-lg px-4 py-2 text-sm w-fit">
                      yes, Cash On Delivery is available
                    </div>
                  </div>
                  <div className="absolute bottom-8 right-24 w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-xl animate-bounce">
                    <MessageCircleMore />
                  </div>
                </div>

                <div className="flex gap-4">
                  {isSignedIn ? (
                    <Button onClick={()=>router.push("/dashboard")}>Go to Dashboard</Button>
                  ) : (
                    <Button onClick={() => router.push("/sign-up")}>
                      Get Started
                    </Button>
                  )}
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      document
                        .getElementById("feature")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute -translate-x-1/2 left-1/2 w-[5000px] h-[3000px] top-[80%] -z-10 ">
              <div className="-translate-x-1/2 absolute bottom-[calc(100%-300px)] left-1/2 h-[2000px] w-[2000px] opacity-20 bg-radial-primary"></div>
              <div className="absolute -mt-2.5 size-full rounded-[50%] bg-primary/20 opacity-70 [box-shadow:0_-15px_24.8px_var(--primary)]"></div>
              <div className="absolute z-0 size-full rounded-[50%] bg-background"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeClient