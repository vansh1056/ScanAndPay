import React from 'react';
import { Github, Linkedin, Mail, Users } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Vansh Singh',
      role: 'Front-end Developer',
      photo: 'Images/member1.jpg',
      bio: 'One of the developer of Public Printer, driving innovation and strategic vision.',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'Vanshofficial26h6@gmail.com'
      }
    },
    {
      id: 2,
      name: 'Shiv Panwar',
      role: 'Backend Developer',
      photo: 'Images/member2.jpeg',
      bio: 'backend engineer with a passion for scalable web applications.',
      skills: ['Figma', 'Adobe CC', 'User Research', 'Prototyping'],
      social: {
        linkedin: 'https://linkedin.com',
        email: 'sarah@scanpay.com'
      }
    },
    {
      id: 3,
      name: 'Yaduvenrda Chaudhary',
      role: 'Documentation Specialist',
      photo: 'Images/member4.jpeg',
      bio: 'Documentation specialist ensuring clarity and usability in all user guides.',
      skills: ['Python', 'Docker', 'Kubernetes', 'MySQL'],
      social: {
        github: 'https://github.com',
        email: 'mike@scanpay.com'
      }
    },
    {
      id: 4,
      name: 'Sharandeep Maherwal',
      role: 'Database Manager',
      photo: 'Images/member3.jpeg',
      bio: 'Database manager optimizing data integrity and performance.',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'Market Research'],
      social: {
        linkedin: 'https://linkedin.com',
        email: 'emily@scanpay.com'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">Our Team</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the talented individuals behind Public Printer, dedicated to revolutionizing 
          document printing with innovative technology and exceptional user experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for innovation 
          and excellence. If you'd like to be part of our growing team, we'd love to hear from you.
        </p>
        <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200">
          View Open Positions
        </button>
      </div>
    </div>
  );
};

export default TeamPage;