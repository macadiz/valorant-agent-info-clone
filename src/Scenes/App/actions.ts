export const calculateGradient = (gradientColors: string[]) => {
    const hexColors = gradientColors.map((color) => `#${color}`);
    return hexColors.join(',');
}