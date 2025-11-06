import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { portfolioConfig } from '../../config/portfolio';
import { useEffect, useState } from 'react';

export function Hero() {
  const { personal } = portfolioConfig;
  const [displayText, setDisplayText] = useState('');
  const fullText = personal.tagline;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-lg text-gray-600 dark:text-gray-400">Hello, I'm</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                {personal.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold">
                {personal.title}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 h-8">
                {displayText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {personal.about}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button href={personal.resumeUrl} download>
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" href={personal.social.github}>
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href={personal.social.linkedin}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={personal.social.email}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={personal.photo}
                alt={personal.name}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-8 border-white dark:border-gray-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
