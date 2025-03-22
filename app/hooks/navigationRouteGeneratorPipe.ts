/**
 * Parses the provided string by replacing spaces with underlines and lowercasing it
 * @param og
 */
const ReParseNavigationRoute = (og: string): string => {
    return `/${og.replace(" ", "_").trim().toLowerCase()}`;
};

export default ReParseNavigationRoute;