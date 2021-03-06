import React, { useEffect } from 'react';
const ToolSearchTable = React.lazy(() => import("./ToolSearchTable"))
import { Card, Progress, Spinner } from 'flowbite-react';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const fetcher = (url:any) => axios.get(url).then(res => res.data)

export default function Main(props: any) {

    const [isLoading, setIsLoading] = React.useState(true);
    const { data: categoriesData, error: categoriesError }: any = useSWR('/api/getEntries?get=categories', fetcher)

    useEffect(() => {
      setIsLoading(false);
    }, [])

    if (categoriesError){
      return (
        <div className="mx-auto pt-52 pb-52 max-w-5xl text-white">
          <Progress
            progress={100}
            size="md"
            color="red"
            label="An error occurred while loading tooldb"
            labelPosition="outside"
            labelProgress={true}
          />
        </div>
      );
    }



    return (
      <section className="text-gray-600 body-font p-1 md:p-0">
        <Toaster />
        <div className="max-w-6xl pt-52 pb-12 mx-auto">
          <h1 className="text-4xl sm:text-6xl text-center font-4 lh-6 font-extrabold text-white mb-6">
            Search the tool<br/> you need for your project
          </h1>
          <h2 className="text-2xl font-4 font-semibold lh-6 pb-11 text-white text-center">
            You think of that one framework you wanted to use? You might find it here!
          </h2>
        </div>
        <div className="container max-w-6xl flex flex-col gap-4 mx-auto">
          {
            isLoading ? (
              <div className="text-center">
                <Spinner aria-label="Loading tooldb" size='xl' />
              </div>
            ) : (
              <React.Suspense fallback={<div className="text-center mx-auto"><Spinner aria-label="Loading tooldb" size='xl' /></div>}>
                <ToolSearchTable categories={categoriesData} />
              </React.Suspense>
            )
          }
          <h3 className='text-center text-lg font-bold text-white'>Or look into the categories below</h3>
          <div className="flex flex-wrap gap-2 pb-5">
            {
              categoriesData ?
                categoriesData.map((category: any, index: number) => {
                  return (
                    <div className='flex-auto' key={index}>
                      <Link href={`/category/${category.id}`}>
                        <a>
                          <Card className="cursor-pointer hover:bg-gray-200" key={index}>
                            <h5 className="text-sm md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                              {category.category_icon} {category.category_name}
                            </h5>
                          </Card>
                        </a>
                      </Link>
                    </div>
                  )
                }) : (
                <div className="text-center mx-auto">
                  <Spinner aria-label="Loading categories" size='xl' />
                  <p className="text-white">Loading categories</p>
                </div>
              )
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

