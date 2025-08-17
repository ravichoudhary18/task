const TaskPagination = async (axiosPrivate, url) => {
    try {
        const res = await axiosPrivate.get(url);
        if (res.status === 200) {
            return res;
        } else {
            throw new Error(`Unexpected status code: ${res.status}`);
        }
    } catch (err) {
        console.error("Error fetching user list:", err);
        throw err;
    }
};

export {TaskPagination}