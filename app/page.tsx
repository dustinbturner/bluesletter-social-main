// app/page.tsx
import { MainNav } from "@/components/Navbar";
import { Hero, heroDefaults } from "@/components/Hero";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <MainNav />
      <main className='flex flex-1 justify-center items-center'>
        {" "}
        {/* Added flex properties here */}
        <Hero {...heroDefaults} />
      </main>
    </div>
  );
}
