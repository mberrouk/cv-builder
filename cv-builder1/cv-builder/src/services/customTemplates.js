import { nanoid } from 'nanoid';

class CustomTemplateService {
  constructor() {
    this.templates = new Map();
    this.ratings = new Map();
    this.favorites = new Set();
    this.versions = new Map();

    this.loadTemplates();
    this.loadRatings();
    this.loadFavorites();
    this.loadVersions();
  }

  // Clés de stockage
  storageKeys = {
    templates: 'cv_templates',
    ratings: 'cv_ratings',
    favorites: 'cv_favorites',
    versions: 'cv_versions'
  };

  // Chargement des données
  loadRatings() {
    try {
      const stored = localStorage.getItem(this.storageKeys.ratings);
      if (stored) {
        this.ratings = new Map(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des évaluations:', error);
    }
  }

  saveRatings() {
    try {
      localStorage.setItem(
        this.storageKeys.ratings,
        JSON.stringify(Array.from(this.ratings.entries()))
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des évaluations:', error);
    }
  }

  loadVersions() {
    try {
      const stored = localStorage.getItem(this.storageKeys.versions);
      if (stored) {
        this.versions = new Map(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des versions:', error);
    }
  }

  saveVersions() {
    try {
      localStorage.setItem(
        this.storageKeys.versions,
        JSON.stringify(Array.from(this.versions.entries()))
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des versions:', error);
    }
  }

  // Gestion des templates
  loadTemplates() {
    try {
      const stored = localStorage.getItem(this.storageKeys.templates);
      if (stored) {
        const templates = JSON.parse(stored);
        this.templates = new Map(Object.entries(templates));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error);
    }
  }

  saveTemplates() {
    try {
      const templates = Object.fromEntries(this.templates);
      localStorage.setItem(this.storageKeys.templates, JSON.stringify(templates));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des templates:', error);
    }
  }

  createTemplate(data) {
    const id = nanoid();
    const template = {
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      averageRating: 0,
      totalRatings: 0,
      ...data
    };
    this.templates.set(id, template);
    this.saveTemplates();
    return template;
  }

  updateTemplate(id, data) {
    const template = this.templates.get(id);
    if (!template) throw new Error('Template non trouvé');

    const updatedTemplate = {
      ...template,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.templates.set(id, updatedTemplate);
    this.saveTemplates();
    return updatedTemplate;
  }

  // Gestion des favoris
  loadFavorites() {
    try {
      const stored = localStorage.getItem(this.storageKeys.favorites);
      if (stored) {
        this.favorites = new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(
        this.storageKeys.favorites,
        JSON.stringify(Array.from(this.favorites))
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  }

  toggleFavorite(templateId) {
    if (this.favorites.has(templateId)) {
      this.favorites.delete(templateId);
    } else {
      this.favorites.add(templateId);
    }
    this.saveFavorites();
    return this.favorites.has(templateId);
  }

  // Recherche et filtrage
  getFilteredTemplates(searchTerm = '', category = 'all', sortBy = 'recent') {
    let templates = Array.from(this.templates.values());

    // Si aucun template n'existe, créer quelques templates par défaut
    if (templates.length === 0) {
      this.createDefaultTemplates();
      templates = Array.from(this.templates.values());
    }

    // Filtrage par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      templates = templates.filter(template => 
        template.name.toLowerCase().includes(term) ||
        (template.description && template.description.toLowerCase().includes(term))
      );
    }

    // Filtrage par catégorie
    if (category !== 'all') {
      templates = templates.filter(template => 
        template.categories && template.categories.includes(category)
      );
    }

    // Tri
    switch (sortBy) {
      case 'recent':
        templates.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case 'popular':
        templates.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
      case 'rated':
        templates.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      default:
        break;
    }

    return templates;
  }

  // Création de templates par défaut
  createDefaultTemplates() {
    const defaultTemplates = [
      {
        name: 'Template Professionnel',
        description: 'Un design élégant et professionnel',
        categories: ['professional', 'simple'],
        defaultColors: {
          primary: '#2563eb',
          secondary: '#1e40af'
        }
      },
      {
        name: 'Template Créatif',
        description: 'Pour les profils créatifs et innovants',
        categories: ['creative', 'modern'],
        defaultColors: {
          primary: '#ec4899',
          secondary: '#be185d'
        }
      },
      {
        name: 'Template Minimaliste',
        description: 'Simple et efficace',
        categories: ['simple', 'modern'],
        defaultColors: {
          primary: '#6366f1',
          secondary: '#4f46e5'
        }
      }
    ];

    defaultTemplates.forEach(template => this.createTemplate(template));
  }
}

export default new CustomTemplateService();