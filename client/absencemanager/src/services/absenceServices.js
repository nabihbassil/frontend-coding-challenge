export const getAbsencesBackend = async () => {
    const response = await fetch("http://localhost:5555/absences", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return await response.json();
}