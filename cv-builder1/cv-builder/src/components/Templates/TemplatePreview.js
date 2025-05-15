import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ColorPicker from '../UI/ColorPicker';
import Button from '../UI/Button';

const TemplatePreview = ({ template, onClose }) => {
  const { t } = useTranslation();
  const [customization, setCustomization] = useState({
    primaryColor: template.defaultColors?.primary || '#0ea5e9',
    secondaryColor: template.defaultColors?.secondary || '#0369a1',
    fontSize: 'medium'
  });
  const [isPreviewing, setIsPreviewing] = useState(true);
  console.log('isPreviewing', isPreviewing);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {template.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{t('actions.close')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2">
              {/* Aperçu du CV */}
              <div
                className="w-full aspect-[1/1.414] bg-white shadow rounded"
                style={{
                  '--primary-color': customization.primaryColor,
                  '--secondary-color': customization.secondaryColor,
                  fontSize: customization.fontSize === 'small' ? '14px' : 
                           customization.fontSize === 'large' ? '18px' : '16px'
                }}
              >
                {/* Contenu du template */}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('templates.customization.title')}
                </h3>
                <div className="space-y-4">
                  <ColorPicker
                    label={t('templates.customization.primaryColor')}
                    color={customization.primaryColor}
                    onChange={(color) => setCustomization(prev => ({
                      ...prev,
                      primaryColor: color
                    }))}
                  />
                  <ColorPicker
                    label={t('templates.customization.secondaryColor')}
                    color={customization.secondaryColor}
                    onChange={(color) => setCustomization(prev => ({
                      ...prev,
                      secondaryColor: color
                    }))}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('templates.customization.fontSize')}
                    </label>
                    <select
                      className="input-field"
                      value={customization.fontSize}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        fontSize: e.target.value
                      }))}
                    >
                      <option value="small">{t('templates.customization.fontSizes.small')}</option>
                      <option value="medium">{t('templates.customization.fontSizes.medium')}</option>
                      <option value="large">{t('templates.customization.fontSizes.large')}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {/* Logique pour utiliser le template */}}
                >
                  {t('templates.actions.use')}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {/* Logique pour ajouter aux favoris */}}
                >
                  {t('templates.actions.favorite')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;