"use client";

import ParallaxBackground from "@/components/ui/parallax-background"
import LuxuryHeading from "@/components/ui/luxury-heading";
import { motion } from "framer-motion";
import {LuxuryButton} from "@/components/ui/luxury-button";

export default function PrivacyPage() {
    return (
        <div className="relative">
            <ParallaxBackground />

            <div className="container py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <LuxuryHeading
                            as="h1"
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#3F3290] via-[#6366f1] to-[#8b5cf6] dark:from-[#bf953f] dark:via-[#aa771c] dark:to-[#fcf6ba] bg-clip-text text-transparent"
                        >
                            Politique de confidentialité
                        </LuxuryHeading>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] dark:from-[#bf953f] dark:to-[#fcf6ba] rounded-full mx-auto mb-6 max-w-xs"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-muted-foreground text-lg"
                        >
                            Dernière mise à jour : 19 Août 2025
                        </motion.p>
                    </div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        {/* Introduction */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-purple-900/20 p-6 md:p-8 rounded-2xl border border-blue-200/50 dark:border-purple-500/20 mb-8">
                            <p className="text-lg leading-relaxed mb-0">
                                Le Conseil Étudiant HE2B s'engage à protéger la vie privée des utilisateurs de son site web et de ses
                                services. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos
                                données personnelles.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                1. Collecte des données personnelles
                            </LuxuryHeading>

                            <div className="bg-white dark:bg-gray-800/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <p className="mb-4">Nous collectons les données personnelles suivantes :</p>
                                <div className="grid md:grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full"></div>
                                        <span>Nom et prénom</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full"></div>
                                        <span>Adresse email</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full"></div>
                                        <span>Numéro de téléphone (facultatif)</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full"></div>
                                        <span>Section et année d'études</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] rounded-full"></div>
                                        <span>Campus</span>
                                    </div>
                                </div>

                                <p className="mb-3 font-medium">Ces données sont collectées lorsque vous :</p>
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">•</span>
                                        <span>Remplissez un formulaire de contact</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">•</span>
                                        <span>Vous inscrivez à un événement</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">•</span>
                                        <span>Postulez pour rejoindre le Conseil Étudiant</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">•</span>
                                        <span>Utilisez nos services</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                2. Utilisation des données personnelles
                            </LuxuryHeading>

                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-500/20">
                                <p className="mb-4">Nous utilisons vos données personnelles pour :</p>
                                <div className="grid gap-3">
                                    <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">→</span>
                                        <span>Répondre à vos demandes et questions</span>
                                    </div>
                                    <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">→</span>
                                        <span>Vous informer sur nos services et événements</span>
                                    </div>
                                    <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">→</span>
                                        <span>Améliorer nos services</span>
                                    </div>
                                    <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">→</span>
                                        <span>Vous permettre de participer à nos événements</span>
                                    </div>
                                    <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/30 p-3 rounded-lg">
                                        <span className="text-[#3F3290] dark:text-[#8b5cf6] font-bold">→</span>
                                        <span>Traiter votre candidature pour rejoindre le Conseil Étudiant</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                3. Conservation des données personnelles
                            </LuxuryHeading>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-500/30">
                                <p className="mb-0 text-gray-800 dark:text-gray-200">
                                    Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour
                                    lesquelles elles ont été collectées, sauf si la loi exige ou permet une période de conservation plus
                                    longue.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                4. Partage des données personnelles
                            </LuxuryHeading>

                            <div className="bg-white dark:bg-gray-800/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <p className="mb-4">Nous ne partageons pas vos données personnelles avec des tiers, sauf :</p>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-500/30">
                                        <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                                        <span>Avec votre consentement</span>
                                    </div>
                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/30">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">ℹ</span>
                                        <span>Lorsque cela est nécessaire pour fournir un service que vous avez demandé</span>
                                    </div>
                                    <div className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-500/30">
                                        <span className="text-orange-600 dark:text-orange-400 font-bold">⚖</span>
                                        <span>Lorsque cela est requis par la loi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                5. Cookies
                            </LuxuryHeading>

                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200/50 dark:border-indigo-500/20">
                                <p className="mb-4">
                                    Notre site web utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de
                                    petits fichiers texte stockés sur votre appareil qui nous permettent de reconnaître votre navigateur et de
                                    vous offrir une expérience personnalisée.
                                </p>
                                <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-lg border border-indigo-300/30 dark:border-indigo-500/30">
                                    <p className="mb-0 text-sm">
                                        <strong>Note importante :</strong> Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être averti lorsqu'un cookie
                                        est envoyé. Cependant, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement
                                        si vous désactivez les cookies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 6 - Droits RGPD */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                6. Vos droits
                            </LuxuryHeading>

                            <div className="bg-white dark:bg-gray-800/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <p className="mb-6 text-lg font-medium">
                                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants
                                    concernant vos données personnelles :
                                </p>

                                <div className="grid gap-4">
                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200/50 dark:border-blue-500/30">
                                        <div className="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">👁</div>
                                        <div>
                                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Droit d'accès</h4>
                                            <p className="text-sm mb-0">Vous pouvez demander une copie de vos données personnelles</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50 dark:border-green-500/30">
                                        <div className="w-8 h-8 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">✏</div>
                                        <div>
                                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">Droit de rectification</h4>
                                            <p className="text-sm mb-0">Vous pouvez demander la correction de vos données personnelles inexactes</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200/50 dark:border-red-500/30">
                                        <div className="w-8 h-8 bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold">🗑</div>
                                        <div>
                                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">Droit à l'effacement</h4>
                                            <p className="text-sm mb-0">Vous pouvez demander la suppression de vos données personnelles</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200/50 dark:border-yellow-500/30">
                                        <div className="w-8 h-8 bg-yellow-500 dark:bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">⏸</div>
                                        <div>
                                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Droit à la limitation du traitement</h4>
                                            <p className="text-sm mb-0">Vous pouvez demander la limitation du traitement de vos données personnelles</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200/50 dark:border-purple-500/30">
                                        <div className="w-8 h-8 bg-purple-500 dark:bg-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">📦</div>
                                        <div>
                                            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Droit à la portabilité des données</h4>
                                            <p className="text-sm mb-0">Vous pouvez demander le transfert de vos données personnelles</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200/50 dark:border-gray-500/30">
                                        <div className="w-8 h-8 bg-gray-500 dark:bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">🚫</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-1">Droit d'opposition</h4>
                                            <p className="text-sm mb-0">Vous pouvez vous opposer au traitement de vos données personnelles</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] text-white dark:from-[#bf953f] dark:to-[#fcf6ba] dark:text-black rounded-lg ">
                                    <p className="mb-0 text-center">
                                        <strong>Pour exercer ces droits, contactez-nous :</strong>
                                        <a href="mailto:info@cehe2b.be" className="underline text-white dark:text-black hover:text-gray-200 ml-2">
                                            info@cehe2b.be
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                7. Sécurité des données
                            </LuxuryHeading>

                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200/50 dark:border-emerald-500/20">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center text-white text-xl">🔒</div>
                                    <div>
                                        <p className="mb-0 text-gray-800 dark:text-gray-200">
                                            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre
                                            tout accès non autorisé, toute modification, divulgation ou destruction non autorisée.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 8 */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                8. Modifications de la politique de confidentialité
                            </LuxuryHeading>

                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-500/30">
                                <p className="mb-0">
                                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute
                                    modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter
                                    régulièrement cette page pour rester informé des éventuelles modifications.
                                </p>
                            </div>
                        </div>

                        {/* Section 9 - Contact */}
                        <div className="mb-8">
                            <LuxuryHeading as="h2" className="text-2xl md:text-3xl lg:text-4xl mb-4 text-[#3F3290] dark:text-[#8b5cf6]">
                                9. Contact
                            </LuxuryHeading>

                            <div className="bg-gradient-to-br from-[#3F3290]/10 to-[#8b5cf6]/10 dark:from-[#3F3290]/20 dark:to-[#8b5cf6]/20 p-8 rounded-xl border border-[#3F3290]/20 dark:border-[#8b5cf6]/30 text-center">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#3F3290] to-[#8b5cf6] dark:from-[#bf953f] dark:to-[#fcf6ba] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                                        📧
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Une question sur notre politique ?</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Si vous avez des questions concernant cette politique de confidentialité, n'hésitez pas à nous contacter.
                                    </p>
                                    <LuxuryButton
                                        className="inline-flex items-center space-x-2 shadow-lg"
                                    >
                                        <span>info@cehe2b.be</span>
                                        <span>→</span>
                                    </LuxuryButton>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    )
}