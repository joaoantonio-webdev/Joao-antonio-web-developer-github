// ==========================================
// ELEMENTOS PRINCIPAIS
// ==========================================

const header =
    document.querySelector("header");


const menuLinks =
    document.querySelectorAll(
        'nav a[href^="#"]'
    );


const sections =
    document.querySelectorAll(
        "main section"
    );


// ==========================================
// NAVEGAÇÃO SUAVE
// ==========================================

menuLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const sectionId =
                this.getAttribute("href");


            const section =
                document.querySelector(
                    sectionId
                );


            if (!section) {
                return;
            }


            const headerHeight =
                header.offsetHeight;


            const sectionPosition =
                section
                    .getBoundingClientRect()
                    .top
                +
                window.scrollY
                -
                headerHeight
                -
                15;


            window.scrollTo({

                top:
                    sectionPosition,

                behavior:
                    "smooth"

            });


            history.pushState(
                null,
                "",
                sectionId
            );


            atualizarMenuAtivo(
                sectionId
            );

        }

    );

});


// ==========================================
// MENU ATIVO
// ==========================================

function atualizarMenuAtivo(
    sectionId
) {

    menuLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                )
                ===
                sectionId
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


// ==========================================
// IDENTIFICA A SEÇÃO DURANTE O SCROLL
// ==========================================

window.addEventListener(
    "scroll",
    () => {

        const headerHeight =
            header.offsetHeight;


        let currentSection =
            "#inicio";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop
                    -
                    headerHeight
                    -
                    120;


                if (
                    window.scrollY
                    >=
                    sectionTop
                ) {

                    currentSection =
                        "#"
                        +
                        section.id;

                }

            }
        );


        atualizarMenuAtivo(
            currentSection
        );

    }
);


// ==========================================
// CORRIGE #contato, #servicos ETC.
// AO ABRIR O SITE
// ==========================================

window.addEventListener(
    "load",
    () => {

        const hash =
            window.location.hash;


        if (!hash) {
            return;
        }


        const section =
            document.querySelector(
                hash
            );


        if (!section) {
            return;
        }


        setTimeout(
            () => {

                const headerHeight =
                    header.offsetHeight;


                const sectionPosition =
                    section
                        .getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    15;


                window.scrollTo({

                    top:
                        sectionPosition,

                    behavior:
                        "smooth"

                });


                atualizarMenuAtivo(
                    hash
                );

            },

            200
        );

    }
);


// ==========================================
// FORMULÁRIO
// ==========================================

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );


const feedbackStatus =
    document.getElementById(
        "feedbackStatus"
    );


if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        sendFeedback
    );

}


// ==========================================
// ENVIO DO FORMULÁRIO
// ==========================================

async function sendFeedback(
    event
) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "userName"
            )
            .value
            .trim();


    const message =
        document
            .getElementById(
                "userMessage"
            )
            .value
            .trim();


    if (
        !name
        ||
        !message
    ) {

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

        /*
        IMPORTANTE:

        O webhook do Discord
        NÃO deve ficar aqui.

        O navegador envia
        para um backend seguro.
        */

        const response =
            await fetch(
                "/api/feedback",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            name:
                                name,

                            message:
                                message

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Erro ao enviar mensagem."
            );

        }


        showStatus(
            "✅ Mensagem enviada com sucesso!",
            "green"
        );


        feedbackForm.reset();

    }

    catch (error) {

        console.error(
            error
        );


        showStatus(
            "❌ Não foi possível enviar a mensagem.",
            "red"
        );

    }

}


// ==========================================
// MENSAGEM DE STATUS
// ==========================================

function showStatus(
    message,
    color
) {

    if (!feedbackStatus) {
        return;
    }


    feedbackStatus.textContent =
        message;


    feedbackStatus.style.color =
        color;

}
