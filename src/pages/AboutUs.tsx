import { Layers, Target, Users, Lightbulb, Heart, TrendingUp } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: Target,
      title: 'Curated Quality',
      description: 'Every job, review, and news article is handpicked to ensure relevance and value for our tech-savvy community.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Built by professionals, for professionals. We understand what matters in the tech industry.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Staying ahead of trends to bring you the most cutting-edge opportunities and insights.'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Clear disclosure of affiliations and partnerships. Your trust is our priority.'
    }
  ];

  const stats = [
    { value: '1000+', label: 'Jobs Posted' },
    { value: '500+', label: 'Tech Reviews' },
    { value: '2000+', label: 'News Articles' },
    { value: '50K+', label: 'Monthly Visitors' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Layers className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">About The Info Stack</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-emerald-50">
            Your one-stop platform for tech careers, honest product reviews, and curated industry news
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p className="leading-relaxed">
              The Info Stack was born from a simple observation: the tech industry moves fast, and professionals need
              a reliable source to stay informed about career opportunities, make smart purchasing decisions, and keep
              up with industry trends.
            </p>
            <p className="leading-relaxed">
              Founded in 2026, we set out to create more than just another job board or review site. We built a
              comprehensive platform that aggregates the most valuable information tech professionals need in one place.
            </p>
            <p className="leading-relaxed">
              Our team of industry veterans carefully curates every piece of content, ensuring that what you see is
              relevant, timely, and actionable. We're not just aggregating information—we're adding context, insight,
              and our expertise to help you make better decisions.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Job Opportunities</h3>
              <p className="text-gray-700">
                We curate the best tech job openings from companies worldwide, highlighting urgent opportunities
                and ensuring you never miss a career-defining moment.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Reviews</h3>
              <p className="text-gray-700">
                Honest, in-depth reviews of the latest tech products and services. We test, evaluate, and provide
                verdict scores to help you make informed purchasing decisions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Curated News</h3>
              <p className="text-gray-700">
                Stay informed with handpicked tech news from trusted sources, complete with our curator's take
                to give you context and perspective on what matters.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
