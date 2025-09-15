import { Clock, RefreshCw, ThumbsUp, TrendingUp } from 'lucide-react';
import { insightMetrics } from '../../data/testimonials.config';

export default function InsightsSnapshot() {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'avg resolution time':
        return Clock;
      case 'repeat customers':
        return RefreshCw;
      case 'service satisfaction':
        return ThumbsUp;
      default:
        return TrendingUp;
    }
  };

  const getProgressValue = (metric: typeof insightMetrics[0]) => {
    switch (metric.title) {
      case 'Avg Resolution Time':
        return 85; // Lower time is better, so inverse percentage
      case 'Repeat Customers':
        return parseInt(metric.value);
      case 'Service Satisfaction':
        return (parseFloat(metric.value) / 5) * 100;
      default:
        return 75;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'from-green-500 to-[#00E396]';
    if (value >= 75) return 'from-[#00E396] to-green-400';
    if (value >= 60) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-orange-500';
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Trust <span className="text-[#00E396]">Metrics</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          Data-driven insights showcasing our commitment to excellence
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {insightMetrics.map((metric, index) => {
          const Icon = getIcon(metric.title);
          const progressValue = getProgressValue(metric);
          const progressColor = getProgressColor(progressValue);

          return (
            <div
              key={metric.title}
              className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-[#00E396]/30 transition-all duration-300 group hover:shadow-xl hover:shadow-[#00E396]/10 shadow-sm"
            >
              {/* Icon Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="bg-[#00E396]/10 p-2 sm:p-3 rounded-lg group-hover:bg-[#00E396]/20 transition-colors">
                  <Icon size={24} className="sm:w-7 sm:h-7 text-[#00E396]" />
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Performance</div>
                  <div className="text-sm sm:text-lg font-semibold text-gray-900">
                    {progressValue >= 90 ? 'Excellent' : progressValue >= 75 ? 'Great' : 'Good'}
                  </div>
                </div>
              </div>

              {/* Main Metric */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#00E396] transition-colors">
                  {metric.value}
                  {metric.unit && (
                    <span className="text-xl sm:text-2xl text-gray-500 ml-1">{metric.unit}</span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                  {metric.title}
                </h3>
                {metric.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {metric.description}
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-3 sm:mb-4">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{progressValue}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className={`h-1.5 sm:h-2 bg-gradient-to-r ${progressColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${progressValue}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-green-500 font-medium">
                  +{12}% this month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Why Customers Choose Raam Ather
          </h3>
          <p className="text-gray-600">
            Our commitment to excellence reflected in numbers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
                    <div className="bg-[#00E396]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <Clock size={24} className="text-[#00E396]" />
        </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
            <p className="text-gray-500 text-sm">Support Available</p>
          </div>

          <div className="text-center">
                    <div className="bg-[#00E396]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <RefreshCw size={24} className="text-[#00E396]" />
        </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
            <p className="text-gray-500 text-sm">Customer Retention</p>
          </div>

          <div className="text-center">
                    <div className="bg-[#00E396]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <ThumbsUp size={24} className="text-[#00E396]" />
        </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
            <p className="text-gray-500 text-sm">Average Rating</p>
          </div>

          <div className="text-center">
                    <div className="bg-[#00E396]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <TrendingUp size={24} className="text-[#00E396]" />
        </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">150%</div>
            <p className="text-gray-500 text-sm">Growth Rate</p>
          </div>
        </div>
      </div>

      {/* Certification Badges */}
      <div className="flex justify-center mt-12">
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00E396] rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">ISO</span>
            </div>
            <span>ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">★</span>
            </div>
            <span>Ather Authorized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span>Quality Assured</span>
          </div>
        </div>
      </div>
    </section>
  );
}