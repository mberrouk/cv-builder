import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      cv: {
        title: 'CV Builder',
        sections: {
          personal: 'Personal Information',
          education: 'Education',
          experience: 'Professional Experience',
          skills: 'Skills',
          languages: 'Languages',
          fullName: 'Full Name'
        },
        actions: {
          save: 'Save',
          preview: 'Preview',
          export: 'Export PDF',
          share: 'Share'
        }
      },
      templates: {
        title: 'CV Templates',
        categories: {
          all: 'All Templates',
          professional: 'Professional',
          creative: 'Creative',
          simple: 'Simple',
          modern: 'Modern'
        },
        actions: {
          use: 'Use Template',
          favorite: 'Add to Favorites',
          share: 'Share Template'
        },
        filters: {
          sort: 'Sort by',
          recent: 'Most Recent',
          popular: 'Most Popular',
          rated: 'Highest Rated'
        }
      }
    }
  },
  fr: {
    translation: {
      cv: {
        title: 'Créateur de CV',
        sections: {
          personal: 'Informations Personnelles',
          education: 'Formation',
          experience: 'Expérience Professionnelle',
          skills: 'Compétences',
          languages: 'Langues',
          fullName: 'Nom Complet'
        },
        actions: {
          save: 'Enregistrer',
          preview: 'Aperçu',
          export: 'Exporter PDF',
          share: 'Partager'
        }
      },
      templates: {
        title: 'Modèles de CV',
        categories: {
          all: 'Tous les modèles',
          professional: 'Professionnel',
          creative: 'Créatif',
          simple: 'Simple',
          modern: 'Moderne'
        },
        actions: {
          use: 'Utiliser',
          favorite: 'Ajouter aux favoris',
          share: 'Partager'
        },
        filters: {
          sort: 'Trier par',
          recent: 'Plus récents',
          popular: 'Plus populaires',
          rated: 'Mieux notés'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;