import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 lg:py-16 xl:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Acme Inc - Earn Achievements, Share Your Scores
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Post, comment, and earn achievements to share your scores on social media. Join the Acme Inc
                    community today!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="/signup"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src="/landing.jpg"
                width="550"
                height={100}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last "
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/90">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Earn Achievements, Share Your Scores
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Post, comment, and earn achievements to share your scores on social media. Join the Acme Inc community
                  today!
                </p>
              </div>
            </div>
            <div className="mx-auto grid  items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/posting.svg"
                width="500"
                height="300"
                alt="Posting"
                className="mx-auto w-[400px] h-[400px] aspect-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4 max-w-[100vw]">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Post and Comment</h3>
                      <p className="text-muted-foreground">
                        Share your thoughts and engage with the Acme Inc community.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Earn Achievements</h3>
                      <p className="text-muted-foreground">Engage and earn achievements to showcase your progress.</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Share on Social Media</h3>
                      <p className="text-muted-foreground">
                        Brag about your achievements and scores with your friends and followers.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied users about their experience with Acme Inc.
              </p>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted p-1 text-4xl">🙂</div>
                    <div>
                      <h4 className="text-lg font-bold">Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">Acme Inc User</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    "I love using Acme Inc! The app is so easy to use and the achievements system keeps me engaged and
                    motivated. Highly recommend!"
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted p-1 text-4xl">😄</div>
                    <div>
                      <h4 className="text-lg font-bold">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Acme Inc User</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    "Acme Inc has been a game-changer for me. The social sharing features make it easy to connect with
                    friends and show off my achievements. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Acme Inc Community</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start earning achievements, sharing your scores, and connecting with others.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                to="/signin"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
              <Link
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Twitter
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Facebook
          </Link>
        </nav>
      </footer>
    </>
  );
}
