import { GITHUB_DESCRIPTION_DATE_REGEX } from "../constants";

/**
 * Searches a text string (like a GitHub Milestone description) for a specific 
 * "Start date: DD/MM/YYYY" pattern and extracts the date.
 * @param description The full milestone description text.
 * @returns The found date string in DD/MM/YYYY format, or null if not found.
 */
export const extractStartDate = (description: string | null | undefined): string | null => {
    if (!description) {
      return null;
    }
    // Regex Explanation:
    // /Start date:\s*(\d{2}\/\d{2}\/\d{4})/i
    // 1. Start date:  - Matches the literal phrase "Start date:"
    // 2. \s* - Matches zero or more whitespace characters (to allow spaces after the colon)
    // 3. (\d{2}\/\d{2}\/\d{4}) - Captures the date group (DD/MM/YYYY)
    // 4. /i          - Makes the search case-insensitive ("start date", "START DATE", etc. all work)
    // const dateRegex = /Start date:\s*(\d{2}\/\d{2}\/\d{4})/i;
    
    const match = description.match(GITHUB_DESCRIPTION_DATE_REGEX);

    if (match && match[1]) {
      // match[1] contains the content of the first capturing group (the date itself)
      const [day, month, year] = match[1].split('/');
      return `${year}-${month}-${day}`;
    }

    return null;
}
