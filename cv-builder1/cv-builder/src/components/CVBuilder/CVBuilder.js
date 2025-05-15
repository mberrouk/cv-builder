import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import ColorPicker from '../UI/ColorPicker';
import TemplatePreview from '../Templates/TemplatePreview';

const CVBuilder = ({ template }) => {

  const [isPreviewing, setIsPreviewing] = useState(false); 
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: []
  });

  const [customization, setCustomization] = useState({
    primaryColor: '#0ea5e9',
    secondaryColor: '#0369a1',
    fontSize: 'medium',
    fontFamily: 'Inter'
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updatePreview = (value) => {
    setIsPreviewing(value);
  }

  const colseModal = () => {
    setIsPreviewing(false);
  }

  const openModal = () => {
    setIsPreviewing(true);  
  }
  const addListItem = (section) => {
    const newItem = {
      id: Date.now(),
      title: '',
      organization: '',
      startDate: '',
      endDate: '',
      description: ''
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeListItem = (section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {/* Section informations personnelles */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('cv.sections.personal')}
          </h2>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('cv.fields.fullName')}
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.personal.fullName}
                onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('cv.fields.email')}
              </label>
              <input
                type="email"
                className="input-field"
                value={formData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
              />
            </div>
            {/* Autres champs personnels */}
          </div>
        </div>

        {/* Section personnalisation */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('cv.customization.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ColorPicker
              label={t('cv.customization.primaryColor')}
              color={customization.primaryColor}
              onChange={(color) => setCustomization(prev => ({
                ...prev,
                primaryColor: color
              }))}
            />
            <ColorPicker
              label={t('cv.customization.secondaryColor')}
              color={customization.secondaryColor}
              onChange={(color) => setCustomization(prev => ({
                ...prev,
                secondaryColor: color
              }))}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('cv.customization.fontSize')}
              </label>
              <select
                className="input-field"
                value={customization.fontSize}
                onChange={(e) => setCustomization(prev => ({
                  ...prev,
                  fontSize: e.target.value
                }))}
              >
                <option value="small">{t('cv.customization.fontSizes.small')}</option>
                <option value="medium">{t('cv.customization.fontSizes.medium')}</option>
                <option value="large">{t('cv.customization.fontSizes.large')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        {
          isPreviewing == true ? <TemplatePreview template onClose={colseModal} /> :
          <div className="p-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={openModal}>
              {t('cv.actions.preview')}
            </Button>
            <Button onClick={() => {}}>
              {t('cv.actions.save')}
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export default CVBuilder;