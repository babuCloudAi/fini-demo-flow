import {careerRecommendationsApiClient} from '@/dataAccess/clients';
import {careerRecommendationsEndPoints} from './endpoints';

export const careerRecommendationsService = {
    fetchCareers: studentId => {
        return careerRecommendationsApiClient.get(
            careerRecommendationsEndPoints.getCareers(studentId)
        );
    },
    saveCareer: (studentId, payload) => {
        return careerRecommendationsApiClient.post(
            careerRecommendationsEndPoints.saveCareer(studentId),
            payload
        );
    },

    saveAllCareers: (studentId, payload) => {
        return careerRecommendationsApiClient.post(
            careerRecommendationsEndPoints.saveAllCareers(studentId),
            payload
        );
    },
    deleteCareer: (studentId, createdAt) => {
        return careerRecommendationsApiClient.delete(
            careerRecommendationsEndPoints.deleteCareer(studentId, createdAt)
        );
    }
};
