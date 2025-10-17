import React from 'react';
import type { Section } from '../types';
import { SectionId } from '../types';
import { CodeIcon } from './Icons';

interface SidebarProps {
  sections: Section[];
  activeSection: SectionId;
  onSectionChange: (sectionId: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, onSectionChange }) => {
  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex items-center justify-center h-20 border-b border-blue-800 dark:border-gray-700">
        <CodeIcon />
        <h1 className="ml-3 text-2xl font-bold tracking-wider">HMAC Project</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(section.id);
            }}
            className={`flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
              activeSection === section.id
                ? 'bg-accent text-white font-semibold shadow-md'
                : 'text-blue-100 hover:bg-secondary hover:text-white'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-800 dark:border-gray-700 text-center text-blue-200 text-sm">
        <p>&copy; 2025 CryptoClass</p>
      </div>
    </div>
  );
};

export default Sidebar;
