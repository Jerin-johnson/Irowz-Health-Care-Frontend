// pages/Contact.tsx  (or components/ContactPage.tsx)
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "../components/navbar/PublicNavbar";
import Footer from "../components/landingPage/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Header / Hero */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navbar />
        <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-br from-blue-600/5 via-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch with Our Healthcare Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you have questions about our platform, need support, or
              want to explore partnership opportunities — we're here to help
              24/7.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <ShieldCheck size={18} className="text-green-600" />
              Your message is secure & confidential
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600 mb-8">
                Our team typically responds within 1–2 business hours during
                working days.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Dr. John Doe / Sarah Thomas"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="you@hospital.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose topic...
                    </option>
                    <option>Platform Support / Technical Issue</option>
                    <option>Doctor / Hospital Onboarding</option>
                    <option>Partnership & B2B Inquiry</option>
                    <option>Billing & Subscription</option>
                    <option>General Question / Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder="How can we assist you today? Include your hospital/clinic name if relevant."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>

            {/* Right: Contact Info + Quick Links */}
            <div className="space-y-10 lg:space-y-12">
              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Live Chat</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Available 9 AM – 9 PM IST
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                    Start Chat →
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Phone Support</h3>
                  <p className="text-gray-600 text-sm mb-1">+91 484 123 4567</p>
                  <p className="text-gray-500 text-sm">
                    Mon–Sat: 9 AM – 8 PM IST
                  </p>
                </div>
              </div>

              {/* Email & Address */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-1">
                      support@yourhealthsaas.com
                    </p>
                    <p className="text-gray-600">
                      partners@yourhealthsaas.com (for hospitals & clinics)
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Our Office</h3>
                    <p className="text-gray-600">
                      HealthSaaS Technologies Pvt Ltd
                      <br />
                      3rd Floor, Infopark TBC, Kakkanad
                      <br />
                      Kochi, Kerala 682042, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick FAQ-style */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4">Common Questions</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Need urgent technical support? → Use Live Chat</li>
                  <li>
                    • Looking to onboard your hospital? → Email partners@...
                  </li>
                  <li>
                    • Billing/subscription queries? → Check your dashboard first
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
