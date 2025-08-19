'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Check, XCircle } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà donné son consentement
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Afficher la bannière après un petit délai
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
    };

    const termsContent = (
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
                Bienvenue sur le site web du Conseil Étudiant HE2B. En accédant à ce site,
                vous acceptez de vous conformer aux présentes conditions d'utilisation.
            </p>

            <h3>1. Utilisation du site</h3>
            <p>
                Le contenu de ce site est fourni à titre informatif uniquement. Le Conseil
                Étudiant HE2B se réserve le droit de modifier, supprimer ou mettre à jour
                tout contenu du site sans préavis.
            </p>
            <p>
                Vous vous engagez à utiliser ce site conformément aux lois et réglementations
                en vigueur et à ne pas l'utiliser d'une manière qui pourrait endommager,
                désactiver, surcharger ou altérer le site.
            </p>

            <h3>2. Propriété intellectuelle</h3>
            <p>
                Tous les contenus présents sur ce site, y compris, mais sans s'y limiter,
                les textes, graphiques, logos, icônes, images, clips audio, téléchargements
                numériques et compilations de données, sont la propriété du Conseil Étudiant
                HE2B ou de ses fournisseurs de contenu et sont protégés par les lois belges
                et internationales sur le droit d'auteur.
            </p>

            <h3>3. Liens vers d'autres sites</h3>
            <p>
                Ce site peut contenir des liens vers des sites web tiers. Ces liens sont
                fournis uniquement pour votre commodité. Le Conseil Étudiant HE2B n'a aucun
                contrôle sur le contenu de ces sites et n'assume aucune responsabilité
                quant à leur contenu ou à leur utilisation.
            </p>

            <h3>4. Limitation de responsabilité</h3>
            <p>
                Le Conseil Étudiant HE2B s'efforce de maintenir les informations de ce site
                à jour et exactes. Cependant, nous ne garantissons pas l'exactitude,
                l'exhaustivité ou la pertinence des informations fournies sur ce site.
            </p>

            <h3>5. Protection des données</h3>
            <p>
                La collecte et le traitement des données personnelles sur ce site sont régis
                par notre politique de confidentialité.
            </p>

            <h3>6. Contact</h3>
            <p>
                Si vous avez des questions concernant ces conditions d'utilisation,
                veuillez nous contacter à l'adresse email suivante : info@cehe2b.be
            </p>
        </div>
    );

    if (!isVisible) return null;

    return (
        <>
            {/* Bannière de consentement */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95
                       backdrop-blur-md dark:bg-gray-900/95
                       border-t border-gray-200 dark:border-gray-700
                       shadow-2xl"
                    >
                        <div className="container mx-auto max-w-6xl">
                            <div className="flex flex-col lg:flex-row items-start
                              lg:items-center justify-between gap-4">
                                {/* Texte + icône */}
                                <div className="flex-1">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r
                                    from-[#3F3290] to-[#8b5cf6]
                                    dark:from-[#bf953f] dark:to-[#fcf6ba]
                                    rounded-full flex items-center justify-center
                                    text-white dark:text-black text-sm font-bold
                                    flex-shrink-0 mt-1">
                                            🍪
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                Conditions d'utilisation
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                En continuant à utiliser notre site, vous acceptez nos
                                                conditions d'utilisation et notre politique de confidentialité.
                                                Nous utilisons des cookies pour améliorer votre expérience.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons */}
                                <div className="flex flex-col sm:flex-row items-stretch
                                sm:items-center gap-3 w-full lg:w-auto">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="flex items-center justify-center space-x-2
                               px-4 py-2 text-sm font-medium
                               text-[#3F3290] dark:text-[#bf953f]
                               bg-gray-100 dark:bg-gray-800
                               hover:bg-gray-200 dark:hover:bg-gray-700
                               rounded-lg transition-colors duration-200"
                                    >
                                        <FileText size={16} />
                                        <span>En savoir plus</span>
                                    </button>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleReject}
                                            className="flex items-center justify-center space-x-2
                                 px-4 py-2 text-sm font-medium
                                 text-gray-600 dark:text-gray-300
                                 bg-gray-200 dark:bg-gray-700
                                 hover:bg-gray-300 dark:hover:bg-gray-600
                                 rounded-lg transition-colors duration-200"
                                        >
                                            <XCircle size={16} />
                                            <span>Refuser</span>
                                        </button>

                                        <button
                                            onClick={handleAccept}
                                            className="flex items-center justify-center space-x-2
                                 px-6 py-2 text-sm font-medium
                                 text-white dark:text-black
                                 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6]
                                 dark:from-[#bf953f] dark:to-[#fcf6ba]
                                 hover:from-[#2D2470] hover:to-[#7c3aed]
                                 dark:hover:from-[#aa771c] dark:hover:to-[#e6d55a]
                                 rounded-lg transition-all duration-200
                                 transform hover:scale-105 shadow-lg"
                                        >
                                            <Check size={16} />
                                            <span>Accepter</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal avec les conditions complètes */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center
                       p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="bg-white/95 backdrop-blur-md dark:bg-gray-900/95
                         dark:backdrop-blur-md rounded-2xl shadow-2xl
                         max-w-4xl w-full max-h-[90vh] overflow-hidden
                         border border-gray-200 dark:border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header du modal */}
                            <div className="flex items-center justify-between p-6
                              border-b border-gray-200 dark:border-gray-700
                              bg-gradient-to-r from-[#3F3290]/5 to-[#8b5cf6]/5
                              dark:from-[#bf953f]/10 dark:to-[#fcf6ba]/10"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r
                                  from-[#3F3290] to-[#8b5cf6]
                                  dark:from-[#bf953f] dark:to-[#fcf6ba]
                                  rounded-full flex items-center justify-center
                                  text-white dark:text-black">
                                        📋
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                            Conditions d'utilisation
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Conseil Étudiant HE2B
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600
                             dark:text-gray-500 dark:hover:text-gray-300
                             hover:bg-gray-100 dark:hover:bg-gray-800
                             rounded-full transition-colors duration-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Contenu scrollable */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20
                                rounded-lg border border-blue-200
                                dark:border-blue-500/30">
                                    <p className="text-sm text-blue-800 dark:text-blue-300">
                                        <strong>Dernière mise à jour :</strong> 28 mars 2025
                                    </p>
                                </div>
                                {termsContent}
                            </div>

                            {/* Footer du modal */}
                            <div className="flex items-center justify-end space-x-3 p-6
                              border-t border-gray-200 dark:border-gray-700
                              bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm"
                            >
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium
                             text-gray-600 dark:text-gray-300
                             bg-gray-200 dark:bg-gray-700
                             hover:bg-gray-300 dark:hover:bg-gray-600
                             rounded-lg transition-colors duration-200"
                                >
                                    Fermer
                                </button>
                                <button
                                    onClick={() => {
                                        handleAccept();
                                        setShowModal(false);
                                    }}
                                    className="flex items-center space-x-2 px-6 py-2 text-sm font-medium
                             text-white dark:text-black
                             bg-gradient-to-r from-[#3F3290] to-[#8b5cf6]
                             dark:from-[#bf953f] dark:to-[#fcf6ba]
                             hover:from-[#2D2470] hover:to-[#7c3aed]
                             dark:hover:from-[#aa771c] dark:hover:to-[#e6d55a]
                             rounded-lg transition-all duration-200
                             transform hover:scale-105 shadow-lg"
                                >
                                    <Check size={16} />
                                    <span>Accepter les conditions</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CookieConsent;
