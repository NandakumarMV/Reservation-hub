export const generateHandle = (str = "") => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, "") // remove special characters
        .replace(/\s+/g, "-");       // replace spaces with dashes
};
