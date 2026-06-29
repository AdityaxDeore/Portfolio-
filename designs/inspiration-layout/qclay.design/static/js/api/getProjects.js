const URL = 'projects/projects.json'

export const getProjects = async () => {
    try {
        const response = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Can’t access Projects response.", error);
    }
}