import { MotionDiv } from '@/components/MotionDiv'
import React from 'react'

const page = () => {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex justify-center items-center min-h-screen p-8'>
            <div className='border shadow-2xl w-full max-w-xl rounded-xl h-96 flex justify-center items-center'>
                <h1 className="font-heading text-3xl">Login 🎉</h1>
            </div>
        </MotionDiv>
    )
}

export default page