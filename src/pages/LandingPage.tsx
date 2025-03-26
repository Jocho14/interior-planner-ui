import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  DashboardSpeed,
  Palette,
  RulerArrows,
  SmartphoneDevice,
  ViewGrid,
} from "iconoir-react";
import { Link } from "react-router";

const LandingPage: React.FC = () => {
  return (
    <main>
      <section id="landing" className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-8 text-center">
                <h1 className="text-3xl pb-2 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Design Your Dream Space in 3D
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Transform your ideas into reality with our intuitive 3D room
                  planner. Design, visualize, and share your perfect space in
                  minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/sketch">
                  <Button size="lg" className="gap-1">
                    Start Designing <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            {/* <div className="lg:order-last rounded-xl overflow-hidden border bg-background shadow-xl h-[400px] lg:h-[500px]">
          <ThreeDPreview />
        </div> */}
          </div>
        </div>
      </section>

      <section id="features" className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Design Your Space
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our powerful yet easy-to-use tools make room planning accessible
                to everyone, from beginners to professionals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {[
              {
                icon: <ViewGrid className="h-10 w-10 text-primary" />,
                title: "Drag & Drop Interface",
                description:
                  "Easily place furniture, walls, and decor with our intuitive drag and drop interface.",
              },
              {
                icon: <Palette className="h-10 w-10 text-primary" />,
                title: "Realistic Materials",
                description:
                  "Choose from hundreds of textures, colors, and materials to visualize your space.",
              },
              {
                icon: <RulerArrows className="h-10 w-10 text-primary" />,
                title: "Accurate Measurements",
                description:
                  "Plan to scale with precise measurements for a perfect fit in your real space.",
              },
              {
                icon: <DashboardSpeed className="h-10 w-10 text-primary" />,
                title: "Real-time Rendering",
                description:
                  "See changes instantly with our powerful real-time 3D rendering engine.",
              },
              {
                icon: <SmartphoneDevice className="h-10 w-10 text-primary" />,
                title: "Mobile Compatible",
                description:
                  "Design on any device with our responsive web application.",
              },
              {
                icon: <CreditCard className="h-10 w-10 text-primary" />,
                title: "Budget Calculator",
                description:
                  "Track costs as you design to stay within your renovation budget.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card flex flex-col items-center space-y-2 rounded-lg min-h-[210px] border bg-background p-6 shadow-sm"
              >
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Design Your Space in Three Simple Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our streamlined process makes it easy to go from concept to
                completion.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Floor Plan",
                description:
                  "Start by setting up your room dimensions or choose from our pre-made templates.",
              },
              {
                step: "02",
                title: "Add Furniture & Decor",
                description:
                  "Browse our extensive library of furniture, fixtures, and decorative items.",
              },
              {
                step: "03",
                title: "Visualize & Share",
                description:
                  "View your design in 3D, make adjustments, and share with friends or contractors.",
              },
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
