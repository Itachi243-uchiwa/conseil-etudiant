import React from 'react';

interface ServiceContentProps {
    content: string;
}

const ServiceContent: React.FC<ServiceContentProps> = ({ content }) => {
    // Fonction pour formater le texte brut
    const formatContent = (text: string) => {
        // Nettoyer le texte
        let formattedText = text.trim();

        // Séparer par double saut de ligne pour créer des paragraphes
        const paragraphs = formattedText.split(/\n\s*\n/);

        return paragraphs.map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim();

            if (!trimmedParagraph) return null;

            // Détecter les titres (lignes qui se terminent par : ou qui sont en majuscules)
            if (isTitle(trimmedParagraph)) {
                return (
                    <h3 key={index} className="text-xl font-semibold mb-3 mt-6 first:mt-0 gold-text">
                        {trimmedParagraph.replace(/:\s*$/, '')}
                    </h3>
                );
            }

            // Détecter les listes (lignes qui commencent par des numéros, tirets, ou puces)
            if (isList(trimmedParagraph)) {
                const listItems = trimmedParagraph.split(/\n/).filter(item => item.trim());
                return (
                    <ul key={index} className="list-disc list-inside mb-4 space-y-2">
                        {listItems.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                                {cleanListItem(item)}
                            </li>
                        ))}
                    </ul>
                );
            }

            // Paragraphe normal
            return (
                <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                    {formatInlineText(trimmedParagraph)}
                </p>
            );
        }).filter(Boolean);
    };

    // Détecter si c'est un titre
    const isTitle = (text: string) => {
        return (
            text.endsWith(':') ||
            text.match(/^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸ\s]+$/) ||
            text.match(/^\d+\.\s*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸ]/) ||
            text.startsWith('##') ||
            text.startsWith('**') && text.endsWith('**')
        );
    };

    // Détecter si c'est une liste
    const isList = (text: string) => {
        const lines = text.split('\n');
        return lines.some(line =>
            line.match(/^\s*[-•*]\s/) ||
            line.match(/^\s*\d+\.\s/) ||
            line.match(/^\s*[a-zA-Z]\)\s/)
        );
    };

    // Nettoyer les éléments de liste
    const cleanListItem = (item: string) => {
        return item.replace(/^\s*[-•*]\s*/, '')
            .replace(/^\s*\d+\.\s*/, '')
            .replace(/^\s*[a-zA-Z]\)\s*/, '')
            .trim();
    };

    // Formater le texte inline (gras, italique, etc.)
    const formatInlineText = (text: string) => {
        // Remplacer **texte** par du gras
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Remplacer *texte* par de l'italique
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Remplacer les URLs par des liens
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');

        // Remplacer les emails par des liens
        text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="text-primary hover:underline">$1</a>');

        return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    return (
        <div className="prose prose-gray max-w-none">
            {formatContent(content)}
        </div>
    );
};

export default ServiceContent;