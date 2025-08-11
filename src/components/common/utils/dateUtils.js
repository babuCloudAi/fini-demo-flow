import {DATE_FORMAT, EST_TIME_ZONE} from '@/config/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a given date in UTC and converts it to the specified timezone and format.
 *
 * @param {string|Date} date - The date to format.
 * @param {string} [timezone=EST_TIME_ZONE] - The IANA timezone identifier (default is EST).
 * @param {string} [format=DATE_FORMAT.SHORT] - The format string to use.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (
    date,
    timezone = EST_TIME_ZONE,
    format = DATE_FORMAT.SHORT
) => {
    return dayjs.utc(date).tz(timezone).format(format);
};
