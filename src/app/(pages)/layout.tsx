import TopBar from "@/components/TopBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <main className="grow">{children}</main>
    </>
  );
}
