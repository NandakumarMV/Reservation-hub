export const paginated_response = (page,
    size,
    total,
    payload) => {
    return {
        page: parseInt(page),
        page_size: parseInt(size),
        total_records: parseInt(total),
        total_pages: Math.ceil(parseInt(total) / parseInt(size)),
        payload,
    }
}
