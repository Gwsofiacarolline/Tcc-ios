document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os elementos de modal
    const allModals = document.querySelectorAll('.modal');

    allModals.forEach(modal => {
        // Monitora o evento de abertura do modal (depois que a transição termina)
        modal.addEventListener('shown.bs.modal', function () {
            // Encontra a imagem principal (grande) e as miniaturas dentro deste modal
            const mainImage = modal.querySelector('img[id^="main-product-image-"]');
            const thumbnails = modal.querySelectorAll('.thumbnail');

            if (mainImage && thumbnails.length > 0) {

                // Configura o clique em cada miniatura
                thumbnails.forEach(thumbnail => {

                    // Cria a função de clique que troca a imagem
                    const clickHandler = function () {
                        // 1. Remove a classe 'active' de todas as miniaturas
                        thumbnails.forEach(t => t.classList.remove('active'));
                        // 2. Adiciona 'active' à miniatura clicada
                        this.classList.add('active');
                        // 3. Atualiza a imagem principal com o caminho do data-full-src
                        mainImage.src = this.dataset.fullSrc;
                    };

                    // Garante que o evento seja adicionado apenas uma vez, limpando se já existir
                    if (thumbnail.clickHandler) {
                        thumbnail.removeEventListener('click', thumbnail.clickHandler);
                    }
                    thumbnail.clickHandler = clickHandler; // Armazena a função no elemento
                    thumbnail.addEventListener('click', thumbnail.clickHandler);
                });

                // Garante que a imagem principal correta (a primeira) seja carregada ao abrir o modal
                if (thumbnails[0]) {
                    // Simula o clique na primeira miniatura para iniciar a galeria
                    thumbnails[0].click();
                }
            }
        });

        // Monitora o evento de fechamento do modal para 'limpar' e resetar a galeria
        modal.addEventListener('hidden.bs.modal', function () {
            const thumbnails = modal.querySelectorAll('.thumbnail');

            if (thumbnails.length > 0) {
                // Remove a classe 'active' de todos ao fechar
                thumbnails.forEach(t => t.classList.remove('active'));
                // Adiciona a classe 'active' apenas na primeira, preparando para a próxima abertura
                if (thumbnails[0]) {
                    thumbnails[0].classList.add('active');
                }
            }
        });
    });
});