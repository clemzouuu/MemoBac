import axios from 'axios';

export {}; // Makes this file a module

const API_BASE_URL = 'http://localhost:8080';

// Création d'instance Axios avec configuration de base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercepteur pour ajouter le token JWT aux requêtes
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('[API REQUEST]', config.method?.toUpperCase(), config.url, config.data);
    return config;
});

// Intercepteur pour afficher les informations de la réponse
apiClient.interceptors.response.use(response => {
    console.log('[API RESPONSE]', response.config.url, response.status, response.data);
    return response;
});

// Ajouter dans les intercepteurs
apiClient.interceptors.response.use(response => {
    console.log('[API] Réponse structurée:', {
        status: response.status,
        data: response.data,
        headers: response.headers
    });
    return response;
}, error => {
    console.error('[API] Erreur détaillée:', {
        config: error.config,
        response: error.response
    });
    return Promise.reject(error);
});

export default apiClient;