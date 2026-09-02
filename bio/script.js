document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os ícones do Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Lógica do Accordion / FAQ Expansível ("Entenda mais sobre")
    const accordionTrigger = document.getElementById('btn-sobre');
    const accordionItem = document.getElementById('accordion-sobre');
    const accordionCollapse = document.getElementById('sobre-content');

    if (accordionTrigger && accordionItem && accordionCollapse) {
        accordionTrigger.addEventListener('click', () => {
            const isExpanded = accordionItem.classList.contains('active');

            if (isExpanded) {
                accordionItem.classList.remove('active');
                accordionTrigger.setAttribute('aria-expanded', 'false');
                accordionCollapse.style.maxHeight = null;
            } else {
                accordionItem.classList.add('active');
                accordionTrigger.setAttribute('aria-expanded', 'true');
                accordionCollapse.style.maxHeight = accordionCollapse.scrollHeight + 50 + "px";

                // Rolagem suave para manter o conteúdo visível na tela do celular
                setTimeout(() => {
                    accordionItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 250);
            }
        });
    }
});
