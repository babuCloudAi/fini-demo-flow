export const careerRecommendationsEndPoints = {
    getCareers: studentId => `career/${studentId}`,
    deleteCareer: (studentId, createdAt) => `career/${studentId}/${createdAt}`,
    saveCareer: studentId => `career/${studentId}`,
    saveAllCareers: studentId => `career/save-all/${studentId}`
};
