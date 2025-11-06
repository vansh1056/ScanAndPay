export const portfolioConfig = {
  personal: {
    name: "Vansh Singh",
    title: "Aspiring Full-Stack Developer",
    tagline: "Passionate about building digital solutions",
    email: "vanshsingh@example.com",
    phone: "+91 XXXXXXXXXX",
    location: "India",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    about: "I'm a B-Tech Computer Science student at KIET Group of Institutions, passionate about creating innovative web solutions. With a strong foundation in full-stack development and a keen interest in modern web technologies, I'm constantly learning and building projects that solve real-world problems.",
    resumeUrl: "#resume",
    social: {
      github: "https://github.com/vanshsingh",
      linkedin: "https://linkedin.com/in/vanshsingh",
      email: "mailto:vanshsingh@example.com"
    }
  },

  skills: {
    frontend: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 90 }
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 }
    ],
    tools: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Power BI", level: 70 }
    ],
    other: [
      { name: "Azure", level: 65 },
      { name: "SQL", level: 75 },
      { name: "C++", level: 80 },
      { name: "Python", level: 75 }
    ]
  },

  projects: [
    {
      id: 1,
      title: "Scan and Pay",
      description: "QR-based printing system for instant self-service printing. Streamlines the printing process with secure payment integration.",
      image: "https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "QR Code", "Payment Integration"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Weather App",
      description: "Displays real-time weather and wind speed for any city using weather API integration. Clean UI with dynamic backgrounds.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["JavaScript", "API", "HTML", "CSS"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Snake Game",
      description: "Classic console-based snake game built with C++. Features score tracking and increasing difficulty levels.",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["C++", "Game Development", "Console"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 4,
      title: "Zomato Landing Page",
      description: "Responsive restaurant page clone using HTML and CSS. Pixel-perfect design with modern UI/UX principles.",
      image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["HTML", "CSS", "Responsive Design"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 5,
      title: "Personal Webpage",
      description: "Built during internship, showcasing learning and growth. Features project gallery and skill showcase.",
      image: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["HTML", "CSS", "JavaScript"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ],

  education: [
    {
      id: 1,
      institution: "KIET Group of Institutions",
      degree: "B-Tech Computer Science Engineering",
      duration: "2022 - 2026",
      description: "Focused on software development, algorithms, and modern web technologies."
    }
  ],

  experience: [
    {
      id: 1,
      role: "Frontend Developer Intern",
      company: "Tech Company",
      duration: "2024",
      description: "Developed a weather website project, implementing responsive design and API integration. Gained hands-on experience with modern frontend frameworks."
    }
  ],

  certifications: [
    {
      id: 1,
      title: "Microsoft Learn Student Ambassador",
      issuer: "Microsoft",
      year: "2024"
    },
    {
      id: 2,
      title: "AWS Community Builder",
      issuer: "Amazon Web Services",
      year: "2024"
    },
    {
      id: 3,
      title: "Various LinkedIn Learning Courses",
      issuer: "LinkedIn Learning",
      year: "2023-2024"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Developer",
      company: "Tech Corp",
      message: "Vansh is a dedicated learner with great problem-solving skills. His passion for development is evident in every project he undertakes.",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Project Manager",
      company: "Digital Solutions",
      message: "Working with Vansh was a pleasure. He delivers quality work on time and is always eager to learn new technologies.",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Tech Lead",
      company: "Innovative Labs",
      message: "Vansh's ability to quickly adapt to new frameworks and his attention to detail make him a valuable team member.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]
};
