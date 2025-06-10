// import { Outfit } from "next/font/google";
import { Inter } from 'next/font/google';

// const outfit = Outfit({
//   subsets: ["latin"],
//   display: "swap",
// });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <div className='flex size-full min-h-screen flex-col items-center justify-start px-4 py-2'>
      <header className='flex w-full max-w-7xl items-center justify-between pb-2'>
        <div className={'flex items-center justify-start space-x-4'}>
          <div className={'size-16 rounded-full bg-blue-300/60 md:size-20'}></div>
          <span
            className={
              'text-base font-medium text-stone-800 md:text-lg lg:text-xl' + ' ' + inter.className
            }
          >
            Boilerplate
          </span>
        </div>
        <button
          className={
            'rounded-md bg-stone-200 px-4 py-2 text-base font-medium text-stone-800 transition-colors duration-300 ease-in-out hover:bg-stone-300/60 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-opacity-50 md:text-lg lg:text-xl' +
            ' ' +
            inter.className
          }
        >
          Bouton
        </button>
      </header>
      <main className='flex w-full max-w-7xl flex-col items-center justify-center space-y-8 py-8 pt-32'>
        <div className={'flex flex-col items-start justify-start space-y-2 pb-8'}>
          <h1 className={'text-4xl font-bold text-stone-950 md:text-5xl lg:text-7xl' + ' '}>
            Bienvenue dans la boilerplate 👋
          </h1>
          <p
            className={
              'text-base font-medium text-stone-800 md:text-lg lg:text-xl' + ' ' + inter.className
            }
          >
            Ceci est une simple page de boilerplate.
          </p>
        </div>
        <section className='flex h-fit max-w-[570px] flex-col items-start justify-start space-y-2 rounded-lg border border-stone-300/30 p-4 shadow'>
          <div className='flex w-full items-center justify-start space-x-2'>
            <div className={'size-16 rounded-full bg-green-300/60 md:size-20 lg:size-24'}></div>
            <div className='flex flex-col items-start justify-center space-y-2'>
              <h2 className={'text-2xl font-bold text-stone-950 md:text-3xl lg:text-5xl' + ' '}>
                John Doe
              </h2>
              <span
                className={
                  'text-base font-normal text-stone-600 md:text-lg lg:text-xl' +
                  ' ' +
                  inter.className
                }
              >
                Employé
              </span>
            </div>
          </div>
          <hr className='w-full border-t-2 border-stone-300/20'></hr>
          <div className='flex size-fit flex-col items-start justify-start space-y-2'>
            <span
              className={
                'text-sm font-normal text-stone-600 md:text-base lg:text-lg' + ' ' + inter.className
              }
            >
              Description
            </span>
            <p
              className={
                'text-base font-medium text-stone-800 md:text-lg lg:text-xl' + ' ' + inter.className
              }
            >
              Ceci est un texte d&apos;illustration à propos d&apos;un certain John Doe. Le but
              étant ici de montrer le rendu de la police. Pour cela, on utilise un texte
              d&apos;illustration un peu long. Ça permet de voir comment le texte s&apos;adapte à la
              taille de l&apos;écran.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
