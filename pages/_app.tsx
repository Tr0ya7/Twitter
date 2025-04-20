import "@/styles/globals.css"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"

TimeAgo.addDefaultLocale(en)

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => <SessionProvider session={session}><Component {...pageProps} /></SessionProvider>

export default App