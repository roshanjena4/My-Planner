import React from 'react'

function NotFound() {
return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className="rounded-xl bg-white bg-opacity-10 px-12 py-10 shadow-2xl backdrop-blur-lg max-sm:px-6 z-10 flex flex-col items-center">
            <h1 className="text-8xl font-extrabold text-red-600 drop-shadow-lg mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-black mb-2">Page Not Found</h2>
            <p className="text-black mb-6 text-center max-w-xs">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <a
                href="/"
                className="mt-2 inline-block rounded bg-red-600 px-6 py-2 text-white font-bold hover:bg-red-700 transition"
            >
                Go Home
            </a>
        </div>
    </div>
)
}

export default NotFound
