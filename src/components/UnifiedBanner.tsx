import React from 'react';
import { MessageCircle, Users2, ExternalLink, GraduationCap, BarChart3, Rocket } from 'lucide-react';

const UnifiedBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg relative overflow-hidden rounded-lg my-8">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start text-center lg:text-left">
          {/* Left: WhatsApp Promotion */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Admission & Counselling Assistance</h3>
              <p className="text-indigo-100 text-sm mb-3">
                Join our WhatsApp group for direct admissions and expert counselling guidance.
              </p>
              <a
                href="https://chat.whatsapp.com/GSOTYrnN70lLLz8TVeuGlz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow"
              >
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp Group
                <Users2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle: B.Tech Predictor Promo */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">B.Tech College Predictor</h3>
              <p className="text-indigo-100 text-sm mb-3">
                Use our predictor for B.Tech admissions based on 2024 cutoff data.
              </p>
              <a
                href="https://uptac-college-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow"
              >
                <Rocket className="w-5 h-5" />
                Try B.Tech Predictor
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Other Predictor Promo */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Predict for Other Courses</h3>
              <p className="text-indigo-100 text-sm mb-3">
                B.Pharm, BFA, BHMCT, BFAD, B.Voc & LE course predictions available.
              </p>
              <a
                href="https://other-college-predictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow"
              >
                <BarChart3 className="w-5 h-5" />
                Try Other Predictors
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedBanner;
