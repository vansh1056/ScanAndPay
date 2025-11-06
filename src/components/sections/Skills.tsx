import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { portfolioConfig } from '../../config/portfolio';

interface SkillItemProps {
  name: string;
  level: number;
}

function SkillItem({ name, level }: SkillItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-blue-600 dark:text-blue-400 text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: { name: string; level: number }[];
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <Card className="p-6" hover>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
        {title}
      </h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillItem key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </Card>
  );
}

export function Skills() {
  const { skills } = portfolioConfig;

  return (
    <Section id="skills" className="bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCategory title="Frontend Development" skills={skills.frontend} />
          <SkillCategory title="Backend Development" skills={skills.backend} />
          <SkillCategory title="Tools & Platforms" skills={skills.tools} />
          <SkillCategory title="Other Technologies" skills={skills.other} />
        </div>
      </div>
    </Section>
  );
}
