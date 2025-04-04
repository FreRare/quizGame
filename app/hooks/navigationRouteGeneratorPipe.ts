/**
 * Parses the provided string by replacing spaces with underlines and lowercasing it
 * @param og
 */
export const ReParseNavigationRoute = (og: string): string => {
    return `/${og.replace(" ", "_").trim().toLowerCase()}`;
};