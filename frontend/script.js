
const form = document.getElementById("feedbackForm");
const btn = document.getElementById("btn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rate = Number(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value.trim();

    try {
        btn.disabled = true;

        const response = await fetch("/submit-feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, rate, comment })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to submit feedback");
        }

        alert(data.message);
        form.reset();

    } catch (error) {
        console.error("Submission error:", error);
        alert(error.message || "Something went wrong.");

    } finally {
        btn.disabled = false;
    }
});
