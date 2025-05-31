export const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short', day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}; export const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon'; return 'Good evening';
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text; return text.slice(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB']; 
    const i = Math.floor(Math.log(bytes) / Math.log(k)); 
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};