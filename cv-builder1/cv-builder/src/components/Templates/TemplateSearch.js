import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTemplateService from '../../services/customTemplates';

const TemplateSearch = ({ onSelect }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const templates = CustomTemplateService.getFilteredTemplates(
    searchTerm,
    selectedCategory,
    sortBy
  );

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            className="input-field"
            placeholder={t('templates.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <select
            className="input-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">{t('templates.categories.all')}</option>
            <option value="professional">{t('templates.categories.professional')}</option>
            <option value="creative">{t('templates.categories.creative')}</option>
            <option value="simple">{t('templates.categories.simple')}</option>
            <option value="modern">{t('templates.categories.modern')}</option>
          </select>
        </div>
        <div className="sm:w-48">
          <select
            className="input-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">{t('templates.filters.recent')}</option>
            <option value="popular">{t('templates.filters.popular')}</option>
            <option value="rated">{t('templates.filters.rated')}</option>
          </select>
        </div>
      </div>

      {/* Grille de templates */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {template.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {template.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {template.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {t(`templates.categories.${category}`)}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => onSelect(template)}
                  className="btn-primary"
                >
                  {t('templates.actions.use')}
                </button>
                <button
                  onClick={() => CustomTemplateService.toggleFavorite(template.id)}
                  className={`p-2 rounded-full ${
                    template.isFavorite
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSearch;