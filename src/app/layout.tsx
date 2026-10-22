import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={metadataBase:new URL("https://eurinhash.com"),title:{default:"EURINHASH — De l’idée au système",template:"%s — EURINHASH"},description:"EURINHASH explore l’architecture technologique et l’entrepreneuriat numérique pour transformer les idées en solutions concrètes.",openGraph:{type:"website",locale:"fr_FR",siteName:"EURINHASH",title:"EURINHASH — De l’idée au système",description:"Architecture technologique et entrepreneuriat numérique."},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#050914",colorScheme:"dark"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
