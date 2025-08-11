import {EST_TIME_ZONE, ALERT_STATUS, DATE_FORMAT} from '@/config/constants';
import {formatDate} from '../common';

/**
 * Counts the number of alerts that do not have a status (i.e., considered unread).
 *
 * @param {Array<Object>} [alertsList=[]] - The list of alert objects to evaluate.
 * @returns {number} - The count of unread alerts (alerts with no `status` field).
 */
export function countUnreadAlerts(alertsList = []) {
    return alertsList?.filter(alert => !alert.status).length;
}

/**
 * Mapping of internal alert status keys to user-friendly display labels.
 * @type {Object<string, string>}
 */
export const filterLabels = {
    unread: 'Unread',
    nudged: 'Nudged',
    kudosGiven: 'Kudos Given',
    acknowledged: 'Acknowledged',
    dismissed: 'Dismissed'
};

/**
 * Returns the user-friendly display label for a given alert status key.
 *
 * @param {string} status - The internal status key (e.g., 'acknowledged', 'dismissed').
 * @returns {string} - The corresponding display label, or the key itself if no label is found.
 */
export const getFilterLabel = status => filterLabels[status] || status;

/**
 * Returns the action text to display for a given alert based on its status
 * and the `actionPerformedOn` date.
 *
 * @param {Object} alert - The alert object.
 * @param {string} alert.status - The status of the alert (e.g., 'acknowledged').
 * @param {string|Date} alert.actionPerformedOn - The timestamp of the action.
 * @returns {string} - A formatted action message like "Acknowledged on: May 10, 2025".
 */

export function getAlertActionText(alert) {
    if (!alert?.actionPerformedOn) return '';

    let actionPrefix = '';

    // Determine the appropriate prefix based on the alert status
    switch (alert.status) {
        case ALERT_STATUS.KUDOS_GIVEN:
            actionPrefix = 'Kudos sent on: ';
            break;
        case ALERT_STATUS.ACKNOWLEDGED:
            actionPrefix = 'Acknowledged on: ';
            break;
        case ALERT_STATUS.DISMISSED:
            actionPrefix = 'Dismissed on: ';
            break;
        case ALERT_STATUS.NUDGED:
            actionPrefix = 'Nudged on: ';
            break;
        default:
            break;
    }

    // Format the actionPerformedOn date using UTC and a timezone-aware format

    const formattedDate = formatDate(
        alert.actionPerformedOn,
        EST_TIME_ZONE,
        DATE_FORMAT.LONG
    );
    return `${actionPrefix}${formattedDate}`;
}
