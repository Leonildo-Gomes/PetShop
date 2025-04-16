

export function Loading() { 
    return ( 
        <div className="flex flex-col items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500 border-solid"></div>
            <p className="mt-4 text-teal-500 text-lg font-medium">
              Carregando produtos...
            </p>
          </div>
    )
} 