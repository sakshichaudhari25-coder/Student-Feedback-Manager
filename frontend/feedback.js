const feedbackList = document.getElementById("feedbackList");

async function getFeedback() {
    try {
        const response = await fetch("/feedback");

        if (!response.ok) {
            throw new Error("Failed to fetch feedback");
        }

        const data = await response.json();
        feedbackList.innerHTML = "";

        data.forEach(feedback => {
            const card = document.createElement("div");
            card.className = "feedback-card";

            const name = document.createElement("h3");
            name.textContent = feedback.name;

            const rating = document.createElement("div");
            rating.className = "rating";
            rating.textContent = `⭐ Rating: ${feedback.rate}`;

            const comment = document.createElement("div");
            comment.className = "comment";
            comment.textContent = feedback.comment;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", async () => {
                const confirmDelete = confirm(
                    "Are you sure you want to delete this feedback?"
                );

                if (!confirmDelete) return;

                try {
                    const deleteResponse = await fetch(
                        `/feedback/${feedback._id}`,
                        {
                            method: "DELETE"
                        }
                    );

                    const result = await deleteResponse.json();

                    if (!deleteResponse.ok) {
                        throw new Error(result.message || "Delete failed");
                    }

                    
                    getFeedback();

                } catch (error) {
                    console.log("Delete error:", error);
                    alert("Failed to delete feedback.");
                }
            });

            card.appendChild(name);
            card.appendChild(rating);
            card.appendChild(comment);
            card.appendChild(deleteBtn);

            feedbackList.appendChild(card);
        });

    } catch (error) {
        console.log("Error:", error);
        feedbackList.innerHTML = "<p>Failed to load feedback.</p>";
    }
}

getFeedback();