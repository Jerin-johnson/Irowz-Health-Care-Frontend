import React from "react";
import {
  Search,
  Calendar,
  FileText,
  CheckCircle,
  Stethoscope,
  UserRound,
  Video,
  Clock,
  type LucideIcon,
} from "lucide-react";

// ==================== TYPES ====================
interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
        <Icon className="text-blue-600" size={28} />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ==================== MAIN SECTION ====================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Search Doctor",
      description:
        "Find the perfect specialist using filters like specialty, location, ratings & availability.",
    },
    {
      icon: FileText,
      title: "Explore Profile",
      description:
        "Review qualifications, experience, patient reviews and consultation fees.",
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description:
        "Pick your preferred date and time — instant confirmation for most doctors.",
    },
    {
      icon: CheckCircle,
      title: "Consult & Heal",
      description:
        "Connect via video, chat or in-person and get expert medical guidance.",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* LEFT: Illustration – visible on lg+ */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-[540px] mx-auto">
              {/* Background glow + pulse */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/30 to-purple-100/20 blur-3xl animate-pulse"></div>

              {/* Outer ring */}
              <div className="absolute inset-6 rounded-full border border-blue-200/40"></div>

              {/* Main circle */}
              <div className="relative h-full rounded-full overflow-hidden bg-white/70 backdrop-blur-md shadow-2xl border border-white/80">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 via-transparent to-transparent z-10"></div>

                {/* Central doctor-patient scene */}
                <div className="absolute inset-0 flex items-center justify-center gap-16 px-10">
                  {/* Patient */}
                  <div className="relative animate-bounce-slow">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center shadow-xl ring-1 ring-teal-100/50">
                      <UserRound
                        className="text-teal-700"
                        size={56}
                        strokeWidth={1.7}
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-teal-100">
                      <Video className="text-blue-600" size={20} />
                    </div>
                  </div>

                  {/* Doctor */}
                  <div className="relative animate-bounce-slow-delay">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-2xl ring-1 ring-blue-100/50">
                      <Stethoscope
                        className="text-indigo-700"
                        size={64}
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-green-100">
                      <Clock className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                {/* Floating icons – using animate-bounce */}
                <div className="absolute top-12 left-10 animate-bounce">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg border border-purple-100">
                    <Calendar className="text-purple-600" size={26} />
                  </div>
                </div>

                <div className="absolute bottom-16 right-12 animate-bounce [animation-delay:1.5s]">
                  <div className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg border border-amber-100">
                    <Search className="text-amber-600" size={24} />
                  </div>
                </div>

                <div className="absolute top-1/4 -left-5 animate-bounce [animation-delay:3s]">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow border border-green-100">
                    <CheckCircle className="text-green-600" size={22} />
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-xl border border-blue-100 text-blue-700 font-semibold text-sm tracking-wide">
              Easy • Secure • 24×7 Support
            </div>
          </div>

          {/* RIGHT: Steps */}
          <div className="lg:pl-6">
            <div className="mb-10 md:mb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                Simple & Fast
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Get the care you need
                <span className="text-blue-600 block mt-2">
                  in just 4 steps
                </span>
              </h2>
              <p className="mt-5 text-lg text-gray-600 max-w-xl">
                Finding and consulting a doctor has never been easier. Follow
                these simple steps to get expert medical help quickly.
              </p>
            </div>

            <div className="space-y-10 md:space-y-12">
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
