import { Quote } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { portfolioConfig } from '../../config/portfolio';

export function Testimonials() {
  const { testimonials } = portfolioConfig;

  return (
    <Section id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6" hover>
              <div className="flex flex-col h-full">
                <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />

                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow italic">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
