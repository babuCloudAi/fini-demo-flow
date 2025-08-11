import {ALERT_STATUS, ALERT_TYPE} from '@/config/constants';

export const getNoResultMessage = (status, type, alertsList = []) => {
    const isEmptyList = alertsList.length === 0;

    if (isEmptyList) {
        if (type === ALERT_TYPE.ALERT) {
            return {
                title: 'No Alerts Yet',
                description: 'There are no alerts at the moment.'
            };
        } else {
            return {
                title: 'No Accomplishments Yet',
                description: 'There are no accomplishments at the moment.'
            };
        }
    }

    switch (status) {
        case ALERT_STATUS.UNREAD:
            if (type === ALERT_TYPE.ALERT) {
                return {
                    title: 'No New Alerts to Review',
                    description:
                        'There are no new unread alerts at the moment. New updates will appear here.'
                };
            } else {
                return {
                    title: 'No New Accomplishments to Review',
                    description:
                        'There are no new unread accomplishments at the moment. New updates will appear here.'
                };
            }

        case ALERT_STATUS.NUDGED:
            return {
                title: 'No Nudged Alerts',
                description:
                    'No nudges have been sent. Student reminders and prompts will appear here.'
            };

        case ALERT_STATUS.KUDOS_GIVEN:
            return {
                title: 'No Kudos Sent Yet',
                description:
                    'Recognitions and kudos sent to the student will appear here.'
            };

        case ALERT_STATUS.ACKNOWLEDGED:
            if (type === ALERT_TYPE.ALERT) {
                return {
                    title: 'No Acknowledged Alerts',
                    description: 'Alerts acknowledged will appear here.'
                };
            } else {
                return {
                    title: 'No Acknowledged Accomplishments',
                    description:
                        'Accomplishments acknowledged will appear here.'
                };
            }

        case ALERT_STATUS.DISMISSED:
            if (type === ALERT_TYPE.ALERT) {
                return {
                    title: 'No Dismissed Alerts',
                    description: 'Alerts dismissed will appear here.'
                };
            } else {
                return {
                    title: 'No Dismissed Accomplishments',
                    description: 'Accomplishments dismissed will appear here.'
                };
            }

        default:
            return {};
    }
};
