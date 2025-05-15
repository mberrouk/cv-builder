import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CVBuilder from './components/CVBuilder/CVBuilder';
import TemplateSearch from './components/Templates/TemplateSearch';
import FavoriteTemplates from './components/Templates/FavoriteTemplates';
import TemplatePreview from './components/Templates/TemplatePreview';
import i18n from './i18n';
function App() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">{t('cv.title')}</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveView('builder')}
                  className={`${
                    activeView === 'builder'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {t('cv.sections.personal')}
                </button>
                <button
                  onClick={() => setActiveView('templates')}
                  className={`${
                    activeView === 'templates'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {t('templates.title')}
                </button>
                <button
                  onClick={() => setActiveView('favorites')}
                  className={`${
                    activeView === 'favorites'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {t('templates.categories.favorites')}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  const newLang = i18n.language === 'fr' ? 'en' : 'fr';
                  i18n.changeLanguage(newLang);
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {i18n.language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'builder' && (
          <CVBuilder template={selectedTemplate} />
        )}
        {activeView === 'templates' && (
          <TemplateSearch onSelect={setSelectedTemplate} />
        )}
        {activeView === 'favorites' && (
          <FavoriteTemplates onSelect={setSelectedTemplate} />
        )}
        {selectedTemplate && (
          <TemplatePreview
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;