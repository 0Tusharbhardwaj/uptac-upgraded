import React from 'react';
import { MessageCircle, GraduationCap, Users2, ExternalLink } from 'lucide-react';

const WhatsAppBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Need Help with Counselling?</h3>
              <p className="text-indigo-100 text-sm">
                Join our WhatsApp group for expert guidance and check out our new tool for Other Courses!
              </p>
              <a
                href="https://other-college-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-white underline hover:text-indigo-200 mt-1"
              >
                Visit Other Courses Predictor
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Join WhatsApp Button */}
          <a
            href="https://chat.whatsapp.com/I5B4dCtJem8A3JEgSiKtgM?mode=r_c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold text-base hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Group
            <div className="flex items-center gap-1 ml-2">
              <Users2 className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBanner;
