import Navbar from '@/components/Navbar';
import { RootStoreProvider } from '@/context/RootStoreContext';
import '@styles/base.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootStoreProvider>
            <Navbar></Navbar>
            {children}
        </RootStoreProvider>
      </body>
    </html>
  );
}
