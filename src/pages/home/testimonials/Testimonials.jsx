const testimonials = [
    {
      name: "Sofia Khan",
      role: "HR Executive at DigiCorp",
      feedback: "WorkNest completely transformed how we manage our employees. It’s intuitive, fast, and keeps everything organized.",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Ryan Thomas",
      role: "Senior Developer at CodeBase",
      feedback: "I love the workflow tracking feature. Being able to log hours and see payments clearly is a game-changer.",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Priya Mehra",
      role: "Digital Marketer at MarketGen",
      feedback: "It’s user-friendly and mobile responsive. I can update my work from anywhere, which is amazing!",
      image: "https://i.pravatar.cc/100?img=44",
    },
  ];
  
  export default function Testimonials() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Here's how WorkNest is helping teams streamline their employee management.
          </p>
  
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">“{t.feedback}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  