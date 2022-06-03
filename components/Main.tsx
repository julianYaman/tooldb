import React from 'react';
const ToolSearchTable = React.lazy(() => import("./ToolSearchTable"))
import { Suspense } from "react";
import { Card, Spinner } from 'flowbite-react';
import Link from 'next/link';

export default function Main(props: any) {

    console.log(props)

    return (
      <section className="text-gray-600 body-font p-1 md:p-0">
        <div className="max-w-5xl pt-52 pb-12 mx-auto">
          <h1 className="antialiased text-5xl sm:text-7xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
            Search the tool you need for your project
          </h1>
          <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-white text-center">
            You think of that one framework you wanted to use? You might find it here!
          </h2>
        </div>
        <div className="container max-w-5xl flex flex-col gap-4 mx-auto">
          <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading Tool Table" size='xl' /></div>}>
            <ToolSearchTable tablePreviewData={props.tablePreviewData}/>
          </Suspense>
          <h3 className='text-center text-lg font-bold text-white'>Or look into the categories below</h3>
          <div className="flex flex-wrap gap-2 pb-5">
            {
              props.categories.map((category: any, index: number) => {
                return (
                  <div className='flex-auto' key={index}>
                    <Link href={`/category/${category.id}`}>
                      <a>
                        <Card className="cursor-pointer hover:bg-gray-200" key={index}>
                          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {category.category_icon} {category.category_name}
                          </h5>
                        </Card>
                      </a>
                    </Link>
                  </div>
                )
              })
            }
            </div>
        </div>
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
          Build by everyone, for everyone. 
          <br /> And open-source.
        </h2>
        <br></br>
        <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
          tooldb is a massive collection of frameworks and tools. This wouldn&lsquo;t be possible without the contributions of so many.
        </p>
        <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
            <img className="w-10" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-contribution-achievements-flaticons-lineal-color-flat-icons.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Based on contributions
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Only one person couldn&lsquo;t handle the huge collection of tools and keep track of every new one. Everyone can submit their favourite framework or tool with opening an issue on GitHub.
            </p>
          </div>
          <div className="ktq4">
            <img className="w-10" src="https://img.icons8.com/stickers/100/000000/code.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Open Source
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              This project is open source so many can take part in the development of the project and influence the progress of it. Donations are also welcome to cover server and other project-related costs.
            </p>
          </div>
        </div>
        <section className="relative pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl font-bold text-white">
                Subscribe to our newsletter
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-200">
                Coming soon.
              </h1>
            </div>
          </div>
        </section>
      </section>
    );
}

