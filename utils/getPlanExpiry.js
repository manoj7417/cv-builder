import dayjs from "dayjs";

const getExpiryMessage = (expiryDate) => {
    const today = dayjs();
    const daysRemaining = dayjs(expiryDate).diff(today, 'day');

    if (!dayjs(expiryDate).isValid()) return null;
    if (daysRemaining < 0) return 'Expired';
    if (daysRemaining === 0) return 'Expiring today';
    if (daysRemaining === 1) return 'Expiring tomorrow';
    return `Expiring in ${daysRemaining} days`;
};

export const getPlanExpiry = (plan, userdata) => {
    switch (plan) {
        case 'CVSTUDIO':
            return getExpiryMessage(userdata?.subscription?.expiryDate);
        case 'Trial14':
            return getExpiryMessage(userdata?.trial?.expiryDate);
        default:
            return null;
    }
};
