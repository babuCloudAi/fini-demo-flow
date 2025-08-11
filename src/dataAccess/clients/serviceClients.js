import {urls} from '@/config';
import {createApiClient} from './apiClient';

export const advancedSearchApiClient = createApiClient(urls.advancedSearch);

export const careerRecommendationsApiClient = createApiClient(
    urls.careerRecommendations
);
