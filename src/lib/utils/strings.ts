export const humanize = (text: string) => {
    // Insert a space before each capital letter
    const spacedName = text.replace(/([A-Z])/g, ' $1').trim();    
    // Capitalize the first letter of each word
    const humanReadableName = spacedName.replace(/\b\w/g, char => char.toUpperCase());
    
    return humanReadableName;
  }