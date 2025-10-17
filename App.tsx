import React, { useState } from 'react';
import { SectionId, SECTIONS } from './types';
import Sidebar from './components/Sidebar';
import ContentRenderer from './components/ContentRenderer';
import { MenuIcon, XIcon } from './components/Icons';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Aim);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSectionChange = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-primary dark:bg-gray-800 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <Sidebar
          sections={SECTIONS}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden sticky top-0 z-20">
          <h1 className="text-xl font-bold text-primary dark:text-accent">HMAC Explorer</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300">
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <ContentRenderer activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default App;
