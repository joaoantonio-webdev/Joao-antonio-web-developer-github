const feedbackForm =
    document.getElementById("feedbackForm");

const feedbackStatus =
    document.getElementById("feedbackStatus");


feedbackForm.addEventListener(
    "submit",
    sendFeedback
);


async function sendFeedback(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("userName")
            .value
            .trim();


    const message =
        document
            .getElementById("userMessage")
            .value
            .trim();


    if (!name || !message) {

        showStatus(
            "Preencha todos os campos.",
            "red"
        );

        return;
    }


    showStatus(
        "Enviando mensagem...",
        "#333"
    );


    try {

        const response =
            await fetch(
                "/api/feedback",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        message
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Erro ao enviar feedback"
            );
        }


        showStatus(
            "✅ Mensagem enviada com sucesso!",
            "green"
        );


        feedbackForm.reset();

    }

    catch (error) {

        console.error(error);


        showStatus(
            "❌ Não foi possível enviar a mensagem.",
            "red"
        );

    }

}


function showStatus(
    message,
    color
) {

    feedbackStatus.textContent =
        message;

    feedbackStatus.style.color =
        color;
}
