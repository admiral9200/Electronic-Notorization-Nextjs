import Image from "next/image"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function BenefitsSection(): JSX.Element {
  return (
    <section id="about-section" aria-label="about section" className="w-full">
      <div className="container grid max-w-6xl justify-center gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Why{" "}
              <span className="relative bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
                Should You Care?
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-2xl text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Your competitors are already using{" "}
              <span className="font-semibold text-foreground">
                {siteConfig.name}
              </span>{" "}
              and similar products, gaining time and competitive advantage.
              Don&apos;t get left behind!
            </Balancer>
          </h3>
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="space-y-4 md:mt-20 md:space-y-6">
            <Card
              id="1"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Incredible Time Saver
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                  Revolutionize Academic <br className="hidden md:inline-block" />{" "}
                  Credential Management
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                  Say goodbye to outdated, insecure transcript systems. Our Blockcerts platform delivers a cutting-edge, distributed solution for managing and validating student records with unparalleled transparency and trust.
                  </Balancer>
                </p>
                <div>
                  <div className="pr-8">
                    <div className="relative z-10 flex flex-col gap-3 rounded-xl bg-background p-4 text-center shadow-xl">
                      <p className="text-3xl font-bold text-pink-800 dark:text-pink-600">
                        5.3k
                      </p>
                      <p className="text-xs font-bold tracking-wide text-purple-600 dark:text-purple-300">
                        Last 7 Days Website Visits
                      </p>
                      <p className="text-xs text-muted-foreground">
                        23% Increase from Last Week
                      </p>
                    </div>
                  </div>
                  <div className="-mt-14 pl-8">
                    <div className="flex flex-col gap-3 rounded-xl bg-background p-4 text-center opacity-30 shadow-xl">
                      <p className="text-3xl font-bold">132.7k</p>
                      <p className="text-xs font-bold tracking-wide">
                        Last 14 Days Website Visits
                      </p>
                      <p className="text-xs text-muted-foreground">
                        17% Increase from Last Week
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              id="2"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Latest and Greatest in Tech
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Cutting-Edge Credential Management with Blockcerts</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                  Experience the power of decentralized, cryptographically-secured transcripts that provide unparalleled trust and transparency. Our platform empowers you to stay at the forefront of innovation, equipping your institution, staff, and students with the most cutting-edge, tamper-resistant credential management system available.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/5.avif"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6">
            <Card
              id="3"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  High Quality Implementation
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Unparalleled Credential Integrity</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                  Deliver the highest standard of academic credential management with our Blockcerts-powered e-notary service. Ensure tamper-proof, cryptographically-secured student records that instill trust and confidence.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/4.jpg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>

            <Card
              id="4"
              className="h-fit w-full bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Flexibility and Support 
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                  Adaptable Blockcerts Solutions<br /> with Dedicated Support
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                  Enjoy the freedom to adapt our platform to your specific needs, whether it is integrating with your student information system, configuring custom issuance workflows, or designing a branded user experience. Our highly configurable Blockcerts solution provides the agility to evolve alongside your institution changing requirements, ensuring your credential management ecosystem remains future-proof and aligned with your strategic goals.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/6.jpg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
